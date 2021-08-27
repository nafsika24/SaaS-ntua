const axios = require('axios')
exports.getmyanswers =  (req, res) => {
    const user = req.session.user
    //console.log(user);
    const config = {
        method:"get",
        url:"https://ms-userstats-askmeanything.herokuapp.com/api/answers",
        data:{user:user}
    }
    axios(config)
        .then(result =>{
            const answers = result.data
            res.render('myanswers', {
                quest: answers,
                pageTitle:'My Answers',
                path: '/myanswers',
                isAuthenticated: req.session.isLoggedIn

            });
        })
        .catch(err =>{
            console.log(err)
            return res.redirect('/')
        })


};