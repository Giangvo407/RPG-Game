/* Import packages
-------------------------------------------------- */
const dotenv = require('dotenv').config();
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT ? process.env.PORT: '3000';

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const isAdmin = require('./middleware/isAdmin.js');


const authController = require('./controllers/auth.js')
const usersController = require('./controllers/users.js')
const selectCharacterController = require('./controllers/select-characters.js');
const charactersController = require('./controllers/characters.js');
const monstersController = require('./controllers/monsters.js');
const inventorysController = require('./controllers/inventorys.js');
const battlesController = require('./controllers/battles.js');
const adminController = require('./controllers/admin.js')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))


app.get('/', function (req, res) {
  res.render('index', { user: req.session.user })
})

app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users', usersController);
app.use('/characters', charactersController);
app.use('/monsters', monstersController);
app.use('/inventorys', inventorysController);
app.use('/select-character', selectCharacterController);
app.use('/battle', battlesController);
app.use('/admins', adminController)
app.use(isAdmin);
app.use('/admins', adminController)

app.get('/admins', isAdmin, (req, res) => {
  res.render('./users/admin');
  });


app.listen(port, function () {
    console.log('Express app running on port ' + port)
  })