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
    imageUrl: { type: String, default: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2kxMTE0YzFzcm14cGU3YzhkdDVjbmFucXo1Y2lzMnl2emxjc3A4MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/t8e74BIE4MWjrcbTI1/giphy.gif'},
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
  
  module.exports = mongoose.model('Character', characterSchema);