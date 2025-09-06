const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// send otp

exports.sendOTP = async(req, res) => {
    try{
        const email = req.body.email.toLowerCase();
        const checkUserPresent = await User.findOne({ email });


        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "User already registered."
            })
        };

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        });

        console.log("Otp generated : ", otp);

        let result = await OTP.findOne({otp : otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            });
            result = await OTP.findOne({otp : otp});
        }

        const otpPayload = { email, otp };

        const newOTP = new OTP(otpPayload);
        await newOTP.save();
        console.log("OTP saved manually:", newOTP);

        // console.log("OTP body : ", otpBody);

        res.status(200).json({
            success : true,
            message : "OTP sent successfully.",
        });

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            success : false,
            message : "OTP can not be send due to internal server error."
        });
    }
};

// sign up

exports.signUp = async(req, res) => {
    try{
        // Steps : 
        // Data fetch from req.body
        // Validate data
        // match  password and confirm password
        // Check user exsistance
        // find most recent otp stored for the user
        // validate otp
        //hash password
        // Entry create in db
        //Send response

        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : false,
                message : "Fields are required."
            });
        };

        if(password !== confirmPassword){
            return req.status(400).json({
                success : false,
                message : "Passwords does not match."
            });
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User already registered."
            });
        };

        const recentOtp = await OTP.find({ email: email.toLowerCase() })
        .sort({ createdAt: -1 })
        .limit(1);

        console.log("Recent otp : ", recentOtp);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success : false,
                message : "OTP not found"
            });
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            accountType,
            additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        res.status(200).json({
            success : true,
            message : "User registered successfully."
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({
            success : false,
            message : "Sign up failed due to internal server error."
        });
    }
};

// login

exports.logIn = async(req, res) => {
    try{
        // const tokenFromCookie = req.cookies?.token;

        // if (tokenFromCookie) {
        //     try {
        //         const decoded = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);

        //         // Token is valid — block re-login
        //         return res.status(400).json({
        //         success: false,
        //         message: "User already logged in.",
        //         });
        //     } catch (err) {
        //         console.log(err.message)
        //         // Token invalid or expired, allow login to proceed
        //     }
        // }
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "Please enter all the details"
            })
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not registered, please Sign up first"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h"
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 2 *24*60*60*1000),
                httpOnly : true,
            }

            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "Logged in successfully."
            })
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Password incorrect"
            });
        }

    }catch(error){
        console.log("error in login : ",error)
        res.status(500).json({
            success : false,
            message : "Log In failed due to internal server error."
        });
    }
};

// change password

exports.changePassword = async(req, res) => {
    // Get data from req body
    // get oldpassword, newpassword, confirm password
    // validation
    // update password in db
    //send mail - password updated
    //return response
    try{
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword ){
            return res.status(400).json({
                success : false,
                message : "Enter password",
            });
        }

        // if(newPassword !== confirmNewPassword){
        //     return res.status(400).json({
        //         success : false,
        //         message : "New Password and confirm password does not match"
        //     })
        // }

        const user = await User.findById(req.user.id);
        console.log("userdetails : ", user)
        if(await bcrypt.compare(oldPassword, user.password)){
            const pass = await bcrypt.hash(newPassword, 10);

            const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, {password : pass}, {new : true});

            try {
                const emailResponse = await sendMail(
                    updatedUserDetails.email,
                    "Password for your account has been updated",
                    passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                    )
                )
                console.log("Email sent successfully:", emailResponse.response)
            } catch (error) {
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error)
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }
            return res.status(200).json({
                success : true,
                message : "password changed successfully."
            })
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Password is wrong"
            });
        }
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Log In failed due to internal server error."
        });
    }
}