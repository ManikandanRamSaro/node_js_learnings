const Tour = require('../Model/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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
