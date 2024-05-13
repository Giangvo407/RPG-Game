const mongoose = require('mongoose');
const Schema = mongoose.Schema
const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    str: { type: Number, default: 1 },
    def: { type: Number, default: 1 },
    hitPoints: { type: Number, default: 10 },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
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