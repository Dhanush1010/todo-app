// models/Task.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db'); // Import the Sequelize instance
const User = require('./User'); // Import the User model to reference it

const Task = db.sequelize.define('Task', {
  taskid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // Automatically increment taskid
    primaryKey: true      // Set taskid as the primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false      // Make name required
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false      // Make dueDate required
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false   // Default value for isCompleted is false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,     // Ensure userId is required
    references: {
      model: User,         // Reference the User model
      key: 'userid'        // Use userid from the User table as the foreign key
    },
    onDelete: 'CASCADE'    // Cascade delete on user deletion
  }
}, {
  tableName: 'tasks',       // Set the table name in the DB as 'tasks'
});

module.exports = Task;
