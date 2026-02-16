const Asset = require('../models/Asset');
const asyncHandler = require('express-async-handler');

// @desc    Get all assets (public)
// @route   GET /api/assets
// @access  Public
const getAssets = asyncHandler(async (req, res) => {
  const assets = await Asset.find({});
  res.json(assets);
});

// @desc    Get all assets (admin only, for admin panel)
// @route   GET /api/assets/all
// @access  Private/Admin
const getAllAssetsAdmin = asyncHandler(async (req, res) => {
  const assets = await Asset.find({});
  res.json(assets);
});

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Public
const getAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    res.json(asset);
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

// @desc    Create an asset
// @route   POST /api/assets
// @access  Private/Admin
const createAsset = asyncHandler(async (req, res) => {
  console.log('createAsset hit', req.body);
  // Accept all fields from req.body for flexibility
  const asset = new Asset({ ...req.body });
  const createdAsset = await asset.save();
  res.status(201).json(createdAsset);
});

// @desc    Update an asset
// @route   PUT /api/assets/:id
// @access  Private/Admin
const updateAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    // Update only provided fields
    Object.keys(req.body).forEach((key) => {
      asset[key] = req.body[key];
    });
    const updatedAsset = await asset.save();
    res.json(updatedAsset);
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

// @desc    Delete an asset
// @route   DELETE /api/assets/:id
// @access  Private/Admin
const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    await asset.remove();
    res.json({ message: 'Asset removed' });
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

module.exports = {
  getAssets,
  getAllAssetsAdmin,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};