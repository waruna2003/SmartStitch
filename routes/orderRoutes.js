const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");

// ➤ Get user orders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

// ➤ Create a new order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { product, measurementId, shippingAddress, quantity, price } = req.body;
        const newOrder = new Order({
            userId: req.user.id,
            product,
            measurementId,
            shippingAddress,
            quantity,
            price,
            status: "Pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});

module.exports = router;
