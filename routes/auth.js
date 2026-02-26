const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const sendmail = require('../utils/sendmail');
const nodemailer = require('nodemailer');

const USERS_FILE = './data/users.json';

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

router.get('/login', (req, res) => {
  res.render('login', { error: null, user: {} });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Invalid credentials', user: {email} });
    }

    // Store user in session with explicit debug output
    console.log('User found during login:', {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });

    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    console.log('Session user after login:', req.session.user);
    
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('An error occurred. Please try again.');
  }
});

// Login Success Page
router.get('/login-success', (req, res) => {
  res.render('login-success', { user: req.session.user });
});

router.get('/signup', (req, res) => {
  res.render('signup', { error: null, user: {} });
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log('Signup data received:', { firstName, lastName, email, password }); // Debug log

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.render('signup', { error: 'All fields are required', user: {} });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Email already exists', user: {} });
    }

    const newUser = new User({ 
      firstName, 
      lastName, 
      email, 
      password, 
      bookings: [] 
    });
    await newUser.save();

    req.session.user = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };
    
    res.redirect('/signup-success');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Signup failed.');
  }
});

// Signup Success Page
router.get('/signup-success', (req, res) => {
  res.render('signup-success', { user: req.session.user });
});

// Register route (deprecated - maintained for backward compatibility)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Split the name into firstName and lastName
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    const newUser = new User({ 
      firstName, 
      lastName, 
      email, 
      password, 
      bookings: [] 
    });
    await newUser.save();

    req.session.user = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };
    
    res.redirect('/signup-success');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Registration failed.');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('An error occurred during logout.');
    }
    res.redirect('/');
  });
});

// Forgot Password - Request
router.get('/forget-password', (req, res) => {
  res.render('forget-password', { error: null, message: null, showResetForm: false });
});

// In-browser forgot password flow
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('forget-password', { error: 'No account with that email found.', message: null, showResetForm: false });
    }
    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send reset link via email
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const subject = 'Password Reset Request';
    const html = `<h1>Password Reset</h1>
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>`;
    await sendmail(user.email, subject, html);
    res.render('forget-password', { error: null, message: 'A password reset link has been sent to your email.', showResetForm: false });
  } catch (error) {
    console.error('Error in forget-password:', error);
    res.render('forget-password', { error: 'An error occurred. Please try again.', message: null, showResetForm: false });
  }
});

router.post('/reset-password-direct', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('forget-password', { error: 'No account with that email found.', message: null, showResetForm: false });
    }
    user.password = password;
    await user.save();
    res.render('password-updated');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.render('forget-password', { error: 'An error occurred. Please try again.', message: null, showResetForm: false });
  }
});

// Alias for /forgot-password to /forget-password
router.get('/forgot-password', (req, res) => {
  res.render('forget-password', { error: null, message: null, showResetForm: false });
});
router.post('/forgot-password', (req, res) => {
  res.redirect(307, '/forget-password'); // 307 preserves POST method and body
});

// Reset Password - Form
router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    return res.send('Password reset token is invalid or has expired.');
  }
  res.render('reset-password', { token, error: null });
});

// Reset Password - Submit
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    return res.send('Password reset token is invalid or has expired.');
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.render('password-updated');
});

// Contact form submission route
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mitrachirayu@gmail.com',
      pass: 'gupf nvyh jexv kwke'
    }
  });

  const mailOptions = {
    from: email,
    to: 'mitrachirayu@gmail.com',
    subject: `Hotel Feedback from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('contact-thankyou');
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

module.exports = router;

