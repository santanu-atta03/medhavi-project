const mongoose = require("mongoose");
require("dotenv").config();


exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected sucessfully.")
    })
    .catch((error) => {
        console.log("DB connection failed!");
        console.log(error.message);
        process.exit(1);
    })
};