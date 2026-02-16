const express = require('express');
const router = express.Router();
const {
  createAssetOrder,
  getMyAssetOrders,
  getAssetOrders,
  getAssetOrderById,
  updateAssetOrderStatus,
} = require('../controllers/assetOrderController');
const { protect, admin } = require('../middlewares/auth');

router.route('/')
  .post(protect, createAssetOrder)
  .get(protect, getMyAssetOrders);
router.get('/all', protect, admin, getAssetOrders);
router
  .route('/:id')
  .get(protect, getAssetOrderById);
router.put('/:id/status', protect, admin, updateAssetOrderStatus);

module.exports = router;