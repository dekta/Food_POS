const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for Orders
router.post('/', protect, createOrder); // Create a new order (protected)
router.get('/', protect, getOrders); // Get all orders (protected)
router.get('/:id', protect, getOrderById); // Get a single order by ID (protected)
router.put('/:id', protect, updateOrder); // Update an order by ID (protected)
router.delete('/:id', protect, deleteOrder); // Delete an order by ID (protected)

module.exports = router;
