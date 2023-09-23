const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;