const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

// Express object
const app = express();

// Import routes
const postsRoute = require('./routes/posts');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/', postsRoute);


// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to database')
});

// Listening to server
app.listen(4000);