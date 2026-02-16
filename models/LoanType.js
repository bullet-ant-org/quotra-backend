const mongoose = require('mongoose');

const LoanTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  amountRange: {
    type: String,
    required: true,
  },
  quota: {
    type: String,
    required: true,
  },
  descriptionPoints: [
    {
      text: { type: String, required: true },
      included: { type: Boolean, default: false },
    }
  ],
  applicationFee: {
    type: Number,
    required: true,
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LoanType', LoanTypeSchema);