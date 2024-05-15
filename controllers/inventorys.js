const Inventory = require('../models/inventory.js');
const express = require('express')
const router = express.Router()

/* Routes
-------------------------------------------------- */
// Index route: Display all inventorys
router.get('/', async (req, res) => {
    const allInventorys = await Inventory.find()
    res.render('inventorys/index', { inventorys: allInventorys })
})

// router.get('/owner/:userId', async (req, res) => {
//     const userInventory = await Inventory
//         .find({ owner: req.params.userId })
//         .populate('owner')
//     res.render('inventorys/index', { inventorys: userInventory })
// })

// Show
router.get('/:inventoryId', async (req, res) => {
    try {
        const foundInventory = await Inventory
            .findById(req.params.inventoryId)
        res.render('inventorys/show', { inventory: foundInventory});
    } catch (error) {
        console.log(error);
        res.redirect('/inventorys');
    }
});
module.exports = router;