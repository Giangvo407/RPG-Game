const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monsterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxHitPoints: { type: Number, required: true },
    minHitPoints: { type: Number, required: true },
    strength: { type: Number, required: true },
    defense: { type: Number, required: true },
    experience: { type: Number, required: true },
    loot: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
    gold: { type: Number, default: 0 },
    rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'] },
    location: { type: String },
    imageUrl: { type: String }
  });

module.exports = mongoose.model('Monster', monsterSchema);