const axios = require('axios')
exports.getperday =  (req, res) => {

    const config = {
        method:"get",
        url:"https://ms-statsperday-askmeanything.herokuapp.com/api/perday"
    }
    axios(config)
        .then(result =>{
            quest_ans = result.data
            res.render('perday', {
                quest: quest_ans[0],
                answers:quest_ans[1],
                pageTitle: 'Postings per Day',
                path: '/perday',

            });
        })
        .catch(err =>{
            console.log(err)
            return res.redirect('/')
        })


};