const express = require('express');
const router = express.Router();
const {
  getMyActivities,
  getActivities,
  createActivity,
  getAllActivities,
} = require('../controllers/activityController');
const { protect, admin } = require('../middlewares/auth');


// Separate the routes for clarity and correct middleware application.
router.route('/').post(protect, createActivity); // POST is for creating an activity (e.g., login)
router.route('/').get(protect, admin, getActivities); // GET is for fetching all activities (admin only)
router.get('/myactivities', protect, getMyActivities);
router.get('/all', protect, admin, getAllActivities);

module.exports = router;