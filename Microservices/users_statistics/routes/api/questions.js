const express = require('express');
const router = express.Router();
const Question = require('../../models/Questions');
const cors = require('cors');
const axios = require('axios');

router.post('/crashed_que',async (req,res) => {
    try{
        const test = req.body.data;
        //console.log(test.length)

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

router.get('/',async (req, res) => {
        const user = req.body.user;
        //console.log(user);
        const data_by_now = await Question.find({userId: user});
        const userque_length = data_by_now.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/check_que",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "USERQUEST" , check_data:userque_length, user:user}
    }
    axios(config)
        .then( (result) => {})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })
        Question.find({userId:user})
        .then(questions => {
            res.json(questions);
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/events', async(req,res)=>{
    if(req.body.type === "POST CREATED"){
        let newQuestion = new Question(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                console.log("Question was Created")
                return res.status(201).json({})
            })
            .catch(err =>{
                console.log("Error in saving question")
                return res.status(401).json({})
            })
    }

})

module.exports = router;
