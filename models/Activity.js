const mongoose = require('mongoose');


const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  details: {
    ipAddress: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    regionName: { type: String, default: '' },
    status: { type: String, default: '' },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);