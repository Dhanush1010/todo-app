const express = require('express');
const router = express.Router(); // Create a new router
const taskController = require('../controllers/task.controllers'); // Import the controller

router.post('/createtasks', taskController.createTask);

// Edit task API endpoint
router.put('/edittask/:taskid', taskController.editTask);

// Toggle task completion API endpoint
router.put('/toggle/:taskid', taskController.toggleTaskCompletion);

// Delete task API endpoint
router.delete('/delete/:taskid', taskController.deleteTask);

// Get all tasks by userId API endpoint
router.get('/user/:userId', taskController.getAllTasksByUserId);

// Export the router to use in the main server file
module.exports = router;