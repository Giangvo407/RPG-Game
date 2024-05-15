/* Import packages
-------------------------------------------------- */
const dotenv = require('dotenv').config();
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');



/* Express app 
-------------------------------*/
const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT ? process.env.PORT: '3000';

// connect to MongoDB Atlas with mongoose
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB Atlas at ${mongoose.connection.name}`);
});

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));

/* Middleware
----------------------------------*/
// import custom middleware
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const isAdmin = require('./middleware/isAdmin.js');

// import controllers
const authController = require('./controllers/auth.js')
const usersController = require('./controllers/users.js')
const charactersController = require('./controllers/characters.js');
const monstersController = require('./controllers/monsters.js');
const inventorysController = require('./controllers/inventorys.js');
const shopsController = require('./controllers/shops.js');
const adminController = require('./controllers/admin.js')



/* Middleware
----------------------------------*/


app.use(morgan('dev'))
// Used to parse request bodies from PUT/PATCH/POST requests
app.use(express.urlencoded({ extended: false }))
// Allow HTML forms to send PUT/DELETE requests instead of just GET or POST
app.use(methodOverride('_method'))
// Set up session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))




/* Routes
-------------------------------------------------- */
// Home Page
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
app.use('/shops', shopsController);
app.use('/admins', adminController)
app.use(isAdmin);
app.use('/admins', adminController)

// Protected route: Only accessible by authorized users
app.get('/admins', isAdmin, (req, res) => {

   res.render('./users/admin');
  });

/* Run Express app on your computer on port 3000
-------------------------------------------------- */
app.listen(port, function () {
    console.log('Express app running on port ' + port)
  })