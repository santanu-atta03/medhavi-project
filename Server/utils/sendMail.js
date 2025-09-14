const nodemailer = require("nodemailer");
require("dotenv").config();


const sendMail = async(email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from : `Medhavi - By Santanu`,
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        });
        return info;
    }catch(error){
        console.log(error.message);
    }
};

module.exports = sendMail;