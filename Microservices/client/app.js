const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const flash = require('connect-flash');

// routes
const MONGODB_URI = 'mongodb+srv://nafsika24:nafsika24@saas.z9fmo.mongodb.net/Micro-Client';
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection : 'session'
});

// view engine
app.set('view engine','ejs');
app.set('views','views');

const landing = require('./routes/landing');
const newquestions = require('./routes/newquestion');
const allquestiosns = require('./routes/allquestions');
const authRoutes = require('./routes/auth');
const newanswers = require('./routes/newanswer')
const perkeyword = require('./routes/perkeyword');
const perday = require('./routes/perday');
const myask = require('./routes/myask');
const mycontrib = require('./routes/mycontrib');
const myquestions = require('./routes/myquestions');
const myanswers = require('./routes/myanswers')
const technicalRoutes = require('./routes/technical');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname,'public')));
app.use(
    session({
        secret:'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);


app.use(flash());

// app.use((req, res, next) => {
//     if (!req.session.user) {
//         return next();
//     }
//
// });

app.use((req,res,next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

// routes
app.use(landing);
app.use(allquestiosns);
app.use('/newquestion',newquestions);
app.use(authRoutes);
app.use('/newanswer',newanswers);
app.use(perkeyword);
app.use(perday);
app.use(myask);
app.use(mycontrib);
app.use(myquestions);
app.use(myanswers);
app.use('/technical',technicalRoutes);

// route for 404 error
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});

});

// connect to database and start at port 3000
mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('Mongodb Connected');
        app.listen(process.env.PORT || 3001);
    })

.catch(err => {
    console.log(err);
});