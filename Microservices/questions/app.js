const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(cors());

// view engine
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes for creating a new question and seeing all questions
app.use('/api/question', require('./routes/api/question'));
app.use('/api/allquestions',require('./routes/api/allquestions'));

app.listen(process.env.PORT || 4001);


module.exports = app;
