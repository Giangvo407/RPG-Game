const express = require('express');
const router = express.Router();
const Character = require('../models/character');

// GET 
router.get('/', async (req, res) => {
    try {
       
        const characters = await Character.find({ owner: req.session.user._id }); 
        console.log(characters)

        res.render('./characters/selectCharacter', { characters });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;