const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answers');

exports.getmycontrib = async (req, res) => {
    const userid = req.session.user._id
    const quest_ans = await Promise.all([
        Question.aggregate([
            {
                $match: {
                    userId: userid
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
                    user: userid // replace this hard-coded objectId with mongoose.Types.ObjectId(req.query.payment_order_id)
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
                res.render('mycontrib',{
                    quest: quest_ans[0],
                    answers:quest_ans[1],
                    pageTitle:'Questions Per Day',
                    path: '/mycontrib',
                    isAuthenticated: req.session.isLoggedIn
                });
    }