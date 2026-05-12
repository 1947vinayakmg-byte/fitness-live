const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },

  photo: {
    type: String,
  },

  age: { type: String },
  weight: { type: String },
  height: { type: String },
  membershipPlan: { type: String, default: 'None' },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("User", userSchema);