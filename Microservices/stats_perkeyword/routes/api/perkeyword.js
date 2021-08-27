const express = require('express');
const router = express.Router();
const Question = require('../../models/Question');
const cors = require('cors');
const axios = require('axios');

// @route GET api/perday
// @desc  Show number of questions perday
// @access Private

router.post('/crashed_perkey',async (req,res) => {
    try{
        const test = req.body.data;
        console.log(test.length)

        for(i=0; i< test.length; i++){
            let newquestion = new Question(test[i]);
            await newquestion.save()
        }
        console.log("Retrieved lost questions")
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/', async (req, res) => {

    const data_by_now = await Question.find({});
    const perkeyword_length = data_by_now.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/check_keyword",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "PERKEYWORD" , check_data:perkeyword_length}
    }
    axios(config)
        .then( (result) => {})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })

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

            res.json({
                results: unique,
                total_counts: total_counts1
            });

        })
        .catch(err => {
            console.log(err);
        })

});

router.post('/events', async(req,res)=>{
    if(req.body.type == "POST CREATED"){
        let newQuestion = new Question(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }
})

module.exports = router;