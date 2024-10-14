const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'todo',            // Database name
  'root',            // Username
  'BASIL1bhagya@',   // Password
  {
    host: 'localhost', // Database host
    dialect: 'mysql',  // Database dialect
    port: 3306,        // Database port
    dialectOptions: {
      connectTimeout: 60000,  // Optional connection timeout
    },
    define: {
      timestamps: false, // Disable automatic timestamps
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
