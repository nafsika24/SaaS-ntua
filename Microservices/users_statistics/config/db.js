const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        await mongoose.connect(db,{

            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true

        });

        console.log('MongoDB User Statistics Connected..');

    }catch(err){
        console.error(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;