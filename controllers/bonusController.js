const Bonus = require('../models/Bonus');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user's bonuses
// @route   GET /api/bonuses/myboni
// @access  Private
const getMyBonuses = asyncHandler(async (req, res) => {
  const bonuses = await Bonus.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(bonuses);
});

// @desc    Get all bonuses
// @route   GET /api/bonuses
// @access  Private/Admin
const getBonuses = asyncHandler(async (req, res) => {
  const bonuses = await Bonus.find({}).populate('userId', 'username email').sort({ createdAt: -1 });
  res.json(bonuses);
});

// @desc    Create a bonus
// @route   POST /api/bonuses
// @access  Private/Admin
const createBonus = asyncHandler(async (req, res) => {
  const { userId, amount, type, description, expiresAt } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const bonus = new Bonus({
    userId,
    amount,
    type,
    description,
    expiresAt,
    status: 'pending',
  });

  const createdBonus = await bonus.save();
  res.status(201).json(createdBonus);
});

// @desc    Update bonus status
// @route   PUT /api/bonuses/:id/status
// @access  Private/Admin
const updateBonusStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const bonus = await Bonus.findById(req.params.id);

  if (bonus) {
    // If crediting the bonus, add to user's balance
    if (status === 'credited' && bonus.status !== 'credited') {
      const user = await User.findById(bonus.userId);
      if (user) {
        user.balance += bonus.amount;
        await user.save();
      }
    }

    bonus.status = status;
    const updatedBonus = await bonus.save();
    res.json(updatedBonus);
  } else {
    res.status(404);
    throw new Error('Bonus not found');
  }
});

module.exports = {
  getMyBonuses,
  getBonuses,
  createBonus,
  updateBonusStatus,
};