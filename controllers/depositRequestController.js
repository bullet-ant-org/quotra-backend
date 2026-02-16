const DepositRequest = require('../models/DepositRequest');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a deposit request
// @route   POST /api/depositRequests
// @access  Private
const createDepositRequest = asyncHandler(async (req, res) => {
  const { amount, method } = req.body;

  const depositRequest = new DepositRequest({
    userId: req.user._id,
    amount,
    method,
    status: 'pending',
  });

  const createdDepositRequest = await depositRequest.save();
  res.status(201).json(createdDepositRequest);
});

// @desc    Get user's deposit requests
// @route   GET /api/depositRequests/myrequests
// @access  Private
const getMyDepositRequests = asyncHandler(async (req, res) => {
  const depositRequests = await DepositRequest.find({ userId: req.user._id });
  res.json(depositRequests);
});

// @desc    Get all deposit requests
// @route   GET /api/depositRequests
// @access  Private/Admin
const getDepositRequests = asyncHandler(async (req, res) => {
  const depositRequests = await DepositRequest.find({}).populate('userId', 'username email');
  res.json(depositRequests);
});

// @desc    Get deposit request by ID
// @route   GET /api/depositRequests/:id
// @access  Private
const getDepositRequestById = asyncHandler(async (req, res) => {
  const depositRequest = await DepositRequest.findById(req.params.id).populate('userId', 'username email');

  if (depositRequest) {
    // Check if the request belongs to the user or if user is admin
    if (depositRequest.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(depositRequest);
  } else {
    res.status(404);
    throw new Error('Deposit request not found');
  }
});

// @desc    Update deposit request status
// @route   PUT /api/depositRequests/:id/status
// @access  Private/Admin
const updateDepositRequestStatus = asyncHandler(async (req, res) => {
  const { status, transactionId } = req.body;
  const depositRequest = await DepositRequest.findById(req.params.id);

  if (depositRequest) {
    depositRequest.status = status;
    if (transactionId) {
      depositRequest.transactionId = transactionId;
    }

    const updatedDepositRequest = await depositRequest.save();
    res.json(updatedDepositRequest);
  } else {
    res.status(404);
    throw new Error('Deposit request not found');
  }
});

module.exports = {
  createDepositRequest,
  getMyDepositRequests,
  getDepositRequests,
  getDepositRequestById,
  updateDepositRequestStatus,
};