const mongoose = require('mongoose');

/*Mongoose db */

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is the required field for Tour'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Durations is the required field for Tour'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Group member count is the required field for Tour'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is the required field for Tour'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price required for Tour'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //its works only for string = remove empty space
    required: [true, 'A tour have some summary discription'],
  },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour have some Images'],
  },
  images: [String], //array type of defining data
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
