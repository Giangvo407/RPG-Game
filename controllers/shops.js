const Shop = require('../models/shop.js');
const express = require('express')
const router = express.Router()


/* Routes
-------------------------------------------------- */
// Index route: Display all Shops
router.get('/', async (req, res) => {
    const allShops = await Shop.find()
    res.render('shops/index', { shops: allShops })
})

// Show
router.get('/:shopId', async (req, res) => {
    try {
        const foundShop = await Shop
            .findById(req.params.shopId)
        res.render('shops/show', { shop: foundShop});
    } catch (error) {
        console.log(error);
        res.redirect('/shops');
    }
});

module.exports = router;