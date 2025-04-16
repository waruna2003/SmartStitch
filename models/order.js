const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: String, required: true },
    measurementId: { type: mongoose.Schema.Types.ObjectId, ref: "Measurement", required: true },
    shippingAddress: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
