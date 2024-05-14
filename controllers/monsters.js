const Monster = require('../models/monster.js');
const express = require('express')
const router = express.Router()


/* Routes
-------------------------------------------------- */
// Index route: Display all characters
router.get('/', async (req, res) => {
    const allMonsters = await Monster.find()
    res.render('monsters/index', { monsters: allMonsters })
})

// Index route: Display all characters for a specific user
router.get('/:monsterId', async (req, res) => {
    const userMonster = await Monster
        .find({ owner: req.params.userId })
    res.render('monsters/index', { monsters: userMonster })
})

// New route
router.get('/new', (req, res) => {
    res.render('monsters/new')
})
module.exports = router;
