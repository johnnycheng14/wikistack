const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { db } = require('./models');

const app = express();

db.authenticate().
then(() => {
  console.log('connected to the database');
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});