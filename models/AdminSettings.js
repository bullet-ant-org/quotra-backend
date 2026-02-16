const mongoose = require('mongoose');

const AdminSettingsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: 'globalAdminSettings',
  },
  bitcoin: {
    blockchain: { type: String, default: 'BTC' },
    walletAddress: { type: String, default: '' },
  },
  ethereum: {
    blockchain: { type: String, default: 'ERC20 (ETH)' },
    walletAddress: { type: String, default: '' },
  },
  usdt: {
    blockchain: { type: String, default: 'TRC20 (Tron)' },
    walletAddress: { type: String, default: '' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AdminSettings', AdminSettingsSchema);