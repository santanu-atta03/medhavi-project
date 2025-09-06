const RatingAndReview = require("../models/RatingAndReview");
// const User = require("../models/User");
const Course = require("../models/Course");

exports.createRating = async(req, res) => {
    try{
        const userId = req.user.id;
        const {courseId, rating, review} = req.body;

        const courseDetails = await Course.findOne(
            {_id : courseId, studentsEnrolled : userId}
        );
        console.log("Course details rating : ",courseDetails)
        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Student is not enrolled in the course"
            });
        };

        const alredyReviewed = await RatingAndReview.findOne(
            {user : userId, course : courseId}
        );

        if(alredyReviewed){
            return res.status(403).json({
                success : false,
                message : "User already reviewed"
            });
        };

        const ratingReview = await RatingAndReview.create({rating, review, course : courseId, user : userId});

        const updatedCourse = await Course.findByIdAndUpdate({_id : courseId}, {
            $push : {
                ratingAndReview : ratingReview._id,
            }
        }, {new : true});

        console.log("Updated course : ", updatedCourse);

        return res.status(200).json({
            success : true,
            message : "Rating and review created successfully.",
            ratingReview
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Rating and review creation failed due to internal server error.",
        });
    }
};


exports.getAverageRating = async(req, res) => {
    try{
        const courseId = req.body.courseId;
        
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group : {
                    _id : null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating
            });
        };
        return res.status(200).json({
            success : true,
            message : "Average rating is 0, no ratings till now",
            averageRating : 0,
        });
    }catch(error){
        console.log("Error in average rating : ", error.message);
        return res.status(500).json({
            success : false,
            message : "Average rating calculation failed due to internal server error"
        });
    };
};



exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}