const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const auth = require('../../middleware/auth');
const Question = require('../../models/Question');
//const jwt_decode = require('jwt-decode');

const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


// @route POST api/question
// @desc  Create a question
// @access Private


router.post(
    '/',async (req,res) => {

     /*     const token = req.header("x-auth-token");
          const decoded = jwt_decode(token);
          const userId = JSON.stringify(decoded.user);
          const uid = userId.substring(
              userId.lastIndexOf(":") + 1,
              userId.lastIndexOf("}")
          );
          const x = uid.substring(1);
          const telikoid = x.substring(0, x.length - 1);*/

            const id = randomBytes(4).toString('hex');
            const keywords = req.body.data.keywords
            const keyw = keywords.split(',');

            const newQuestion = {
                quest_id: id,
                title: req.body.data.title,
                text: req.body.data.subject,
                keywords: keyw,
                userId:  req.body.user
            };

            config = {
                method: 'post',
                url: "https://ms-eventbus-askmeanything.herokuapp.com/events",
               // headers :  { "x-auth-token": req.header("x-auth-token") },
                data : { type: "POST CREATED" , newQuestion:newQuestion}
            }

            axios(config)
                .then( (result) => {
                    return res.status(201).json({msg : "Successful Post Creation"})

                })
                .catch(err =>{
                    console.error(err)
                    return res.status(500).json({msg: "Create Question Error"})
                })

    }
);


router.post('/events', async(req,res)=>{

    if(req.body.type === "POST CREATED"){
        let newQuestion = new Question(req.body.newQuestion);
        newQuestion.save()
            .then(result => {
                return res.status(201).json({})
            })
            .catch(err =>{
                console.error(err)
                return res.status(401).json({})
            })
    }
    // when an answer is created, it is saved at field Answers of Questions model
    if(req.body.type === "ANSWER CREATED"){

          try{  const result = req.body.newAnswer.questionid;
                let save_answer = {
                    text: req.body.newAnswer.text
                }
                const question = await Question.findById(result);
                question.Answers.unshift(save_answer)
                await question.save();

              }catch (error) {
                  console.error(error.message);
                  res.status(500).send('Server Error');
              }
    }
})

module.exports = router;