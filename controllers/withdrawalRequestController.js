const WithdrawalRequest = require('../models/WithdrawalRequest');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a withdrawal request
// @route   POST /api/withdrawalRequests
// @access  Private
const createWithdrawalRequest = asyncHandler(async (req, res) => {
  const { amount, method, accountDetails } = req.body;

  const user = await User.findById(req.user._id);

  if (user.balance < amount) {
    res.status(400);
    throw new Error('Insufficient balance');
  }

  const withdrawalRequest = new WithdrawalRequest({
    userId: req.user._id,
    amount,
    method,
    accountDetails,
    status: 'pending',
  });

  const createdWithdrawalRequest = await withdrawalRequest.save();
  
  // Deduct from user's balance immediately
  user.balance -= amount;
  await user.save();

  res.status(201).json(createdWithdrawalRequest);
});

// @desc    Get user's withdrawal requests
// @route   GET /api/withdrawalRequests/myrequests
// @access  Private
const getMyWithdrawalRequests = asyncHandler(async (req, res) => {
  const withdrawalRequests = await WithdrawalRequest.find({ userId: req.user._id });
  res.json(withdrawalRequests);
});

// @desc    Get all withdrawal requests
// @route   GET /api/withdrawalRequests
// @access  Private/Admin
const getWithdrawalRequests = asyncHandler(async (req, res) => {
  const withdrawalRequests = await WithdrawalRequest.find({}).populate('userId', 'username email');
  res.json(withdrawalRequests);
});

// @desc    Get withdrawal request by ID
// @route   GET /api/withdrawalRequests/:id
// @access  Private
const getWithdrawalRequestById = asyncHandler(async (req, res) => {
  const withdrawalRequest = await WithdrawalRequest.findById(req.params.id).populate('userId', 'username email');

  if (withdrawalRequest) {
    // Check if the request belongs to the user or if user is admin
    if (withdrawalRequest.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(withdrawalRequest);
  } else {
    res.status(404);
    throw new Error('Withdrawal request not found');
  }
});

// @desc    Update withdrawal request status
// @route   PUT /api/withdrawalRequests/:id/status
// @access  Private/Admin
const updateWithdrawalRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const withdrawalRequest = await WithdrawalRequest.findById(req.params.id);

  if (withdrawalRequest) {
    // If rejecting, return funds to user
    if (status === 'rejected' && withdrawalRequest.status === 'pending') {
      const user = await User.findById(withdrawalRequest.userId);
      if (user) {
        user.balance += withdrawalRequest.amount;
        await user.save();
      }
    }

    withdrawalRequest.status = status;
    const updatedWithdrawalRequest = await withdrawalRequest.save();
    res.json(updatedWithdrawalRequest);
  } else {
    res.status(404);
    throw new Error('Withdrawal request not found');
  }
});

module.exports = {
  createWithdrawalRequest,
  getMyWithdrawalRequests,
  getWithdrawalRequests,
  getWithdrawalRequestById,
  updateWithdrawalRequestStatus,
};