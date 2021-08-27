const axios = require('axios')

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
    const text = req.body.subject;
    const keywords = req.body.keywords;
    const keyw = keywords.split(',');
    const data = req.body;
    const user = req.session.user;

    const config = {
        method:"post",
        url:"https://ms-questions-askmeanything.herokuapp.com/api/question",
        data: {data,user}
    }
    axios(config)
        .then(result =>{
           res.redirect('/')
        })
        .catch(err =>{
            console.log(err)

            return res.redirect('/login')
        })

};

exports.allquests = async (req, res, next)=> {
    const checkauth = req.session.isLoggedIn;
    if(checkauth){
        axios.all([
            axios.get(`https://ms-questions-askmeanything.herokuapp.com/api/allquestions`),
            axios.get(`https://ms-answers-askmeanything.herokuapp.com/api/allanswers`),

        ])
            .then(axios.spread((result, data2) =>{
                quest_ans = result.data
                islogged = true
                res.render('allquestions',{
                    quest: quest_ans,
                    answers: data2.data,
                    pageTitle:'AllQuestions',
                    path: '/allquestions',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
        )
    }
    else{
        const config = {
            method:"get",
            url:"https://ms-questions-askmeanything.herokuapp.com/api/allquestions/visitor"
        }
        axios(config)
            .then(result =>{
                quest_ans = result.data
                islogged = false
                res.render('allquestions',{
                    quest: quest_ans,
                    pageTitle:'AllQuestions',
                    path: '/allquestions',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(err =>{
                console.log(err)
                return res.redirect('/')
            })

    }
}
