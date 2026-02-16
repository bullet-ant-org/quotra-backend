const AdminSettings = require('../models/AdminSettings');
const asyncHandler = require('express-async-handler');

// @desc    Get admin settings by ID
// @route   GET /api/adminSettings/:id
// @access  Private/Admin
const getAdminSettings = asyncHandler(async (req, res) => {
  // Use 'globalAdminSettings' if no id is provided (for the '/view' route)
  const id = 'globalAdminSettings';
  let adminSettings = await AdminSettings.findOne({ id });

  if (adminSettings) {
    res.json(adminSettings);
  } else {
    // If settings don't exist for that ID, create and return a default one.
    // This is useful for the first time the admin panel is loaded.
    const newSettings = await AdminSettings.create({ id: 'globalAdminSettings' });
    res.status(200).json(newSettings); // Return 200 OK instead of 201 Created
  }
});

// @desc    Update admin settings
// @route   PUT /api/adminSettings/:id
// @access  Private/Admin
const updateAdminSettings = asyncHandler(async (req, res) => {
  const id = 'globalAdminSettings';

  // Use findOneAndUpdate with `upsert: true` to either update or create the document.
  // The `new: true` option ensures the updated document is returned.
  const updatedSettings = await AdminSettings.findOneAndUpdate(
    { id },
    { $set: req.body, updatedAt: Date.now() },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.json(updatedSettings);
});

module.exports = {
  getAdminSettings,
  updateAdminSettings,
};