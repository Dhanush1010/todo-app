const express = require('express');
const router = express.Router(); // Create a new router
const userController = require('../controllers/user.controllers'); // Import the controller

router.post('/create', userController.createUser);

router.post('/login', userController.loginUser);

// Export the router to use in the main server file
module.exports = router;