const express = require('express')
const router = express.Router()
const User = require('../models/user.js');


router.get('/', async (req, res) => {
     let users = await User.find()
     res.render('users/index', { users: users })
})

router.get('/:userId', async (req, res) => {
     try {
          otherUser = await User.findById(req.params.userId)
          res.locals.otherUser = otherUser
          res.locals.title = `${otherUser.username}'s player`
          res.render('users/show')
     } catch(error) {
          console.log(error)
          res.redirect('/users')
     }
})

module.exports = router;
