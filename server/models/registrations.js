const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  subject: {
    type: String,
  },
  date: {
    type: Date,
  },
  slot: {
    type: String,
  },
});

module.exports = mongoose.model("Registrations", RegistrationSchema);
