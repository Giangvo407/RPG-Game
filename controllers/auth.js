const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');


router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }
  
    // Username is not taken already!
    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }
  
    // Must hash the password before sending to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
  
    const { username, password, adminSecret } = req.body;
  
    // Check if the admin secret is correct
    if (adminSecret !== process.env.SESSION_SECRET) {
      await User.create(req.body);
    } else {
  
    // Create a new user
    const newUser = new User({
      username,
      password,
      isAdmin: true, // Set isAdmin to true only if the admin secret is correct
    });
    newUser.save()
    await User.create(req.body)};
  
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }
  
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }
  
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      isAdmin: userInDatabase.isAdmin,
    };
    res.redirect('/characters',);
  } catch (error) {
    res.redirect('/');
  }
});

module.exports = router;

