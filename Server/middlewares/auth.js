const jwt = require("jsonwebtoken");

const User = require("../models/User");
require("dotenv").config();
// Authentication

exports.auth = async(req, res, next) => {
    try{
        const token = req.cookies.token ||
                        req.body.token ||
                        req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token is missing"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token : ", decode);
            req.user = decode;
        }catch(error){
            return res.status(401).json({
                success : false,
                message : "Token is invalid"
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Something went wrong while validating token"
        });
    }
};

//isStudent

exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(200).json({
                success : true,
                message : "This is a protected route for students only"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Account Type not verified, something went wrong"
        });
    }
};

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(200).json({
                success : true,
                message : "This is a protected route for instructors only"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Account Type not verified, something went wrong"
        });
    }
};

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(200).json({
                success : true,
                message : "This is a protected route for admin only"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "Account Type not verified, something went wrong"
        });
    }
};