const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();

exports.updateProfile = async(req, res) => {
    try{
        const {firstName = "",
      lastName = "",dateOfBirth = "", about = "", contactNumber, gender} = req.body;

        const userId = req.user.id;

        if(!contactNumber || !gender){
            return res.status(400).json({
                success : false,
                message : "All details required."
            });
        };
 
        const userDetails = await User.findById(userId);
        if (!userDetails) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        const user = await User.findByIdAndUpdate(userId, {
          firstName,
          lastName,
        })
        await user.save()
        const profileDetails = await Profile.findById(userDetails.additionalDetails);
        if (!profileDetails) {
          return res.status(404).json({
            success: false,
            message: "Profile not found",
          });
        }
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        console.log(profileDetails);
        const updatedUserDetails = await User.findById(userId)
        .populate("additionalDetails")
        .exec();
        console.log("Updated user details :",updatedUserDetails)
        return res.status(200).json({
            success : true,
            message : "profile details updated sucessfully",
            updatedUserDetails
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "profile details updation error"
        });
    };
};

exports.updateDisplayPicture = async(req,res) => {
  try{
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log("updated iamge", image);

    const updatedUser = await User.findByIdAndUpdate(
      {_id : userId},
      {image : image.secure_url},
      {new : true}
    )
    console.log("updated user : ",updatedUser)
    return res.status(200).json({
      success : true,
      message : "Image uploaded sucessfully",
      data : updatedUser
    })
  }catch(err){
    console.log("Error while uploading image");
    return res.status(500).json({
      success : false,
      message : "Image upload failed"
    })
  }
};

exports.deleteAccount = async(req, res) => {
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        };

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

        // TODO: Unenrolled user from all enrolled courses
        await User.findByIdAndDelete({_id : userId});
        // TODO: How to schedule the deletion process for like 3 days

        return res.status(200).json({
            success : true,
            message : "User deleted successfully."
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "User account deletion unsuccessfull"
        });
    };
};

exports.getAllUserDetails = async(req, res) => {
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        };

        return res.status(200).json({
            success : true,
            message : "User data fetched sucessfully",
            data : userDetails
        });
        
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "User data fetch can not process"
        });
    };
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userID: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      console.log("Course progress count : ",courseProgressCount)
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}