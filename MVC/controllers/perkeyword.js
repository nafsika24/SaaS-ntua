const Question = require('../models/question');
exports.getperkeyword = (req, res) => {
     Question.find({}).select('keywords -_id')
            .then(questions => {
                var results = new Array();
                for (var i = 0; i < questions.length; i++) {
                    const test = JSON.stringify(questions[i])
                    const result2 = test.split(':[')[1].split(']')[0] // returns 'two'
                    const result3 = result2.split(',')
                    for (var j = 0; j < result3.length; j++) {
                        results.push(result3[j])
                    }
                }

                function getOccurrence(array, value) {
                    return array.filter((v) => (v === value)).length;
                }
                var total_counts1 = new Array;

                let unique = [...new Set(results)];
                for (var k = 0; k < unique.length; k++) {
                    total_counts1[k] = getOccurrence(results, unique[k])
                }
                res.render('perkeyword', {
                    quest: unique,
                    counts: total_counts1,
                    pageTitle: 'Number of Questions per Keyword',
                    path: '/perkeyword',
                    isAuthenticated: req.session.isLoggedIn
                });
            })
            .catch(err => {
                console.log(err);
            })

};