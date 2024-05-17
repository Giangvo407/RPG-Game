const Character = require('../models/character.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const allCharacters = await Character.find().populate('owner')
    res.render('characters/index', { characters: allCharacters })
})

router.get('/owner/:userId', async (req, res) => {
    const userCharacter = await Character
        .find({ owner: req.params.userId })
        .populate('owner')
    res.render('characters/index', { characters: userCharacter })
})

router.get('/new', (req, res) => {
    res.render('characters/new')
})

router.get('/:characterId', async (req, res) => {
    try {
        const foundCharacter = await Character
            .findById(req.params.characterId)
            .populate('owner')
        const userHasFavorited = foundCharacter.favoritedByUsers.some((user) =>
            user.equals(req.session.user._id)
        );
        res.render('characters/show', {
            character: foundCharacter,
            userHasFavorited: userHasFavorited
        })
    } catch (error) {
        res.redirect('/characters')
    }
})


router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id
    await Character.create(req.body)
    res.redirect('/characters')
})

router.delete('/:characterId', async (req, res) => {
    await Character.findByIdAndDelete(req.params.characterId)
    res.redirect('/characters')
})

router.get('/:characterId/edit', async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId)
    res.render('characters/edit', { character: foundCharacter})
})

router.put('/:characterId', async (req, res) => {
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

router.post('/:characterId/favorited-by/:userId', async (req, res) => {
    try {
        const foundCharacter = await Character.findById(req.params.characterId);
        foundCharacter.favoritedByUsers.push(req.params.userId);
        await foundCharacter.save();
        res.redirect(`/characters/${req.params.characterId}`);
    } catch (error) {
        res.redirect('/characters');
    }
});

router.delete('/:characterId/favorited-by/:userId', async (req, res) => {
    try {
        await Character.findByIdAndUpdate(req.params.characterId, {
            $pull: { favoritedByUsers: req.params.userId },
        });
        res.redirect(`/characters/${req.params.characterId}`);
    } catch (error) {
        res.redirect('/characters');
    }
});

module.exports = router;
