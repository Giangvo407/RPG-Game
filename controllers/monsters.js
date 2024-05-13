const express = require('express')
const router = express.Router()
const Monster = require('../models/monster.js');

// Routes

// Index
router.get('/', async (req, res) => {
     let allMonsters = await Monsters.find()
     res.locals.title = "Monster Index"
     res.render('monsters/index', { monsters: allMonsters })
})

// Show
router.get('/:monsterId', async (req, res) => {
     try {
          otherMonster = await Monster.findById(req.params.monsterId)
          res.locals.otherMonster = otherMonster
          res.locals.title = `${otherMonster.username}'s player`
          res.render('monsters/show')
     } catch(error) {
          console.log(error)
          res.redirect('/monsters')
     }
})

module.exports = router;
