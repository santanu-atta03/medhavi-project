const { MongoParseError } = require("mongodb");
const mongoose = require("mongoose");
const { type } = require("os");

const courseSchema = new mongoose.Schema({
    
    courseName : {
        type : String,
        required : true,
        trim : true,
    },
    courseDescription : {
        type : String,
        required : true,
        trim : true,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    whatYouWilLearn : {
        type : String,
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section",
        }
        
    ],
    ratingAndReview : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview"
        }
    ],
    price : {
        type : Number,
    },
    thumbnail : {
        type : String,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    tag : {
        type : [String],
        required : true,
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "User",
        }
    ],
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt :{
        type:Date,
		default:Date.now
    },
    instructions: {
		type: [String],
	},
});

module.exports = mongoose.model("Course", courseSchema);