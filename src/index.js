const express = require('express');
require('./mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/user');
const bucketlists = require('./routes/bucketlist');

const app = express();

app.use(passport.initialize());
require('../config/passport')(passport);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use('/auth', users);
app.use('/bucketlists', bucketlists)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})