const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Questions = new Schema({
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
    }

})
module.exports = Question = mongoose.model('question',Questions);