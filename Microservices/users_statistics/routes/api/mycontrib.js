const Question = require('../../models/Questions');
const Answer = require('../../models/Answers');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');

router.post('/mycon_crashed',async (req,res) => {
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

router.post('/mycon_crashed_ans',async (req,res) => {
    try{
        const testa = req.body.data;
        console.log(testa.length)

        for(i=0; i< testa.length; i++){
            let newanswer = new Answer(testa[i]);
            await newanswer.save()
        }
        console.log("Retrieved lost answers")
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/',async (req, res) => {
    const user = req.body.user;
    const data_by_now = await Question.find({userId: user});
    const mycontrib_length = data_by_now.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/mycon_check",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "MYCONTRIB" , check_data:mycontrib_length,user:user}
    }
    axios(config)
        .then( (result)=>{})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })
    
    const data_by_now_ans = await Answer.find({userId: user});
    const mycontrib_length_ans = data_by_now_ans.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/mycon_check_ans",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "MYCONTRIB" , check_data:mycontrib_length_ans}
    }
    axios(config)
        .then( (result) =>{})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })


    const quest_ans = await Promise.all([
        Question.aggregate([
            {
                $match: {
                    userId: user
                }
            },
            {
                "$group":{

                    "_id":{
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count":{"$sum":1}
                }},
            {"$group":{
                    "_id":{
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount":{"$sum":"$count"},
                    "hourlyData":{"$push":{"hour":"$_id.hour","count":"$count"}}
                }}
        ]),
        Answer.aggregate([
            {
                $match: {
                    userId: user // replace this hard-coded objectId with mongoose.Types.ObjectId(req.query.payment_order_id)
                }
            },
            {"$group":{
                    "_id":{
                        "year": {"$year": "$date"},
                        "hour": {"$hour": "$date"},
                        "month": {"$month": "$date"},
                        "day": { "$dayOfMonth": "$date"}
                    },
                    "count":{"$sum":1}
                }},
            {"$group":{
                    "_id":{
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    },
                    "dailyCount":{"$sum":"$count"},
                    "hourlyData":{"$push":{"hour":"$_id.hour","count":"$count"}}
                }}
        ])
    ])
res.json(quest_ans);
});

module.exports = router;
