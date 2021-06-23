const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
     type: String,
     required: true 
    },
  surname: {
     type: String,
     required: true 
    },
  patronymic: {
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  phone: {
     type: String,
     required: true,
     unique: true 
    },
  adress: {
    type: String,
    required: true 
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  }],
});

module.exports = mongoose.model('Clients', clientSchema);


