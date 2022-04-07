const express = require('express');
// const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');
const route = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(express.static(path.join(__dirname, '../public/uploads')));
app.use('../public/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(express.json());

// app.use(morgan('combined'));

//Connect to DB
db.connect();

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
