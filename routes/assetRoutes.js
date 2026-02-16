const express = require('express');
const router = express.Router();
const {
  getAssets,
  getAllAssetsAdmin,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} = require('../controllers/assetController');
const { protect, admin } = require('../middlewares/auth');


// Admin fetch all assets route must come before :id route
router.route('/all').get(protect, admin, getAllAssetsAdmin);
router.route('/').get(getAssets).post(protect, admin, createAsset);
router
  .route('/:id')
  .get(getAssetById)
  .put(protect, admin, updateAsset)
  .delete(protect, admin, deleteAsset);

module.exports = router;