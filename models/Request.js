// backend/models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  bloodGroupNeeded: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  location: { type: String, required: true },
  hospital: String,
  units: Number,
  requiredDate: Date,
  reason: String,
  fulfilled: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Request', requestSchema);
