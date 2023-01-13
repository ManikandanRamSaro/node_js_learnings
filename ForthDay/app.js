const express = require('express');
const fs = require('fs');
const app = express();

//Middleware => middleware will be called each and every requests
app.use(express.json()); // used to collect and parse user request inputs

app.use((req, res, next) => {
  console.log('Hellow from middleware 2');
  next();
});

app.use((req, res, next) => {
  // it will be called before the routing verbs called , we can change possition as well- it will be refect to only below lines of code like ****top down approach
  req.requestedTime = new Date().toLocaleDateString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    timeAt: req.requestedTime, // retrived from middle ware
    data: { tours },
  });
};

const getTour = (req, res) => {
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

const addNewTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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
// // GET Call - to collect all data
// app.get('/api/v1/tours', getAllTours);
// // GET call to get required data
// app.get('/api/v1/tours/:id/:optionalParam?', getTour); //** param? => used as optional parameter, if we not pass values it will not affect code */
// // POST call to save data into JSON
// app.post('/api/v1/tours', addNewTour);
// // PATCH call to update existing data
// app.patch('/api/v1/tours/:id', updateTour);
// // DELETE call to update existing data
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
const port = 3000;

app.listen(port, () => {
  console.log(`Application listening on the port ${port}`);
});
