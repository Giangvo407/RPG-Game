const express = require('express');
const router = express.Router();
const Character = require('../models/character');


router.get('/', async (req, res) => {
    try {
       
        const characters = await Character.find({ owner: req.session.user._id }); 
        res.render('./characters/selectCharacter', { characters });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;