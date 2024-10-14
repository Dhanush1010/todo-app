const express = require('express');
const router = express.Router(); // Create a new router
const testController = require('../controllers/user.controllers'); // Import the controller



// Export the router to use in the main server file
module.exports = router;