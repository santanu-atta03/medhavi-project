const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB connected sucessfully.")
        })
        .catch((error) => {
            console.error("DB connection failed! Error:", error.message);
            // Don't process.exit(1) — that crashes Render and breaks CORS
        })
};