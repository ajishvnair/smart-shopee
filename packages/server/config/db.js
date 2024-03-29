const mongoose = require("mongoose");
const config = require("config");
const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("db connected");
    } catch (err) {
        process.exit(1);
        console.log(err.message);
    }
};

module.exports = connectDB;
