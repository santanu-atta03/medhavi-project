const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async(req, res)=> {
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag:_tag,status,instructions: _instructions,} = req.body;
        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            });
        };

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details : ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor not found."
            });
        };

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Tag not found"
            });
        };

        const image = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWilLearn : whatYouWillLearn ,
            price,
            tag : tag,
            category : categoryDetails._id,
            thumbnail : image.secure_url,
            status:status,
            instructions
        });

        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                },
                
            },
            {new : true},
        );
        //TODO : hw
        const categoryDetails2 = await Category.findByIdAndUpdate(
          { _id: category },
          {
            $push: {
              courses: newCourse._id,
            },
          },
          { new: true }
        )
        console.log("HEREEEEEEEE", categoryDetails2)

        return res.status(200).json({
            success : true,
            message : "Course created sucessfully.",
            data:newCourse
        });

    }catch(error){
      console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Course creation failed, due to internal error."
        });
    };
};


exports.showAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({}, {
            courseName : true,
            price : true,
            thumbnail : true,
            instructor : true,
            ratingAndReview : true,
            studentsEnrolled : true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "All courses data fetched successfully",
            data : allCourses
        });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Course creation failed, due to internal error."
        });
    };
};

exports.courseEntireDetails = async(req, res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(404).json({
              success:false,
              message:"Course id not found"
            });
        };

        const courseDetails = await Course.find(
            {_id : courseId}
        ).populate(
            {
                path : "instructor",
                populate : {
                    path : "additionalDetails",
                },
            }
        ).populate("category")
        .populate("ratingAndReview")
        .populate(
            {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        ).exec();
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : "Course not found"
            });
        };
        return res.status(200).json({
            success : true,
            message : "Course details fetched sucessfully",
            data : courseDetails
        });
    }catch(error){
      console.log("error in course : ",error)
        return res.status(500).json({
            success : false,
            message : "Course details can not fetched due to internal server rror."
        });
    }
};


// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const updates = req.body
//     console.log("req.body:", req.body);
// console.log("typeof req.body:", typeof req.body);
// console.log("req.body.constructor.name:", req.body.constructor.name);

//     const course = await Course.findById(courseId)

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" })
//     }

//     // If Thumbnail Image is found, update it
//     if (req.files) {
//         console.log("thumbnail update")
//         const thumbnail = req.files.thumbnailImage;
//         const thumbnailImage = await uploadImageToCloudinary(
//             thumbnail,
//             process.env.FOLDER_NAME
//         )
//         course.thumbnail = thumbnailImage.secure_url;
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//         if (updates.hasOwnProperty(key)) {
//             if (key === "tag" || key === "instructions") {
//                 course[key] = JSON.parse(updates[key])
//             } else {
//                 course[key] = updates[key]
//             }
//         }
//     }

//     await course.save()

//     const updatedCourse = await Course.findOne({
//         _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// };

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key of Object.keys(updates)) {
      if (key === "tag" || key === "instructions") {
        try {
          course[key] = JSON.parse(updates[key]);
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: `Invalid JSON format for ${key}`,
          });
        }
      } else if (key !== "courseId") {
        course[key] = updates[key];
      }
    }

    await course.save();

    // Fetch the updated course with all the related fields populated
    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 }).populate({
    path: "courseContent",
    populate: {
        path: "subSection", // If Section has a field subSection: [ObjectId]
        model: "SubSection"
    }
}).exec();

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnroled = course.studentsEnrolled
    for (const studentId of studentsEnroled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    console.log("Course id : ",courseId)
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id : courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

      console.log("Course details : ",courseDetails)
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
