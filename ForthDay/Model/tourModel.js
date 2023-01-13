const mongoose = require('mongoose');

/*Mongoose db */

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is the required field for Tour'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price required for Tour'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
