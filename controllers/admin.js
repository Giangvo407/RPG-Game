const Monster = require('../models/monster.js');
const Inventory = require('../models/inventory.js');


const express = require('express');
const router = express.Router();


/* Routes
-------------------------------------------------- */
// create Monster route
router.get('/monsters/new', async (req, res) => {
    const inventory = await Inventory.find({})
    console.log(inventory)
    res.render('monsters/new.ejs', {inventory})
})

// Add Monster
router.post('/monsters/new', async (req, res) => {
    try {
        const { name, hitPoints, strength, defense, experience, loot, gold, rarity,location, imageUrl } = req.body;
        const newMonster = new Monster({ name, hitPoints, strength, defense, experience, loot, gold, rarity, location, imageUrl});
        console.log(newMonster)
        await newMonster.save()
        // await Monster.create(req.body);
        res.redirect('/monsters'); // Redirect to the list of monsters after creation
      } catch (error) {
        res.status(500).send('Error creating monster');
      }
    })

// route to Edit monsters
router.get('/monsters/:monsterId/edit', async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        const foundMonster = await Monster.findById(req.params.monsterId)
        res.render('monsters/edit', { monster: foundMonster, inventory});
    } catch (error) {
        console.log(error);
        res.redirect('/monsters');
    }
});

// Edit Monsters
router.post('/monsters/:monsterId/edit', async (req, res) => {
    try {
        const newMonster = await Monster.findByIdAndUpdate(req.params.monsterId, req.body, {new: true} );
        res.redirect('/monsters'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

    // create inventory route
router.get('/inventorys/new', (req, res) => {
    
    res.render('inventorys/new.ejs')
})

// Create
router.post('/inventorys/new', async (req, res) => {
    try {
        const { name, type, strengthModifier, defenseModifier, isEquipped, healingPower, imageUrl } = req.body;
        const newItem = new Inventory({
            name,
            type,
            strengthModifier,
            defenseModifier,
            isEquipped,
            healingPower, // This field will be undefined if the type is not 'Potion'
            imageUrl
        });
        await newItem.save();
        res.redirect('/inventorys');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to Edit Inventory
router.get('/inventorys/:inventoryId/edit', async (req, res) => {
    try {
        const foundInventory = await Inventory.findById(req.params.inventoryId)
        res.render('inventorys/edit', { inventory: foundInventory});
    } catch (error) {
        console.log(error);
        res.redirect('/inventorys');
    }
});

// Edit Inventory
router.post('/inventorys/:inventoryId/edit', async (req, res) => {
    try {
        const newInventory = await Inventory.findByIdAndUpdate(req.params.inventoryId, req.body, {new: true} );
        res.redirect('/inventorys'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// create Shop route
router.get('/shops/new', async (req, res) => {
    const inventory = await Inventory.find({})
    console.log(inventory)
    res.render('shops/new.ejs', {inventory})
})

// Create
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
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// route to Edit shops
router.get('/shops/:shopId/edit', async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        const foundShop = await Shop.findById(req.params.shopId)
        res.render('shops/edit', { shop: foundShop, inventory});
    } catch (error) {
        console.log(error);
        res.redirect('/shops');
    }
});

// Edit
router.post('/shops/:id/edit', async (req, res) => {
    try {
        const { inventory, price } = req.body;
        await Shop.findByIdAndUpdate(req.params.id, { inventory, price });
        res.redirect('/shops'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;