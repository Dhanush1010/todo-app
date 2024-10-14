const Task = require('../models/Task'); // Adjust the path as necessary

// Create Task function
exports.createTask = async (req, res) => {
  const { name, dueDate, userId } = req.body; // Destructure the request body

  try {
    // Create a new task instance
    const newTask = await Task.create({
      name,
      dueDate,
      userId
    });

    // Send back the created task
    res.status(201).json({
      taskid: newTask.taskid,
      name: newTask.name,
      dueDate: newTask.dueDate,
      userId: newTask.userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit Task function
exports.editTask = async (req, res) => {
  const { taskid } = req.params; // Get taskid from the URL parameters
  const { name, dueDate } = req.body; // Destructure the request body

  try {
    // Find the task by taskid
    const task = await Task.findOne({ where: { taskid } });

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task's fields
    if (name) task.name = name;           // Only update if provided
    if (dueDate) task.dueDate = dueDate; // Only update if provided

    // Save the updated task
    await task.save();

    // Send back the updated task
    res.status(200).json({
      taskid: task.taskid,
      name: task.name,
      dueDate: task.dueDate,
      userId: task.userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Toggle Task Completion function
exports.toggleTaskCompletion = async (req, res) => {
  const { taskid } = req.params; // Get taskid from the URL parameters

  try {
    // Find the task by taskid
    const task = await Task.findOne({ where: { taskid } });

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Toggle the isCompleted state
    task.isCompleted = !task.isCompleted;

    // Save the updated task
    await task.save();

    // Send back the updated task
    res.status(200).json({
      taskid: task.taskid,
      name: task.name,
      dueDate: task.dueDate,
      isCompleted: task.isCompleted,
      userId: task.userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Task function
exports.deleteTask = async (req, res) => {
  const { taskid } = req.params; // Get taskid from the URL parameters

  try {
    // Find the task by taskid
    const task = await Task.findOne({ where: { taskid } });

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task
    await task.destroy();

    // Send back a success message
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Tasks by User ID function
exports.getAllTasksByUserId = async (req, res) => {
  const { userId } = req.params; // Get userId from the URL parameters

  try {
    // Find all tasks associated with the userId
    const tasks = await Task.findAll({ where: { userId } });

    // Check if any tasks were found
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    // Send back the tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
