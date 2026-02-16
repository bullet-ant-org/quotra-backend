const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  balance: {
    type: Number,
    default: 0,
  },
  profilePictureUrl: {
    type: String,
    default: '',
  },
  fullName: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  withdrawalAccount: {
    type: String,
    default: '',
  },
  profileImageUrl: {
    type: String,
    default: '',
  },
  last_login: {
    type: Date,
    default: null,
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalBalance: {
    type: Number,
    default: 0,
  },
  accountStatus: {
    type: String,
    default: 'pending_verification',
  },
  otp: {
    type: String,
    default: '',
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);