const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  inventory: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
  price: { type: Number, default: 0 },
});

module.exports = mongoose.model('Shop', ShopSchema);