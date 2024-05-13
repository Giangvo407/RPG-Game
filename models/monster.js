const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    strength: { type: Number, required: true },
    hitPoints: { type: Number, required: true },
    loot: { type: String }, // Assuming loot is a string for simplicity
    defense: { type: Number, required: true },
    experience: { type: Number, required: true },
    rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'] }
  });

module.exports = mongoose.model('Monster', monsterSchema);