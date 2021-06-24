const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: String,    
  },
  body: {
    type: String,
    requried: true,
  },
  date: {
    type: String,
    requried: true,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
