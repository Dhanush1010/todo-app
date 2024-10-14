// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db'); // Import the Sequelize instance from your `db.js` file

const User = db.sequelize.define('User', {
  userid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // Automatically increment the userid
    primaryKey: true      // Set userid as the primary key
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,     // Make username required
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,     // Make password required
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,     // Make role required
    defaultValue: 'user', // Set default value to 'user'
  },
}, {
  tableName: 'users',      // This will define the table name in the DB as 'users'
});

module.exports = User;
