const Question = require('../models/question');
const Answer = require('../models/answers');

exports.getnewans = (req, res, next) => {
    const checkauth =  req.session.isLoggedIn
    if(checkauth){
    Question.find()
        .then(questions => {
            res.render('newanswer',{
                quest: questions,
                pageTitle:'Answer a Question',
                path: '/newanswer',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
        res.render('landing',
            {
                pageTitle: 'Landing Page',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
        }
}

 exports.postnewans =  async (req, res) => {
        try {
            const selected_title = req.body.titles;
            const y = selected_title.split('keywords').pop().split('title')[0];
            const result = y.split('_id: ').pop().split(',')[0];

            const answer = req.body.answer;
            const question = await Question.findById(result);
            console.log(selected_title);
            const newanswer = new Answer({
                name: req.session.user.username,
                user: req.session.user._id,
                text: answer,
                questionid: result
            });
            await newanswer.save();
            const newAnswer = {
                text: answer,
                name:  req.session.user.username,
                user: req.session.user._id
            };

            question.answers.unshift(newAnswer);
            await question.save();
            res.redirect('/');
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

};
