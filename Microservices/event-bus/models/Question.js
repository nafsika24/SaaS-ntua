const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    quest_id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    keywords:{
        type: [String],
        required: true
    },
    text:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: false
    },
    Answers: [
        {
            text:
                {
                    type:  String,
                    required: true
                }
        }
    ],

    date:{
        type: Date,
        default: Date.now
    }/*,
    answers_id:{
        type: String,
        required: false
    },
    questions_id:{
        type: String,
        required: false
    },
    statistics_perday_id:{
        type: String,
        required: false
    },
    stats_perkeyword_id:{
        type: String,
        required: false
    },
    user_statistics_id:{
        type: String,
        required: false
    },
    read_counter:{
        type: String,
        required: false
    }*/



})
module.exports = Question = mongoose.model('question',QuestionSchema);