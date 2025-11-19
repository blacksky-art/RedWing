import express from "express";
import Flight from "../models/flightModel.js";

const router = express.Router();

//CRUD Operations for Flights

//Create operation
router.post("/", async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const saved = await flight.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read operations
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id/checklist", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.json(flight.checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Update operation
router.put("/:id", async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Flight not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/:id/checklist", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });

    const newItem = {
      checkName: req.body.checkName,
      status: req.body.status || "pending",
      comments: req.body.comments || ""
    };

    flight.checklist.push(newItem);
    await flight.save();

    res.status(201).json(flight.checklist);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id/checklist/:itemId", async (req, res) => {
  try {
    const { status, comments } = req.body;

    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });

    const item = flight.checklist.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Checklist item not found" });

    if (status) item.status = status;
    if (comments !== undefined) item.comments = comments;

    await flight.save();
    res.json(item);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



//  Delete operation
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Flight.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








export default router;
