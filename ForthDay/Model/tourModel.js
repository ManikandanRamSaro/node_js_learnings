const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator'); //https://github.com/validatorjs/validator.js
/*Mongoose db */

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is the required field for Tour'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [
      //   validator.isAlpha,
      //   'A tour name constains only Alphabatic charectors',
      // ],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price required for Tour'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
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
    slugField: String,
    primeMemberOnly: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // above 2 enable virtual value integration
  }
);

tourSchema.virtual('durationWeek').get(function () {
  // this is not part of db but it can fetch value in db and manuplate date send back to result
  return this.duration / 7; // this.duration is taken from mongo db result
});

// Mongo db middleware function // pre()
tourSchema.pre('save', function (next) {
  // this will be called before the data save into mongo db // it works only for save() and create() not work for insertMany()
  this.slugField = slugify(this.name, {
    replacement: '-',
    lower: true,
    trim: true,
  });
  next();
});

// Mongo db middleware function // post()
// eslint-disable-next-line prefer-arrow-callback
tourSchema.post('save', function (doc, next) {
  // this will be called after the data save into mongo db
  console.log('data saved into db');
  next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function (next) {
  // used regular expression // which will be executed for every function starts with find like find(), findOne(), findAndUpdate() and findAndDelete()
  this.find({ primeMemberOnly: { $ne: true } }); // during select executed this will be call before executing query
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { primeMemberOnly: { $ne: true } } });

  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
