const express = require('express');
const router = express.Router(); // Create a new router
const testController = require('../controllers/test.controllers'); // Import the controller

// Hello World API endpoint
router.get('/hello', testController.helloWorld);

// Export the router to use in the main server file
module.exports = router;
