const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Force Google DNS to bypass ISP's broken SRV DNS resolver
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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