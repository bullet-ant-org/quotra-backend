const express = require('express');
const router = express.Router();
const {
  getLoanTypes,
  getLoanTypeById,
  createLoanType,
  updateLoanType,
  deleteLoanType,
} = require('../controllers/loanTypeController');
const { protect, admin } = require('../middlewares/auth');

router.route('/').get(getLoanTypes).post(protect, admin, createLoanType);
router
  .route('/:id')
  .get(getLoanTypeById)
  .put(protect, admin, updateLoanType)
  .delete(protect, admin, deleteLoanType);

module.exports = router;