const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const auth = require('./middleware/auth');
const Question = require('./models/Question');
const Answer = require('./models/Answers');
const connectDB = require('./config/db');
var diafora = 0;
const app = express();
app.use(bodyParser.json());

// Init Middleware
app.use(express.json());
connectDB();

app.post('/events/check',async (req,res) => {
    try{  const check_event = req.body
        const data_by_now = await Question.find({});
        const length_by_now = data_by_now.length;
        if(check_event.type === "PERDAY" ){
            const perday_length = check_event.check_data;
            diafora = length_by_now - perday_length;
            if(diafora > 0){

                const not_passed = await  Question.find({}).sort('-date').limit(diafora);

                    config = {
                        method: 'post',
                        url: "https://ms-statsperday-askmeanything.herokuapp.com/api/perday/crashed",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: not_passed}
                    }
                    axios(config)
                        .then(result => {
                            //console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


app.post('/events/check_ans',async (req,res) => {
    try{  const check_event_ans = req.body
        //console.log(check_event_ans);
        const data_by_now_ans = await Answer.find({});
        const length_by_now_ans = data_by_now_ans.length;
        //console.log("event_bus length = ",length_by_now_ans)
        if(check_event_ans.type === "PERDAY" ){
            const perday_length_ans = check_event_ans.check_data;
            diafora_ans = length_by_now_ans - perday_length_ans;
            //console.log("diafora = ",diafora_ans)

            if(diafora_ans > 0){

                const not_passed_ans = await  Answer.find({}).sort('-date').limit(diafora_ans);
                //console.log(not_passed_ans)
                    config = {
                        method: 'post',
                        url: "https://ms-statsperday-askmeanything.herokuapp.com/api/perday/crashed_ans",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: not_passed_ans}
                    }
                    axios(config)
                        .then(result => {
                           // console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.post('/events/check_keyword',async (req,res) => {
    try{  const check_event_keyword = req.body
        //console.log(check_event_keyword);
        const data_by_now_keyword = await Question.find({});
        const length_by_now_keyword = data_by_now_keyword.length;
        //console.log("event_bus length = ",length_by_now_keyword)
        if(check_event_keyword.type === "PERKEYWORD" ){
            const perkeyword_length = check_event_keyword.check_data;
            diafora_keyword = length_by_now_keyword - perkeyword_length;
           // console.log("diafora = ",diafora_keyword)

            if(diafora_keyword > 0){

                const not_passed_keyword = await  Question.find({}).sort('-date').limit(diafora_keyword);
                //console.log(not_passed_keyword)
                    config = {
                        method: 'post',
                        url: "https://ms-statsperkeywo-askmeanything.herokuapp.com/api/perkeyword/crashed_perkey",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: not_passed_keyword}
                    }
                    axios(config)
                        .then(result => {
                            //console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.post('/events/mycon_check',async (req,res) => {
    try{  const mcheck_event = req.body
        //console.log(mcheck_event);
        const mdata_by_now = await Question.find({userId:mcheck_event.user});
        const mlength_by_now = mdata_by_now.length;
       // console.log("event_bus length = ",mlength_by_now)
        if(mcheck_event.type === "MYCONTRIB" ){
            const mycontrib_length = mcheck_event.check_data;
            mdiafora = mlength_by_now - mycontrib_length;
            //console.log("diafora = ",mdiafora)

            if(mdiafora > 0){

                const mnot_passed = await  Question.find({userId:mcheck_event.user}).sort('-date').limit(mdiafora);
               // console.log(mnot_passed)
                    config = {
                        method: 'post',
                        url: "https://ms-userstats-askmeanything.herokuapp.com/api/mycontrib/mycon_crashed",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: mnot_passed}
                    }
                    axios(config)
                        .then(result => {
                           // console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


app.post('/events/mycon_check_ans',async (req,res) => {
    try{  const mcheck_event_ans = req.body
        //console.log(mcheck_event_ans);
        const mdata_by_now_ans = await Answer.find({userId:mcheck_event_ans.user});
        const mlength_by_now_ans = mdata_by_now_ans.length;
       // console.log("event_bus length = ",mlength_by_now_ans)
        if(mcheck_event_ans.type === "MYCONTRIB" ){
            const mycontrib_length_ans = mcheck_event_ans.check_data;
            mdiafora_ans = mlength_by_now_ans - mycontrib_length_ans;
            //console.log("diafora = ",mdiafora_ans)

            if(mdiafora_ans > 0){

                const mnot_passed_ans = await  Answer.find({userId:mcheck_event_ans.user}).sort('-date').limit(mdiafora_ans);
             //   console.log(mnot_passed_ans)
                    config = {
                        method: 'post',
                        url: "https://ms-userstats-askmeanything.herokuapp.com/api/mycontrib/mycon_crashed_ans",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: mnot_passed_ans}
                    }
                    axios(config)
                        .then(result => {
                            //console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.post('/events/check_que',async (req,res) => {
    try{  const check_event_que = req.body
        //console.log(check_event_que);
        const data_by_now_que = await Question.find({userId: check_event_que.user});
        const length_by_now_que = data_by_now_que.length;
       // console.log("event_bus length = ",length_by_now_que)
        if(check_event_que.type === "USERQUEST" ){
            const userquest_length = check_event_que.check_data;
            diafora_que = length_by_now_que - userquest_length;
            //console.log("diafora = ",diafora_que)
            if(diafora_que > 0){

                const not_passed_que = await  Question.find({userId: check_event_que.user}).sort('-date').limit(diafora_que);
               // console.log(not_passed_que)
                    config = {
                        method: 'post',
                        url: "https://ms-userstats-askmeanything.herokuapp.com/api/questions/crashed_que",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: not_passed_que}
                    }
                    axios(config)
                        .then(result => {
                          //  console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            //console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.post('/events/check_userans',async (req,res) => {
    try{  const check_event_ans = req.body
        //console.log(check_event_ans);
        const data_by_now_ans = await Answer.find({userId:check_event_ans.user});
        const length_by_now_ans = data_by_now_ans.length;
        //console.log("event_bus length = ",length_by_now_ans)
        if(check_event_ans.type === "USERANS" ){
            const userans_length = check_event_ans.check_data;
            diafora_ans = length_by_now_ans - userans_length;
            //console.log("diafora = ",diafora_ans)

            if(diafora_ans > 0){

                const not_passed_ans = await  Answer.find({userId: check_event_ans.user}).sort('-date').limit(diafora_ans);
                //console.log(not_passed_ans)
                    config = {
                        method: 'post',
                        url: "https://ms-userstats-askmeanything.herokuapp.com/api/answers/crashed_userans",
                        // headers :  { "x-auth-token": req.header("x-auth-token") },
                        data : {data: not_passed_ans}
                    }
                    axios(config)
                        .then(result => {
                           // console.log("to esteila")
                            return res.status(201)
                        })
                        .catch(err =>{
                            console.error(err)
                            return res.status(401)
                        })

            }
        }
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

app.post('/events',(req,res) => {
    const event = req.body;

    // save in event-bus databse
    if(event.type === 'POST CREATED'){
        let newQuestion = new Question(event.newQuestion);
        newQuestion.save()
    }
    if(event.type === 'ANSWER CREATED'){
        let newAnswer = new Answer(event.newAnswer);
        newAnswer.save()
    }


    // Create Question
    config_CREATE_QUESTION ={
        method:'post',
        url:'https://ms-questions-askmeanything.herokuapp.com/api/question/events',
        data : event,
       //headers :  { "x-auth-token": req.header("x-auth-token") }
    }

    // Create Answer
    config_CREATE_ANSWER ={
        method:'post',
        url:'https://ms-answers-askmeanything.herokuapp.com/api/answer/events',
        data : event,
        //headers :  { "x-auth-token": req.header("x-auth-token") }
    }
    // Create Question per Keyword
    config_CREATE_QUESTION_PER_KEYWORD ={
        method:'post',
        url:'https://ms-statsperkeywo-askmeanything.herokuapp.com/api/perkeyword/events',
        data : event,
        //headers :  { "x-auth-token": req.header("x-auth-token") }
    }

    config_CREATE_QUESTION_STATS ={
        method:'post',
        url:'https://ms-statsperday-askmeanything.herokuapp.com/api/perday/events',
        data : event
    }

    config_CREATE_QUESTION_USER ={
        method:'post',
        url:'https://ms-userstats-askmeanything.herokuapp.com/api/questions/events',
        data : event
    }

    config_CREATE_ANSWER_USER ={
        method:'post',
        url:'https://ms-userstats-askmeanything.herokuapp.com/api/answers/events',
        data : event
    }

    const createQuestion = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION)
            .then(result => {
                return res.json()
            })
            .catch(err => {

                return res.status(500)
            })

    })

    const createAnswer = new Promise((resolve,reject) => {
        axios(config_CREATE_ANSWER)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.status(500)
            })

    })
    const createQuestionPerKeyword = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION_PER_KEYWORD)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json()
            })
    })

    const createQuestionPerDay = new Promise((resolve,reject) => {
        axios(config_CREATE_QUESTION_STATS)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json()
            })

    })

    const createQuestionUser = new Promise((resolve,reject)=>{
        axios(config_CREATE_QUESTION_USER)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json();
            })

    })

    const createAnswerUser = new Promise((resolve,reject)=> {
        axios(config_CREATE_ANSWER_USER)
            .then(result => {
                return res.json()
            })
            .catch(err => {
                return res.json();
            })
    })


Promise.all([createAnswer,createQuestion,createQuestionPerKeyword,createQuestionPerDay,createQuestionUser,createAnswerUser]).then((values) => {
    console.log(values);
})
    .catch(err => {
        return res.status(500)
    })
})

app.listen(process.env.PORT || 4005)

