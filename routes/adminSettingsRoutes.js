const express = require('express');
const router = express.Router();
const {
  getAdminSettings, // Corrected: Removed trailing comma
  updateAdminSettings
} = require('../controllers/adminSettingsController');

// Protected route for any logged-in user to view settings (e.g., for deposit page)
// It will fetch the single 'globalAdminSettings' document.
router.get('/view', getAdminSettings);

// Routes for any logged-in user to get and update settings.
router.get('/edit', getAdminSettings);
router.put('/edit', updateAdminSettings);

module.exports = router;