const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();
app.get('/',(req,res) => res.send('Welcome'))
app.get('/api',(req,res) => res.send('Api running'))

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/signup', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/auth'));
app.use('/api/logout',require('./routes/api/logout'));

app.listen(process.env.PORT || 4000);

module.exports = app;
