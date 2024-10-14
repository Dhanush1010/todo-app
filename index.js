// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Import the database connection module
const User = require('./models/User'); // Import User model
const Task = require('./models/Task'); // Import Task model
const testRoute = require('./routes/test.routes'); // Import the hello route
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

app.use('/api', testRoute)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
