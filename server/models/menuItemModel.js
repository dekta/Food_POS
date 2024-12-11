const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String,enum: ['veg', 'non-veg'], default: 'veg', required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
