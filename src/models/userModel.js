const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
    min: 1,
  },
  sellers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  }],
  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Users', userSchema);
