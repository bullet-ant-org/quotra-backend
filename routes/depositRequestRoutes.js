const express = require('express');
const router = express.Router();
const {
  createDepositRequest,
  getMyDepositRequests,
  getDepositRequests,
  getDepositRequestById,
  updateDepositRequestStatus,
} = require('../controllers/depositRequestController');
const { protect, admin } = require('../middlewares/auth');

// Authenticated users get their own deposit requests, admin gets all
router.route('/')
  .post(protect, createDepositRequest)
  .get(protect, getMyDepositRequests); // GET /api/depositRequests returns only user's own unless admin
router.get('/all', protect, admin, getDepositRequests); // GET /api/depositRequests/all for admin
router
  .route('/:id')
  .get(protect, getDepositRequestById);
router.put('/:id/status', protect, admin, updateDepositRequestStatus);

module.exports = router;