const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  number: {
    type: String,
    unique: true,
  },
  typeFurn: {
    type: String,
  },
  priceFurn: {
    type: String,
  },
  delivPrice: {
    type: String,
  },
  deliveryDate: {
    type: String,
  },
  constructPrice: {
    type: String,
  },
  constructDate: {
    type: String,
  },
  deliveryTeam: {
    type: String,
  },
  constructTeam: {
    type: String,
  },
  status: {
    type: String,
  },
  commentsWhenCreate: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clients",
  },
});

module.exports = mongoose.model("Orders", orderSchema);
