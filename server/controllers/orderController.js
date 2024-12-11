const Order = require('../models/orderModel');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, customerPhone } = req.body;
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const order = new Order({ items, customerPhone, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Error creating order' });
    }
};

// Read all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

// Read a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching order' });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are enforced
        });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Error updating order' });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting order' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
