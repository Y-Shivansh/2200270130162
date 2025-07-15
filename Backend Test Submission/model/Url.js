import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  timestamp: Date,
  referrer: String,
  location: String,
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  clickLogs: [clickSchema],
});

export default mongoose.model('Url', urlSchema);
