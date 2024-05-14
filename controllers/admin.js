const Monster = require('../models/monster.js');


const express = require('express');
const router = express.Router();


/* Routes
-------------------------------------------------- */
// create Monster route
router.get('/new', (req, res) => {
    res.render('monsters/new.ejs')
})


module.exports = router;