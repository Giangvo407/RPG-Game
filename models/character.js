const mongoose = require('mongoose');
const Schema = mongoose.Schema
const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    minHitPoints: { type: Number, default: 50 }, 
    maxHitPoints: { type: Number, default: 50},
    strength: { type: Number, default: 5 },
    defense: { type: Number, default: 2 },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    gold: { type: Number, default: 10 },
    inventory:  [ {type: Schema.Types.ObjectId, ref: 'Inventory' } ],
    equippedWeapon: { type: Schema.Types.ObjectId, ref: 'Inventory' },
    equippedArmor: { type: Schema.Types.ObjectId, ref: 'Inventory' },
    imageUrl: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    favoritedByUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
  });
  
  // calculate level based on experience points
  characterSchema.methods.calculateLevel = function () {
    const expNeeded = 100;
    const currentExp = this.experience;
    const currentLevel = Math.floor(currentExp / expNeeded) + 1;
    return currentLevel;
  };
  
  module.exports = mongoose.model('Character', characterSchema);