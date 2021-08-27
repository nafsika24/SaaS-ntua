const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes for creating a new answer and seeing all answers
app.use('/api/answer', require('./routes/api/answers'));
app.use('/api/allanswers',require('./routes/api/allanswers'));

app.listen(process.env.PORT || 4002);

module.exports = app;
