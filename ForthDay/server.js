const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // CONFIGURE ENVIRONEMTN VARIABLE INTO SYSTEM VARIABLE

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // promize method
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connected'); //con.connections,
  });

const app = require('./app'); // after setting config then load app.js

//console.log(app.get('env')); // get node js environment variable
//console.log(process.env); // get local environment variable

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

const addTour = new Tour({
  name: 'Chennai',
  rating: 5.0,
  price: 15000,
});

addTour
  .save()
  .then((res) => {
    console.log(res, 'Record inserted');
  })
  .catch((err) => {
    console.log(err, 'Error');
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application listening on the port ${port}`);
});
