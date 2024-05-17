const Inventory = require('../models/inventory.js');
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const allInventorys = await Inventory.find()
    res.render('inventorys/index', { inventorys: allInventorys })
})

router.get('/:inventoryId', async (req, res) => {
    try {
        const foundInventory = await Inventory
            .findById(req.params.inventoryId)
        res.render('inventorys/show', { inventory: foundInventory});
    } catch (error) {
        res.redirect('/inventorys');
    }
});
module.exports = router;