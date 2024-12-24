const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  customerPhone: { type: String },
  fullName: { type: String, required: true },
  customerId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)
