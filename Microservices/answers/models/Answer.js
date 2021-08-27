const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer_id:{
        type: String,
        required: true
    },
    userId:{
       type: String,
        required: true
    },
    text:
        {type:  String,
            required: true
        },
   questionid:{
       type: String,
       required: true
    },
    date:{
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Answer', answerSchema);