const AssetOrder = require('../models/AssetOrder');
const Asset = require('../models/Asset');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create new asset order
// @route   POST /api/assetOrders
// @access  Private
const createAssetOrder = asyncHandler(async (req, res) => {
  const { assetId, orderType, amount } = req.body;

  const asset = await Asset.findById(assetId);
  const user = await User.findById(req.user._id);

  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }

  const totalCost = amount * asset.price;

  if (orderType === 'buy' && user.balance < totalCost) {
    res.status(400);
    throw new Error('Insufficient balance');
  }

  const order = new AssetOrder({
    userId: req.user._id,
    assetId,
    orderType,
    amount,
    price: asset.price,
    status: 'pending',
  });

  const createdOrder = await order.save();

  if (orderType === 'buy') {
    user.balance -= totalCost;
    await user.save();
  }

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user's asset orders
// @route   GET /api/assetOrders/myorders
// @access  Private
const getMyAssetOrders = asyncHandler(async (req, res) => {
  const orders = await AssetOrder.find({ userId: req.user._id }).populate('assetId', 'name symbol');
  res.json(orders);
});

// @desc    Get all asset orders
// @route   GET /api/assetOrders
// @access  Private/Admin
const getAssetOrders = asyncHandler(async (req, res) => {
  const orders = await AssetOrder.find({}).populate('userId', 'username').populate('assetId', 'name symbol');
  res.json(orders);
});

// @desc    Get asset order by ID
// @route   GET /api/assetOrders/:id
// @access  Private
const getAssetOrderById = asyncHandler(async (req, res) => {
  const order = await AssetOrder.findById(req.params.id).populate('userId', 'username').populate('assetId', 'name symbol');

  if (order) {
    // Check if the order belongs to the user or if user is admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update asset order status
// @route   PUT /api/assetOrders/:id/status
// @access  Private/Admin
const updateAssetOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await AssetOrder.findById(req.params.id);

  if (order) {
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  createAssetOrder,
  getMyAssetOrders,
  getAssetOrders,
  getAssetOrderById,
  updateAssetOrderStatus,
};