const Monster = require('../models/monster.js');
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    const allMonsters = await Monster.find()
    res.render('monsters/index', { monsters: allMonsters })
})

router.get('/:monsterId', async (req, res) => {
    try {
        const foundMonster = await Monster
            .findById(req.params.monsterId)
        res.render('monsters/show', { monster: foundMonster});
    } catch (error) {
        res.redirect('/monsters');
    }
});

module.exports = router;
