const Monster = require('../models/monster.js');
const express = require('express')
const router = express.Router()


/* Routes
-------------------------------------------------- */
// Index route: Display all Monsters
router.get('/', async (req, res) => {
    const allMonsters = await Monster.find()
    res.render('monsters/index', { monsters: allMonsters })
})

// Show
router.get('/:monsterId', async (req, res) => {
    try {
        const foundMonster = await Monster
            .findById(req.params.monsterId)
        res.render('monsters/show', { monster: foundMonster});
    } catch (error) {
        console.log(error);
        res.redirect('/monsters');
    }
});

module.exports = router;
