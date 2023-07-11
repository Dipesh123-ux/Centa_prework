const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  cities: [String]
});

module.exports = mongoose.model('State', stateSchema);
