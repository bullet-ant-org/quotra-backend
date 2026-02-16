const express = require('express');
const router = express.Router();
const {
  createWithdrawalRequest,
  getMyWithdrawalRequests,
  getWithdrawalRequests,
  getWithdrawalRequestById,
  updateWithdrawalRequestStatus,
} = require('../controllers/withdrawalRequestController');
const { protect, admin } = require('../middlewares/auth');

router.route('/')
  .post(protect, createWithdrawalRequest)
  .get(protect, getMyWithdrawalRequests);
router.get('/all', protect, admin, getWithdrawalRequests);
router
  .route('/:id')
  .get(protect, getWithdrawalRequestById);
router.put('/:id/status', protect, admin, updateWithdrawalRequestStatus);

module.exports = router;