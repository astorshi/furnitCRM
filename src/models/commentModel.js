const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  body: {
    type: String,
    requried: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date,
    requried: true,
  },

});

module.exports = mongoose.model('Comments', commentSchema);
