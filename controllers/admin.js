const Monster = require('../models/monster.js');
const Inventory = require('../models/inventory.js');


const express = require('express');
const router = express.Router();


router.get('/monsters/new', async (req, res) => {
    const inventory = await Inventory.find({})
    res.render('monsters/new.ejs', {inventory})
})

router.post('/monsters/new', async (req, res) => {
    try {
        const { name, maxHitPoints, minHitPoints, strength, defense, experience, loot, gold, rarity,location, imageUrl } = req.body;
        const newMonster = new Monster({ name, maxHitPoints, minHitPoints, strength, defense, experience, loot, gold, rarity, location, imageUrl});
        await newMonster.save()
        res.redirect('/monsters');
      } catch (error) {
        res.status(500).send('Error creating monster');
      }
    })


router.get('/monsters/:monsterId/edit', async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        const foundMonster = await Monster.findById(req.params.monsterId)
        res.render('monsters/edit', { monster: foundMonster, inventory});
    } catch (error) {
        res.redirect('/monsters');
    }
});

router.delete('/monsters/:monsterId', async (req, res) => {
   try{ await Monster.findByIdAndDelete(req.params.monsterId)
        res.redirect('/monsters')
    } catch(err){
        res.status(500).send('error');
    }});

router.post('/monsters/:monsterId/edit', async (req, res) => {
    try {
        const newMonster = await Monster.findByIdAndUpdate(req.params.monsterId, req.body, {new: true} );
        res.redirect('/monsters'); 
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/inventorys/new', (req, res) => {
    
    res.render('inventorys/new.ejs')
})

router.post('/inventorys/new', async (req, res) => {
    try {
        const { name, type, strengthModifier, defenseModifier, isEquipped, healingPower, imageUrl } = req.body;
        const newItem = new Inventory({
            name,
            type,
            strengthModifier,
            defenseModifier,
            isEquipped,
            healingPower,
            imageUrl
        });
        await newItem.save();
        res.redirect('/inventorys');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.get('/inventorys/:inventoryId/edit', async (req, res) => {
    try {
        const foundInventory = await Inventory.findById(req.params.inventoryId)
        res.render('inventorys/edit', { inventory: foundInventory});
    } catch (error) {
        res.redirect('/inventorys');
    }
});

router.post('/inventorys/:inventoryId/edit', async (req, res) => {
    try {
        const newInventory = await Inventory.findByIdAndUpdate(req.params.inventoryId, req.body, {new: true} );
        res.redirect('/inventorys'); 
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


router.get('/shops/new', async (req, res) => {
    const inventory = await Inventory.find({})
    res.render('shops/new.ejs', {inventory})
})


router.post('/shops/new', async (req, res) => {
    try {
        const { inventory, price } = req.body;
        const newItem = new Inventory({
            inventory,
            price,
        });
        await newItem.save();
        res.redirect('/shops');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/shops/:shopId/edit', async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        const foundShop = await Shop.findById(req.params.shopId)
        res.render('shops/edit', { shop: foundShop, inventory});
    } catch (error) {
        res.redirect('/shops');
    }
});


router.post('/shops/:id/edit', async (req, res) => {
    try {
        const { inventory, price } = req.body;
        await Shop.findByIdAndUpdate(req.params.id, { inventory, price });
        res.redirect('/shops'); 
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;