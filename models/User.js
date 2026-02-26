const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bookings: [
    {
      hotelName: String,
      checkIn: String,
      checkOut: String,
      guests: Number,
      total: Number,
    },
  ],
});

// Password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// User information for auth response
userSchema.methods.getAuthInfo = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  };
};

module.exports = mongoose.model('User', userSchema);