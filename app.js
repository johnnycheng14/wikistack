const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const htmlTemplateTag = require('html-template-tag');
const pg = require('pg');

const app = express();

const { db } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
