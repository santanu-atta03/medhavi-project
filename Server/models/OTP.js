const mongoose = require("mongoose");
const sendMail = require("../utils/sendMail");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 3 * 60,
    }
});


async function sendVerificationEmail(email, otp) {
    try{
        const title = "Verfication email from Medhavi";
        const mailResponse = await sendMail(email, title, emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);
    }catch(error){
        console.log("Error in sending verification mail", error.message);
    }
};

otpSchema.pre("save", async function (next){
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", otpSchema);