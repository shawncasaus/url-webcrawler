const mongoose = require('mongoose');
const uri = require('./keys-dev');

const connectionParams= {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, connectionParams);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err){
        console.error(err);  
        process.exit(1);
    }
}

module.exports = connectDB;