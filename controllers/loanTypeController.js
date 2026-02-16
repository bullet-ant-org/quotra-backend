const LoanType = require('../models/LoanType');
const asyncHandler = require('express-async-handler');

// @desc    Get all loan types
// @route   GET /api/loanTypes
// @access  Public
const getLoanTypes = asyncHandler(async (req, res) => {
  const loanTypes = await LoanType.find({});
  res.json(loanTypes);
});

// @desc    Get single loan type
// @route   GET /api/loanTypes/:id
// @access  Public
const getLoanTypeById = asyncHandler(async (req, res) => {
  const loanType = await LoanType.findById(req.params.id);

  if (loanType) {
    res.json(loanType);
  } else {
    res.status(404);
    throw new Error('Loan type not found');
  }
});

// @desc    Create a loan type
// @route   POST /api/loanTypes
// @access  Private/Admin
const createLoanType = asyncHandler(async (req, res) => {
  const { name, interestRate, maxAmount, duration, description } = req.body;

  const loanType = new LoanType({
    name,
    interestRate,
    maxAmount,
    duration,
    description,
  });

  const createdLoanType = await loanType.save();
  res.status(201).json(createdLoanType);
});

// @desc    Update a loan type
// @route   PUT /api/loanTypes/:id
// @access  Private/Admin
const updateLoanType = asyncHandler(async (req, res) => {
  const { name, interestRate, maxAmount, duration, description } = req.body;

  const loanType = await LoanType.findById(req.params.id);

  if (loanType) {
    loanType.name = name || loanType.name;
    loanType.interestRate = interestRate || loanType.interestRate;
    loanType.maxAmount = maxAmount || loanType.maxAmount;
    loanType.duration = duration || loanType.duration;
    loanType.description = description || loanType.description;

    const updatedLoanType = await loanType.save();
    res.json(updatedLoanType);
  } else {
    res.status(404);
    throw new Error('Loan type not found');
  }
});

// @desc    Delete a loan type
// @route   DELETE /api/loanTypes/:id
// @access  Private/Admin
const deleteLoanType = asyncHandler(async (req, res) => {
  const loanType = await LoanType.findById(req.params.id);

  if (loanType) {
    await loanType.remove();
    res.json({ message: 'Loan type removed' });
  } else {
    res.status(404);
    throw new Error('Loan type not found');
  }
});

module.exports = {
  getLoanTypes,
  getLoanTypeById,
  createLoanType,
  updateLoanType,
  deleteLoanType,
};