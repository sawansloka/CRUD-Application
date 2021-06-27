const mongoose = require('mongoose');

// Schema for a MongoDB collection//

const userSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
