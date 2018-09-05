const path = require('path');
const bcrypt = require('bcrypt');

const mongoose = require(path.resolve('./db'));

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: false,
  },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: String, select: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
