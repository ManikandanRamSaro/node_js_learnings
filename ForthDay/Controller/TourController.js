const Tour = require('../Model/tourModel');
const APIFeatures = require('../util/apiFeature');

exports.aliasTopTours = (req, res, next) => {
  // middleware to set query parameter
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filters()
      .sort()
      .fieldLimit()
      .pagination();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      count: tours.length,
      timeAt: req.requestedTime, // retrived from middle ware
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid request!!!',
      errMessage: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      count: tours.length,
      timeAt: req.requestedTime, // retrived from middle ware
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid request!!!',
      errMessage: err.message,
    });
  }
};

exports.addNewTour = async (req, res) => {
  try {
    /***
     * //type 1
     * const newdata = new Tour({
     * name:"mani", etc...});
     *
     * newdata.save().then().catch()
     */
    // type 2 => Tour.create()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid input or missing fields!!!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tourResult = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      tourResult,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: 'record not updated',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: 'record delete',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }, // it was used as Where condition
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, // to get more than one document based on the distinct value of the specified field
          //_id: null, //==> to get the single document of aggreate funtion
          numTours: { $sum: 1 }, // aggregation count of the document or document considered for the current field value
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }, // it was used as Where condition , ne => not equals
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 4,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
