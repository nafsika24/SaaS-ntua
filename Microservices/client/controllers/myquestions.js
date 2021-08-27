const axios = require('axios')

exports.getmyquestions =  (req, res) => {
    const user = req.session.user
    const config = {
        method:"get",
        url:"https://ms-userstats-askmeanything.herokuapp.com/api/questions",
        data:{user:user}
    }
    axios(config)
        .then(result =>{
            const questions = result.data
            res.render('myquestions', {
                quest: questions,
                pageTitle:'My Questions',
                path: '/myquestions',
                isAuthenticated: req.session.isLoggedIn

            });
        })
        .catch(err =>{
            console.log(err)
            return res.redirect('/')
        })


};