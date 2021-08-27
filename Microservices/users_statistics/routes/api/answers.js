const express = require('express');
const router = express.Router();
const Answer = require('../../models/Answers');
const cors = require('cors');
const axios = require('axios');

router.post('/crashed_userans',async (req,res) => {
    try{
        const test = req.body.data;
        console.log(test.length)

        for(i=0; i< test.length; i++){
            let newanswer = new Answer(test[i]);
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
    const data_by_now_ans = await Answer.find({userId: user});
    const userans_length_ans = data_by_now_ans.length;
    config = {
        method: 'post',
        url: "https://ms-eventbus-askmeanything.herokuapp.com/events/check_userans",
        // headers :  { "x-auth-token": req.header("x-auth-token") },
        data : { type: "USERANS" , check_data:userans_length_ans, user:user}
    }
    axios(config)
        .then( (result) => {})
        .catch(err =>{
            console.error(err)
            return res.status(500);
        })


    Answer.find({userId: user})
        .then(answers => {
        res.json(answers)
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/events', async(req,res)=>{
    if(req.body.type === "ANSWER CREATED"){
        let newanswer = new Answer(req.body.newAnswer);
        newanswer.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                return res.status(401).json({})
            })
    }

})
module.exports = router;
