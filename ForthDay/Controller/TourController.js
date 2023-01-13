const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
  if (!tour) {
    // if tour undefined
    return res.status(404).json({
      status: 'fail',
      message: 'Record not found',
      timeAt: req.requestedTime, // retrived from middle ware
    });
  }
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
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Record not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: 'record updated',
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Record not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
