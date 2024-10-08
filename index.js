// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Import the database connection module
const User = require('./models/User'); // Import User model
const Task = require('./models/Task'); // Import Task model
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Sync the database (creates tables)
db.sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hi!');
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.create({ username });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
    }
});

// Endpoint to create a new task for a user
app.post('/tasks', async (req, res) => {
    try {
        const { name, dueDate, isCompleted, userId } = req.body;
        const task = await Task.create({ name, dueDate, isCompleted, userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create task' });
    }
});

// Endpoint to fetch all tasks for a specific user
app.get('/users/:userId/tasks', async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.findAll({ where: { userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch tasks' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
