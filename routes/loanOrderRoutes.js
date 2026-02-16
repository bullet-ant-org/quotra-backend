const express = require('express');
const router = express.Router();
const {
  createLoanOrder,
  getMyLoanOrders,
  getLoanOrders,
  getLoanOrderById,
  updateLoanOrderStatus,
} = require('../controllers/loanOrderController');
const { protect, admin } = require('../middlewares/auth');

router.route('/')
  .post(protect, createLoanOrder)
  .get(protect, getMyLoanOrders);
router.get('/all', protect, admin, getLoanOrders);
router
  .route('/:id')
  .get(protect, getLoanOrderById);
router.put('/:id/status', protect, admin, updateLoanOrderStatus);

module.exports = router;