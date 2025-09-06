const Category = require("../models/Category");
const Course = require("../models/Course")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
 
exports.createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            });
        }
        const categoryDetails = await Category.create({
            name : name,
            description : description,
        });

        console.log("Category details : ",categoryDetails);

        return res.status(200).json({
            success : true,
            message : "Category created successfully."
        });

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Category creation failed due to internal server error"
        });
    }
};

exports.showAllCategory = async(req, res) => {
    try{
        const allCategory = await Category.find({});
        console.log("All categories : ", allCategory)
        return res.status(200).json({
            success : true,
            message : "Category fetched successfully",
            data:allCategory
        });
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Category fetched failed due to internal server error"
        });
    };
};


// exports.categoryPageDetails = async(req, res) => {
//     try{
//         const {categoryId} = req.body;
//         const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

//         if(!selectedCategory){
//             return res.status(404).json({
//                 success : false,
//                 message : "Data not found"
//             });
//         };

//         const differentCategories = await Category.find({_id : {$ne : categoryId}}).populate("courses").exec();

//         // get top selling courses 
//         // TODO: hw- top selling courses
//         const topSellingCoursesStats = await Category.aggregate([
//             { $unwind: "$courses" },
//             { $group: { _id: "$courses", enrollCount: { $sum: 1 } } },
//             { $sort: { enrollCount: -1 } },
//             { $limit: 5 }
//         ]);

//         const topSellingCourseIds = topSellingCoursesStats.map(stat => stat._id);
//         const topSellingCourses = await Course.find({ _id: { $in: topSellingCourseIds } });

//         return res.status(200).json({
//             success : true,
//             message : "Catagory fetched successfully",
//             data : {
//                 selectedCategory,
//                 differentCategories,
//                 topSellingCourses
//             }
//         });

//     }catch(error){
//         console.log(error.message);
//         return res.status(500).json({
//             success : false,
//             message : "Category page details can not fetched due to internal server error"
//         });
//     };
// };

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReview",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      console.log("COURSES LENGTH:", selectedCategory?.courses?.length);
      // Handle the case when the category is not found
      // if (!selectedCategory) {
      //   console.log("CHECKPOINT B: selectedCategory was null (this shouldn't print)");
      //   console.log("Category not found.")
      //   return res
      //     .status(404)
      //     .json({ success: false, message: "Category not found in backend" })
      // }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
  _id: { $ne: categoryId },
});
      let differentCategory = null;

if (categoriesExceptSelected.length > 0) {
  const randomIndex = getRandomInt(categoriesExceptSelected.length);
  const randomCategoryId = categoriesExceptSelected[randomIndex]._id;

  differentCategory = await Category.findById(randomCategoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
    })
    .exec();
}
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }