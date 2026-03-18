const mongoose = require("mongoose");
const OTP = require("./models/OTP");
require("dotenv").config();

async function test() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");

  const newOTP = new OTP({ email: "santanu2003atta@gmail.com", otp: "123456" });
  await newOTP.save();
  console.log("OTP saved successfully");

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
