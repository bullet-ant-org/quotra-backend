const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth');



// Admin-only: get all users
router.get('/all', protect, admin, getUsers);
// Get user by ID (admin or user)
router.get('/:id', protect, getUserById);

router.post('/login', authUser);
router.post('/', registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
module.exports = router;