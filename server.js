const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./middleware/authMiddleware');
const User = require('./models/User');

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const clientDistPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDistPath));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net"
        ],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": [
          "'self'",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
          "data:"
        ],
        "connect-src": ["'self'"],
        "frame-src": ["'self'", "https://www.google.com", "https://maps.google.com"],
      },
    },
  })
);

app.use(cors());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', authRoutes);



app.get('/api/home', (req, res) => {
  res.json({ user: req.session.user });
});

app.get('/api/about', (req, res) => {
  res.json({ user: req.session.user });
});

app.get('/api/contact', (req, res) => {
  res.json({ user: req.session.user });
});

app.get('/api/thankyou', isAuthenticated, (req, res) => {
  res.json({ user: req.session.user });
});

app.get('/api/payment', isAuthenticated, (req, res) => {
  const { hotelName, checkIn, checkOut, guests, total } = req.query;

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  res.json({
    hotelName: hotelName || 'Hotel Name Not Provided',
    checkIn: checkIn || formattedDate,
    checkOut: checkOut || 'N/A',
    guests: guests || 'N/A',
    total: total || '0',
  });
});

app.post('/api/process-payment', async (req, res) => {
  const { guests, total, checkIn, checkOut, hotelName } = req.body;

  try {
    if (req.session.user) {
      const user = await User.findById(req.session.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      user.bookings.push({
        hotelName: hotelName || 'Default Hotel',
        checkIn: checkIn || 'N/A',
        checkOut: checkOut || 'N/A',
        guests: guests ? parseInt(guests, 10) : 1,
        total: total ? parseInt(total, 10) : 0
      });

      await user.save();
    }

    res.json({ success: true, redirect: '/thankyou' });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed: ' + error.message });
  }
});

app.get('/api/dashboard', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).lean();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error loading dashboard.' });
  }
});

app.get('/api/profile', isAuthenticated, (req, res) => {
  res.json({ redirect: '/dashboard' });
});

app.post('/api/cancel-booking', isAuthenticated, async (req, res) => {
  const { bookingIndex } = req.body;

  try {
    const user = await User.findById(req.session.user._id);
    console.log(`Cancelling booking at index ${bookingIndex} for user ${user.email}`);
    if (user && user.bookings && user.bookings.length > bookingIndex) {
      user.bookings.splice(bookingIndex, 1);
      user.markModified('bookings');
      await user.save();
      console.log('Booking successfully removed and user saved.');
    } else {
      console.warn('Booking index out of bounds or user/bookings not found.');
    }
    res.json({ success: true, redirect: '/dashboard' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Could not cancel booking.' });
  }
});

app.use((req, res) => {
  const indexFile = path.join(__dirname, 'client', 'dist', 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      res.status(200).send('Hotel Link API running. In dev mode, use http://localhost:5173');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});