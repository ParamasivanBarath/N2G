const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const userRoutes = require('./Routes/users').router;
app.use('/users', userRoutes);


// Create users table
const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      phonenumber VARCHAR(15) NOT NULL,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating Users table:', err);
    } else {
      console.log('Users table checked/created successfully');
    }
  });
};

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;
  
    // Validate input
    if (!name?.trim() || !phoneNumber?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }
  
    try {
      // Check if user exists
      const checkUserSql = 'SELECT * FROM users WHERE phonenumber = ? OR email = ?';
      const [existingUsers] = await db.query(checkUserSql, [phoneNumber, email]);
  
      if (existingUsers.length > 0) {
        return res.status(409).json({ 
          error: 'User with this phone number or email already exists' 
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new user
      const insertUserSql = `
        INSERT INTO users (name, phonenumber, email, password) 
        VALUES (?, ?, ?, ?)
      `;
      
      await db.query(insertUserSql, [
        name.trim(), 
        phoneNumber.trim(), 
        email.trim(), 
        hashedPassword
      ]);
  
      res.status(201).json({ message: 'User created successfully' });
  
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Signin endpoint
router.post('/signin', async (req, res) => {
  const { phonenumber, password } = req.body;

  if (!phonenumber || !password) {
    return res.status(400).json({ error: 'Phone number and password are required' });
  }

  try {
    if ((phonenumber === '9361918001' || phonenumber === '+919361918001') && password === 'Admin@123') {
      return res.json({ message: 'Admin login successful', isAdmin: true });
    }

    const sql = 'SELECT * FROM users WHERE phonenumber = ?';
    db.query(sql, [phonenumber], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      res.json({ message: 'User login successful', isAdmin: false });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = { router, createUsersTable };