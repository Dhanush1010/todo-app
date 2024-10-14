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

// Login function
exports.loginUser = async (req, res) => {
  const { username, password } = req.body; // Destructure the request body

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      userid: user.userid,
      username: user.username,
      role: user.role, // Optional: return role if you want
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
