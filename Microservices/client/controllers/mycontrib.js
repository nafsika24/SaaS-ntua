const axios = require('axios')

exports.getmycontrib =  (req, res) => {
    const user = req.session.user
    //console.log(user);
    const config = {
        method:"get",
        url:"https://ms-userstats-askmeanything.herokuapp.com/api/mycontrib",
        data:{user:user}
    }
    axios(config)
        .then(result =>{
            const quest_ans = result.data
            res.render('mycontrib', {
                quest: quest_ans[0],
                answers:quest_ans[1],
                pageTitle:'My contributions',
                path: '/mycontrib',
                isAuthenticated: req.session.isLoggedIn

            });
        })
        .catch(err =>{
            console.log(err)
            return res.redirect('/')
        })
};
