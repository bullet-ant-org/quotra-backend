const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // Generate token with id and role for compatibility
    const token = generateToken({ id: user._id, role: user.role });
    res.json({
      access_token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        // add other user fields as needed
      },
      // fallback fields for legacy frontend
      _id: user._id,
      token,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password, // This will be automatically hashed by the pre-save hook
  });

  if (user) {
    // Generate token with id and role for compatibility
    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({
      access_token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      _id: user._id,
      token,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      balance: user.balance,
      fullName: user.fullName,
      phone: user.phone,
      profileImageUrl: user.profileImageUrl,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.fullName = req.body.fullName || user.fullName;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password; // The pre-save hook will hash it
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// ...existing code...

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (user or admin)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Ensure role is always present for admin check
      fullName: user.fullName,
      phone: user.phone,
      profileImageUrl: user.profileImageUrl,
      balance: user.balance,
      bonus: user.bonus,
      Profit: user.Profit,
      totalInvestmentsAllTime: user.totalInvestmentsAllTime,
      totalBonusesCount: user.totalBonusesCount,
      depositHistoryCount: user.depositHistoryCount,
      withdrawalHistoryCount: user.withdrawalHistoryCount,
      investmentHistoryCount: user.investmentHistoryCount,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user by ID (profile, including profileImageUrl)
// @route   PATCH /api/users/:id
// @access  Private (user or admin)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    // Only allow updating certain fields
    const allowedFields = [
      'username', 'email', 'role', 'phone', 'fullName', 'profileImageUrl', 'bonus', 'balance', 'Profit', 'totalInvestmentsAllTime', 'totalBonusesCount', 'depositHistoryCount', 'withdrawalHistoryCount', 'investmentHistoryCount'
    ];
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        user[key] = req.body[key];
      }
    });
    await user.save();
    res.json({ message: 'User updated', profileImageUrl: user.profileImageUrl });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/users/all
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  getUsers,
  // ...other exports
};