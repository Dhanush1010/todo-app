const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Admin Login function
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body; // Destructure the request body

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user's role is 'admin'
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: not an admin' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({
      message: 'Admin login successful',
      userid: user.userid,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Users with Role 'user' function
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users with role 'user'
    const users = await User.findAll({
      where: {
        role: 'user' // Filter by role
      }
    });

    // Check if any users were found
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with the role of "user"' });
    }

    // Send back the users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
