const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const html = require('html-template-tag');
const pg = require('pg');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(express.static(__dirname + "/public/stylesheets"));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const {db} = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;
const init = async () => {
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
};
init();

