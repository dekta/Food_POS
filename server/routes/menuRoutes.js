const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const {
    createMenuItem,
    getMenuItemById,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController")

// Routes for Menu Items
router.post('/', protect, createMenuItem); // Create a new menu item (protected)
router.get('/', protect, getMenuItems); // Get all menu items (protected)
router.get('/:id', protect, getMenuItemById); // Get a menu item by ID (protected)
router.put('/:id', protect, updateMenuItem); // Update a menu item by ID (protected)
router.delete('/:id', protect, deleteMenuItem); // Delete a menu item by ID (protected)

module.exports = router;
