
/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/characters`
---------------------------------------------------------------------------------------
*/


/* Import packages and models
-------------------------------------------------- */
const Character = require('../models/character.js');
const express = require('express');
const router = express.Router();


/* Routes
-------------------------------------------------- */
// Index route: Display all characters
router.get('/', async (req, res) => {
    const allCharacters = await Character.find().populate('owner')
    res.render('characters/index', { characters: allCharacters })
})

// Index route: Display all characters for a specific user
router.get('/owner/:userId', async (req, res) => {
    const userCharacter = await Character
        .find({ owner: req.params.userId })
        .populate('owner')
    res.render('characters/index', { characters: userCharacter })
})

// New route
router.get('/new', (req, res) => {
    res.render('characters/new')
})

// Show route
router.get('/:characterId', async (req, res) => {
    try {
        // Get character and owner data
        const foundCharacter = await Character
            .findById(req.params.characterId)
            .populate('owner')
        // Get favorited data
        const userHasFavorited = foundCharacter.favoritedByUsers.some((user) =>
            user.equals(req.session.user._id)
        );
        // Render character, owner, and favoriting data
        res.render('characters/show', {
            character: foundCharacter,
            userHasFavorited: userHasFavorited
        })
    } catch (error) {
        console.log(error)
        res.redirect('/characters')
    }
})

// Create route
router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id
    await Character.create(req.body)
    console.log('characters')
    res.redirect('/characters')
})

// Delete route
router.delete('/:characterId', async (req, res) => {
    await Character.findByIdAndDelete(req.params.characterId)
    res.redirect('/characters')
})

// Edit route
router.get('/:characterId/edit', async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId)
    // const userHasFavorited = foundCharacter.favoritedByUsers.some((user) =>
    //     user.equals(req.session.user._id)
    // );
    res.render('characters/edit', { character: foundCharacter})
})

// Put route
router.put('/:characterId', async (req, res) => {
    console.log(req.body)
    const updatedCharacter = await Character.findByIdAndUpdate(
        req.params.characterId,
        req.body,
        { new: true }
    );
    const userHasFavorited = updatedCharacter.favoritedByUsers.some((user) =>
        user.equals(req.session.user._id)
    );
    res.render('characters/show', { character: updatedCharacter, userHasFavorited: userHasFavorited})
})

// Favoriting route
router.post('/:characterId/favorited-by/:userId', async (req, res) => {
    try {
        const foundCharacter = await Character.findById(req.params.characterId);
        foundCharacter.favoritedByUsers.push(req.params.userId);
        await foundCharacter.save();
        res.redirect(`/characters/${req.params.characterId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/characters');
    }
});

// Unfavoriting route
router.delete('/:characterId/favorited-by/:userId', async (req, res) => {
    try {
        // remove the userId fromt he favoritedByUsers array
        await Character.findByIdAndUpdate(req.params.characterId, {
            $pull: { favoritedByUsers: req.params.userId },
        });
        res.redirect(`/characters/${req.params.characterId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/characters');
    }
});

/* Export these routes so that they are accessible in `server.js`
-------------------------------------------------- */
module.exports = router;
