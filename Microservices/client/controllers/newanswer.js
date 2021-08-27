const axios = require('axios')

exports.getnewans = (req, res, next) => {
    const checkauth =  req.session.isLoggedIn
    if(checkauth){
       axios.all([
           axios.get(`https://ms-questions-askmeanything.herokuapp.com/api/allquestions`),
           axios.get(`https://ms-answers-askmeanything.herokuapp.com/api/allanswers`)

       ])
            .then(axios.spread((result, data2) =>{
                const questions = result.data
                islogged = true
                res.render('newanswer',{
                    quest: questions,
                    ans: data2.data,
                    pageTitle:'Answer a Question',
                    path: '/newanswer',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
           /* .catch(err =>{
                console.log(err)
                return res.redirect('/')
            })*/ )
        }
    else {
        res.render('landing',
            {
                pageTitle: 'Landing Page',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
    }
}

 exports.postnewans =  async (req, res) => {

    const text = req.body.answer;
    const temp = req.body.titles;
    const user = req.session.user;
    const questionid = temp.split(' [')[0];

     const config = {
         method:"post",
         url:"https://ms-answers-askmeanything.herokuapp.com/api/answer",
         data: {text,user,questionid}
     }

     axios(config)
         .then(result =>{
             console.log("Successfull answer created")
             res.redirect('/')
         })
         .catch(err =>{
             console.log(err.response.data)
             return res.redirect('/newanswer')
         })
};
