const User = require('../models/user');
const Question = require('../models/question');

exports.getmyquestions = (req, res) => {
    const user = req.session.user._id
    Question.find({userId:user})
        .then(questions => {
            res.render('myquestions',{
                quest: questions,
                pageTitle:'My Questions',
                path: '/allquestions',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
};