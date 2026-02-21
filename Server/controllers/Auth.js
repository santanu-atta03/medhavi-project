const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// send otp

exports.sendOTP = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const checkUserPresent = await User.findOne({ email });


    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered."
      })
    };

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Otp generated : ", otp);

    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const newOTP = new OTP(otpPayload);
    await newOTP.save();
    console.log("OTP saved manually:", newOTP);

    // console.log("OTP body : ", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "OTP can not be send due to internal server error."
    });
  }
};

// sign up

exports.signUp = async (req, res) => {
  try {
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

    const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "Fields are required."
      });
    };

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered."
      });
    };

    const recentOtp = await OTP.find({ email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("Recent otp : ", recentOtp);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found"
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully."
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Sign up failed due to internal server error."
    });
  }
};


exports.googleAuthCodeLogin = async (req, res) => {
  const { code, accountType } = req.body;

  try {
    // 1. Exchange code for tokens
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    // 2. Verify and decode id_token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // 3. Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // You can choose how to assign accountType here.
      // For now, default to 'Student'
      const [firstName, ...lastNameArr] = name.split(" ");
      const lastName = lastNameArr.join(" ");
      const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, 10);

      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null
      });
      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image: picture,
        accountType: accountType,
        verified: true,
        googleId: sub,
        additionalDetails: profileDetails._id
      });
    }

    // 4. Generate JWT token
    const tokenPayload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 5. Return token + user
    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Google OAuth Error:", err);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

exports.googleSignup = async (req, res) => {
  try {
    const { token, accountType } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token is missing" });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, given_name, family_name, picture } = payload;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    }

    // Create fake password to satisfy schema
    const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null
    });
    const newUser = await User.create({
      firstName: given_name,
      lastName: family_name || "",
      email,
      password: hashedPassword,
      image: picture,
      accountType: accountType,
      additionalDetails: profileDetails._id,
    });

    // Create JWT token
    const jwtToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Signup successful",
      token: jwtToken,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
        accountType: newUser.accountType,
      },
    });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Signup failed. Try again later.",
    });
  }
};

// login

exports.logIn = async (req, res) => {
  try {
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please enter all the details"
      })
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered, please Sign up first"
      })
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully."
      })
    }
    else {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }

  } catch (error) {
    console.log("error in login : ", error)
    res.status(500).json({
      success: false,
      message: "Log In failed due to internal server error."
    });
  }
};

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Payload : ", payload)
    const { sub, email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });
      user = await User.create({
        firstName: given_name,
        lastName: family_name || "",
        email: email,
        password: await bcrypt.hash(email + process.env.JWT_SECRET, 10),
        googleId: sub,
        image: picture,
        accountType: "Student",
        additionalDetails: profileDetails._id,
      });
    }

    const jwtToken = generateToken(user._id);
    res.status(200).json({
      success: true,
      token: jwtToken,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
// change password

exports.changePassword = async (req, res) => {
  // Get data from req body
  // get oldpassword, newpassword, confirm password
  // validation
  // update password in db
  //send mail - password updated
  //return response
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter password",
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
    if (await bcrypt.compare(oldPassword, user.password)) {
      const pass = await bcrypt.hash(newPassword, 10);

      const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, { password: pass }, { new: true });

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
        success: true,
        message: "password changed successfully."
      })
    }
    else {
      return res.status(401).json({
        success: false,
        message: "Password is wrong"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Log In failed due to internal server error."
    });
  }
}