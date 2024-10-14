const express = require('express');
const router = express.Router(); // Create a new router
const adminController = require('../controllers/admin.controllers'); // Import the controller

// Admin login API endpoint
router.post('/login', adminController.adminLogin);

// Get all users with role 'user' API endpoint
router.get('/getallusers', adminController.getAllUsers);

// Export the router to use in the main server file
module.exports = router;