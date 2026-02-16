const Transaction = require('../models/Transaction');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private/Admin
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({}).populate('userId', 'username email');
  res.json(transactions);
});

// @desc    Get user's transactions
// @route   GET /api/transactions/mytransactions
// @access  Private
const getMyTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
});

// @desc    Get transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).populate('userId', 'username email');

  if (transaction) {
    // Check if the transaction belongs to the user or if user is admin
    if (transaction.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(transaction);
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
});

// @desc    Create a transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
  const { amount, type, description } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate a unique reference (in a real app, use a better method)
  const reference = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const transaction = new Transaction({
    userId: req.user._id,
    amount,
    type,
    status: 'pending',
    reference,
    description,
  });

  const createdTransaction = await transaction.save();
  res.status(201).json(createdTransaction);
});

// @desc    Update transaction status
// @route   PUT /api/transactions/:id/status
// @access  Private/Admin
const updateTransactionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    transaction.status = status;
    const updatedTransaction = await transaction.save();

    // If transaction is completed, update user balance
    if (status === 'completed') {
      const user = await User.findById(transaction.userId);
      if (user) {
        if (transaction.type === 'deposit') {
          user.balance += transaction.amount;
        } else if (transaction.type === 'withdrawal') {
          user.balance -= transaction.amount;
        }
        await user.save();
      }
    }

    res.json(updatedTransaction);
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
});

module.exports = {
  getTransactions,
  getMyTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
};