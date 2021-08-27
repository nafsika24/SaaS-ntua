const Question = require('../models/question');
const Answer = require('../models/answers');

exports.newquest = (req, res, next) => {
    const checkauth = req.session.isLoggedIn;
    if (checkauth) {
        res.render('newquestion',
            {
                pageTitle: 'Ask a Question',
                path: '/newquestion',
                isAuthenticated: req.session.isLoggedIn
            });
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

exports.postnewquest = (req,res,next) => {
    const title = req.body.title;
    const subject = req.body.subject;
    const keywords = req.body.keywords;
    const keyw = keywords.split(',');
    const question = new Question({
        title: title,
        subject: subject,
        keywords: keyw,
        userId: req.user
    });
    question
        .save()
        .then(result => {
            res.redirect('/allquestions');
        })
        .catch(err => {
            console.log(err);
        });
};


exports.allquests = async (req, res, next)=> {
    const checkauth = req.session.isLoggedIn;
    if(checkauth){
        const quest_ans = await Promise.all([
            Question.find().sort({'date': 'desc'}),
            Answer.find()
        ])
            islogged = true
            q = quest_ans[0];
            ans = quest_ans[1]
            res.render('allquestions',{
            quest: q,
            answers: ans,
            pageTitle:'AllQuestions',
            path: '/allquestions',
            isAuthenticated: req.session.isLoggedIn
        });
    }
    else{
        Question.find().limit(10).sort({'date': 'desc'})
            .then(questions => {
                res.render('allquestions',{
                    islogged: false,
                    quest: questions,
                    pageTitle:'AllQuestions',
                    path: '/allquestions',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}
