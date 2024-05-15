const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Weapon, Armor, Potion, etc.
  strengthModifier: { type: Number, default: 0 },
  defenseModifier: { type: Number, default: 0 },
  isEquipped: { type: Boolean, default: false },
  healingPower: { type: Number, default: 0 },
  imageUrl: { type: String }
});

module.exports = mongoose.model('Inventory', InventorySchema);