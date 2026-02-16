const mongoose = require('mongoose');


const DepositRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  crypto: {
    type: String,
    required: true,
  },
  blockchain: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    default: 'N/A', // Make it optional and provide a default
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('DepositRequest', DepositRequestSchema);