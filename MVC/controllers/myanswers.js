const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answers');

exports.getmyanswers = (req, res) => {
    const userid = req.session.user._id
    Answer.find({"user": userid })
        .then(questions => {
            res.render('myanswers',{
                quest: questions,
                pageTitle:'My Answers',
                path: '/myanswers',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
};