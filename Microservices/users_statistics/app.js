const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');

// view engine
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));

app.use(cors());

// Connect Database
connectDB();
// Init Middleware
app.use(express.json());

app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/answers', require('./routes/api/answers'));
app.use('/api/mycontrib', require('./routes/api/mycontrib'));


app.listen(process.env.PORT || 4006);
