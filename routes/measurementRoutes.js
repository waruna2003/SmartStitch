const express = require("express");
const router = express.Router();
const Measurement = require("../models/Measurement");
const authMiddleware = require("../middleware/authMiddleware");

// ➤ Get all measurements for logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const measurements = await Measurement.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching measurements", error });
    }
});

// ➤ Get a single measurement
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const measurement = await Measurement.findOne({ _id: req.params.id, userId: req.user.id });
        if (!measurement) return res.status(404).json({ message: "Measurement not found" });
        res.json(measurement);
    } catch (error) {
        res.status(500).json({ message: "Error fetching measurement", error });
    }
});

// ➤ Add a new measurement
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, gender, measurements } = req.body;
        const newMeasurement = new Measurement({ userId: req.user.id, name, gender, measurements });
        await newMeasurement.save();
        res.status(201).json({ message: "Measurement saved successfully!", newMeasurement });
    } catch (error) {
        res.status(500).json({ message: "Error saving measurement", error });
    }
});

// ➤ Update a measurement
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedMeasurement = await Measurement.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.status(200).json(updatedMeasurement);
    } catch (error) {
        res.status(500).json({ message: "Error updating measurement", error });
    }
});

// ➤ Delete a measurement
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Measurement.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.status(200).json({ message: "Measurement deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting measurement", error });
    }
});

module.exports = router;
