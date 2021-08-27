const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Answer = require('../../models/Answer');
//const User = require('../../models/User');
const jwt_decode = require('jwt-decode');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


// @route POST api/answer
// @desc  Create a answer
// @access Private

router.post(
    '/', async (req,res) => {
       /* const token = req.header("x-auth-token");
        const decoded = jwt_decode(token);
        const userId = JSON.stringify(decoded.user);
        const uid = userId.substring(
            userId.lastIndexOf(":") + 1,
            userId.lastIndexOf("}")
        );
        const x = uid.substring(1);
        const telikoid = x.substring(0, x.length - 1);*/
        const id = randomBytes(4).toString('hex');
        const newAnswer = {
            answer_id: id,
            text: req.body.text,
            questionid: req.body.questionid,
            userId: req.body.user
        };

        config = {
            method: 'post',
            url: "https://ms-eventbus-askmeanything.herokuapp.com/events",
           // headers :  { "x-auth-token": req.header("x-auth-token") },
            data : { type: "ANSWER CREATED" , newAnswer:newAnswer}
        }

        axios(config)
            .then( (result) => {
                return res.status(201).json({msg : "Successful Answer Creation"})

            })
            .catch(err =>{
                console.error(err)
                return res.status(500).json({msg: "Create Answer Error"})
            })

    }
);

router.post('/events', async(req,res)=>{
    if(req.body.type === "ANSWER CREATED"){
        let newAnswer = new Answer(req.body.newAnswer);
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