const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    indexing : true,
  },
  date: {
    type : Date,
  },
  slots: [String]
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
