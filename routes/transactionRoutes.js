const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getMyTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
} = require('../controllers/transactionController');
const { protect, admin } = require('../middlewares/auth');

router.route('/')
  .get(protect, getMyTransactions)
  .post(protect, createTransaction);
router.get('/all', protect, admin, getTransactions);
router
  .route('/:id')
  .get(protect, getTransactionById);
router.put('/:id/status', protect, admin, updateTransactionStatus);

module.exports = router;