const mongoose = require('mongoose');


const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  features: [
    {
      text: { type: String, required: true },
      included: { type: Boolean, default: false },
    }
  ],
  profitPotential: {
    type: Number,
    required: true,
  },
  tradeDurationDays: {
    type: Number,
    default: null,
  },
  buttonText: {
    type: String,
    default: '',
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  period: {
    type: String,
    default: '',
  },
  tradeTime: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Asset', AssetSchema);