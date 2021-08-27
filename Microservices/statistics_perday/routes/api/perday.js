const express = require('express');
const router = express.Router();
const Quest = require('../../models/Questions');
const Ans = require('../../models/Answers');
const cors = require('cors');
const axios = require('axios');

// @route GET api/perday
// @desc  Show number of questions perday
// @access Private



router.post('/crashed',async (req,res) => {
    try{
        const test = req.body.data;

        for(i=0; i< test.length; i++){
            let newquestion = new Quest(test[i]);
            await newquestion.save()
        }
        console.log("Retrieved lost questions")
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.post('/crashed_ans',async (req,res) => {
    try{
        const testa = req.body.data;
        console.log(testa.length)

        for(i=0; i< testa.length; i++){
            let newanswer = new Ans(testa[i]);
            await newanswer.save()
        }
        console.log("Retrieved lost answers")
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



router.get('/', async (req, res) => {
    const data_by_now = await Question.find({});
    const perday_length = data_by_now.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/check",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "PERDAY" , check_data:perday_length}
    }
    axios(config)
        .then( (result) => {})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })
    
    const data_by_now_ans = await Ans.find({});
    const perday_length_ans = data_by_now_ans.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/check_ans",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "PERDAY" , check_data:perday_length_ans}
    }
    axios(config)
        .then( (result) => {})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })

    const quest_ans = await Promise.all([
        Quest.aggregate([
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount": {"$sum": "$count"},
                    "hourlyData": {"$push": {"hour": "$_id.hour", "count": "$count"}}
                }
            }
        ]),
        Ans.aggregate([
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date" }
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount": {"$sum": "$count"},
                    "hourlyData": {"$push": {"hour": "$_id.hour", "count": "$count"}}
                }
            }
        ])

    ])
    res.json(quest_ans);


});

router.post('/events', async(req,res)=>{
    if(req.body.type === "POST CREATED"){
        let newQuestion = new Quest(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }

    if(req.body.type === "ANSWER CREATED"){
        let newAnswer = new Ans(req.body.newAnswer);
        newAnswer.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }
})

module.exports = router;