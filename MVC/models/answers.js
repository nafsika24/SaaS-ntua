const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
     name:{
            type: String,
                required: false
            },
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text:
                {type:  String,
                    required: true
                },
            questionid:{
                type: Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
});

module.exports = mongoose.model('Answer', answerSchema);