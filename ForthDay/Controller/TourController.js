const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
/** Middleware starts */
//Middleware - check Param id
exports.checkID = (req, res, next, val) => {
  if (!tours.find((x) => x.id === req.params.id * 1)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Record not found',
    });
  }
  next();
};

exports.checkPostBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Name or Price param missing !!!',
    });
  }
  next();
};

/** Middleware end */

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    timeAt: req.requestedTime, // retrived from middle ware
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  let id = req.params.id * 1; // type convertion  -> STRING to INT
  const tour = tours.find((x) => x.id === id);
  res.status(200).json({
    status: 'success',
    timeAt: req.requestedTime, // retrived from middle ware
    data: { tour },
  });
};

exports.addNewTour = (req, res) => {
  console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newRecord = Object.assign({ id: newID }, req.body);
  tours.push(newRecord);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newRecord,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'record updated',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
