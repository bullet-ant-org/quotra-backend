const Activity = require('../models/Activity');
const asyncHandler = require('express-async-handler');

// @desc    Get user's activities
// @route   GET /api/activities/myactivities
// @access  Private
const getMyActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(activities);
});

// @desc    Get all activities
// @route   GET /api/activities
// @access  Private/Admin
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({}).populate('userId', 'username email').sort({ createdAt: -1 });
  res.json(activities);
});

// @desc    Create an activity (usually called from other controllers)
// @route   POST /api/activities
// @access  Private
const createActivity = asyncHandler(async (req, res) => {
  // The frontend sends `activityType` and `details`. Let's use those.
  const { activityType, details } = req.body;

  const activity = new Activity({
    userId: req.user._id,
    activityType: activityType, // Use 'activityType' from the request
    details: details,           // Pass the 'details' object
    timestamp: new Date(),      // Ensure a fresh timestamp
  });

  const createdActivity = await activity.save();
  res.status(201).json(createdActivity);
});

// @desc    Get all activities (admin only)
// @route   GET /api/activities/all
// @access  Private/Admin
const getAllActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({}).populate('userId', 'username email').sort({ createdAt: -1 });
  res.json(activities);
});

module.exports = {
  getMyActivities,
  getActivities,
  createActivity,
  getAllActivities,
};