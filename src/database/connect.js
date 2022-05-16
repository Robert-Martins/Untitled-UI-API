const mongoose = require('mongoose');

const connectToDatabase = async () =>{
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@untitled-ui-db.smf3y.mongodb.net/database?retryWrites=true&w=majority`, 
    (error) =>{
        if(error){
            return console.log("Error while connecting to database");
        }
        console.log("Database connection stablished");
    })
}

module.exports = connectToDatabase;