import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  checkName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  comments: {
    type: String,
    trim: true
  }
}, { _id: true });

const defaultChecklist = [
  { checkName: "Check Digital Sky for airspace clearance" },
  { checkName: "WINDY DATA– at 0m alt, at 100m alt" },
  { checkName: "Anemometer wind speed & Wind Direction" },
  { checkName: "Inform the GC to power up the aircraft" },
  { checkName: "Choose the respective mission" },
  { checkName: "Write and read the mission" },
  { checkName: "Reconfirm UAV heading and WP heading" },
  { checkName: "Check WP numbering & altitudes" }
];

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    default: Date.now,
    required: true
  },

  filedBy: String,
  filingTime: String,
  departureLocation: String,
  departureTime: String,
  arrivalLocation: String,
  estimatedArrivalTime: String,

  checklist: {
    type: [checklistItemSchema],
    default: defaultChecklist
  }

}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
