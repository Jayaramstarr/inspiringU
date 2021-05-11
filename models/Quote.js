const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likeState: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  likeID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('quote', QuoteSchema);
