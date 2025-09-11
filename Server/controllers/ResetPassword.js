const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");

// Reset password token
exports.resetPasswordToken = async(req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success : false,
                message : "Enter email address"
            });
        }

        const user = await User.find({email});

        if(!user){
            return res.status(401).json({
                success : false,
                message : "User not registered"
            });
        }

        const token = crypto.randomUUID();
        const updatedUser = await User.findOneAndUpdate({email : email}, {
            token : token,
            resetPasswordExpires : Date.now() + 5 * 60 * 1000
        }, {new : true});

        const url = `https://medhavi-pro.vercel.app/update-password/${token}`;

        await sendMail(email, "Password reset link", `Password reset link : ${url}`);

        return res.status(200).json({
            success : true,
            message : "Reset link generated sucessfully."
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Can't reset password, please try again"
        });
    }
};


// Reset Password

exports.resetPassword = async(req, res) => {
    try{
        const {token, password, confirmPassword} = req.body;

        if(!password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Enter password"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password not matching"
            });
        }

        const userDetails = await User.findOne({token : token});
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : "Token is invalid"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success : false,
                message : "Token expired, please regenerate token"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token : token},
            {password : hashedPassword},
            {new : true},
        );

        return res.status(200).json({
            success : true,
            message : "Password reset sucessfully"
        });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Can't reset password, please try again"
        });
    }
};