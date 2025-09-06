// const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const { contactUsEmail } = require("../mail/templates/contactFormRes")
require("dotenv").config();


exports.contactUs = async(req, res) => {
    try{
        const {firstName, lastName, email, contactNumber, description} = req.body;

        if(!firstName || !lastName || !email || !contactNumber || !description){
            return res.status(400).json({
                success : false,
                message : "Please fill all the ddetails"
            });
        }

        await sendMail(email, "Thanks for contacting",contactUsEmail(email, firstName, lastName, contactNumber, description));

        await sendMail(process.env.MAIL_USER, "New contact us message", `${description}`);
        return res.status(200).json({
            success : true,
            message : "Thanks for contacting us"
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Can not contact due to internal server error"
        });
    }
}