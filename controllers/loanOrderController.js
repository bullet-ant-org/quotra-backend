const LoanOrder = require('../models/LoanOrder');
const LoanType = require('../models/LoanType');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a loan order
// @route   POST /api/loanOrders
// @access  Private
const createLoanOrder = asyncHandler(async (req, res) => {
  const { loanTypeId, amount, duration } = req.body;

  const loanType = await LoanType.findById(loanTypeId);
  if (!loanType) {
    res.status(404);
    throw new Error('Loan type not found');
  }

  if (amount > loanType.maxAmount) {
    res.status(400);
    throw new Error('Amount exceeds maximum for this loan type');
  }

  // Calculate monthly payment and total repayment
  const monthlyInterestRate = loanType.interestRate / 100 / 12;
  const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -duration));
  const totalRepayment = monthlyPayment * duration;

  const loanOrder = new LoanOrder({
    userId: req.user._id,
    loanTypeId,
    amount,
    duration,
    interestRate: loanType.interestRate,
    monthlyPayment,
    totalRepayment,
    status: 'pending',
  });

  const createdLoanOrder = await loanOrder.save();
  res.status(201).json(createdLoanOrder);
});

// @desc    Get user's loan orders
// @route   GET /api/loanOrders/myorders
// @access  Private
const getMyLoanOrders = asyncHandler(async (req, res) => {
  const loanOrders = await LoanOrder.find({ userId: req.user._id }).populate('loanTypeId', 'name interestRate');
  res.json(loanOrders);
});

// @desc    Get all loan orders
// @route   GET /api/loanOrders
// @access  Private/Admin
const getLoanOrders = asyncHandler(async (req, res) => {
  const loanOrders = await LoanOrder.find({}).populate('userId', 'username email').populate('loanTypeId', 'name interestRate');
  res.json(loanOrders);
});

// @desc    Get loan order by ID
// @route   GET /api/loanOrders/:id
// @access  Private
const getLoanOrderById = asyncHandler(async (req, res) => {
  const loanOrder = await LoanOrder.findById(req.params.id)
    .populate('userId', 'username email')
    .populate('loanTypeId', 'name interestRate');

  if (loanOrder) {
    // Check if the order belongs to the user or if user is admin
    if (loanOrder.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(loanOrder);
  } else {
    res.status(404);
    throw new Error('Loan order not found');
  }
});

// @desc    Update loan order status
// @route   PUT /api/loanOrders/:id/status
// @access  Private/Admin
const updateLoanOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const loanOrder = await LoanOrder.findById(req.params.id);

  if (loanOrder) {
    // If approving, add loan amount to user's balance
    if (status === 'approved' && loanOrder.status === 'pending') {
      const user = await User.findById(loanOrder.userId);
      if (user) {
        user.balance += loanOrder.amount;
        await user.save();
      }
    }

    loanOrder.status = status;
    const updatedLoanOrder = await loanOrder.save();
    res.json(updatedLoanOrder);
  } else {
    res.status(404);
    throw new Error('Loan order not found');
  }
});

module.exports = {
  createLoanOrder,
  getMyLoanOrders,
  getLoanOrders,
  getLoanOrderById,
  updateLoanOrderStatus,
};