const express = require('express');
const router = express.Router();
const {
  getMyBonuses,
  getBonuses,
  createBonus,
  updateBonusStatus,
} = require('../controllers/bonusController');
const { protect, admin } = require('../middlewares/auth');

router.route('/')
  .get(protect, getMyBonuses)
  .post(protect, admin, createBonus);
router.get('/all', protect, admin, getBonuses);
router.put('/:id/status', protect, admin, updateBonusStatus);

module.exports = router;