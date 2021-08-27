const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answers');

exports.getperday = async (req, res) => {
        const quest_ans = await Promise.all([
        Question.aggregate([
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
            Answer.aggregate([
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

        res.render('perday', {
                    quest: quest_ans[0],
                    answers:quest_ans[1],
                    pageTitle: 'Postings per Day',
                    path: '/myanswers',
                    isAuthenticated: req.session.isLoggedIn
                });

};