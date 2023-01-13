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
  .then(() => {
    console.log('DB connected'); //con.connections,
  });

const app = require('./app'); // after setting config then load app.js

//console.log(app.get('env')); // get node js environment variable
//console.log(process.env); // get local environment variable

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application listening on the port ${port}`);
});
