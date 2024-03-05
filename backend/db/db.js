const mongoose = require("mongoose");

const dbConnect = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to MongoDB")
    }
    catch(err){
        console.log("DB connection error")
    }
};

module.exports = {dbConnect}