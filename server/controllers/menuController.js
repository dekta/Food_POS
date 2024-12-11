const MenuItem = require('../models/menuItemModel');

// Create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: 'Error creating menu item' });
    }
};

// Read all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching menu items' });
    }
};

// Read a single menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching menu item' });
    }
};

// Update a menu item by ID
const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are enforced
        });
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: 'Error updating menu item' });
    }
};

// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting menu item' });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
};
