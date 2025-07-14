const mongoose = require('mongoose'); // Only once at the top

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  bloodGroup: { type: String },
  isDonor: { type: Boolean, default: false },
  availability: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// ✅ Safe export to avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
