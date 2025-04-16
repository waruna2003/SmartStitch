const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    measurements: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Measurement", MeasurementSchema);
