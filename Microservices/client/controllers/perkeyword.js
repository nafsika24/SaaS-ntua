const axios = require('axios')
exports.getperkeyword =  (req, res) => {

    const config = {
        method:"get",
        url:"https://ms-statsperkeywo-askmeanything.herokuapp.com/api/perkeyword"
    }
    axios(config)
        .then(result =>{
            const results = result.data.results
            const total_counts = result.data.total_counts
            res.render('perkeyword', {
                quest: results,
                counts: total_counts,
                pageTitle: 'Postings per Keyword',
                path: '/perkeyword',

            });
        })
        .catch(err =>{
            //console.log(err)
            return res.redirect('/')
        })


};