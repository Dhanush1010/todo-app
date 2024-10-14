const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Create User function
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body; // Destructure the request body

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password
    const saltRounds = 10; // You can adjust this value based on your security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const newUser = await User.create({
      username,
      password: hashedPassword, // Store the hashed password
      role: role || 'user', // Default role to 'user' if not provided
    });

    // Send back the created user (excluding the password)
    res.status(201).json({
      userid: newUser.userid,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
