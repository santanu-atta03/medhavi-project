import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories, addCourseDetails, editCourseDetails } from '../../../../../../services/operations/courseDetailsAPI'
import { LuIndianRupee } from "react-icons/lu"
import { RxCross2 } from "react-icons/rx"
import { MdNavigateNext } from "react-icons/md"
import { setStep, setCourse } from '../../../../../../slices/courseSlice'
import Upload from '../Upload'
import "./TagInput.css"
import { COURSE_STATUS } from '../../../../../../utils/constants'
import { toast } from 'react-hot-toast'
import IconBtn from '../../../../../Common/IconBtn'

const CourseInformationForm = () => {
  const dispatch = useDispatch()
  const { course, editCourse } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const {step} = useSelector((state) => state.course)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  const [tags, setTags] = useState([])
  const [input, setInput] = useState("")

  const [requirements, setRequirements] = useState([])
  const [inputRequirements, setInputRequirements] = useState("")
  // Fetch categories
  const getCategories = async () => {
    setLoading(true)
    const response = await fetchCourseCategories()
    setCourseCategories(response)
    setLoading(false)
  }

  useEffect(() => {
    getCategories();
    console.log("Printing course : ",course)
    const init = async () => {
      if (editCourse) {
        setValue("courseTitle", course.courseName)
        setValue("courseShortDesc", course.courseDescription)
        setValue("coursePrice", course.price)
        setValue("courseTags", course.tag)
        setValue("courseBenefits", course.whatYouWilLearn)
        setValue("courseCategory", course.category.name)
        setValue("courseRequirements", course.instructions)
        setValue("courseImage", course.thumbnail)

        setTags(course.tag || [])
        setRequirements(course.instructions || [])
      }
    }
    init()
  }, [])

  useEffect(() => {
    setValue("courseTags", tags)
  }, [tags])

  useEffect(() => {
    setValue("courseRequirements", requirements)
  }, [requirements])

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleDeleteRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const clickHandler = (e) => {
    e.preventDefault()
    if (inputRequirements.trim() !== "") {
      setRequirements([...requirements, inputRequirements.trim()])
      setInputRequirements("")
    }
  }

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
  }

  const submitFormHandler = async (data) => {
    console.log("Printing data : ",data)
    if (tags.length === 0) {
      return toast.error("Please add at least one tag")
    }
    if (requirements.length === 0) {
      return toast.error("Please add at least one requirement")
    }

    const formData = new FormData()

    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      formData.append("courseId", course._id)
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(tags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("instructions", JSON.stringify(requirements))
      if (data.courseImage !== course.thumbnail) {
        formData.append("thumbnailImage", data.courseImage)
      }

      setLoading(true)
      const result = await editCourseDetails(formData, token)
      setLoading(false)

      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    } else {
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(tags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("instructions", JSON.stringify(requirements))
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("thumbnailImage", data.courseImage)

      setLoading(true)
      const result = await addCourseDetails(formData, token)
      setLoading(false)

      if (result) {
        console.log("Course creation success — moving to step 2")
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    }
  }

  return (
    <div className='mt-5  md:w-full'>
    <form className='border border-richblack-800 px-6 py-5 mt-5 rounded-md bg-richblack-800'
      onSubmit={handleSubmit(submitFormHandler)}>

      {/* Course Title */}
      <div className='flex flex-col gap-4 justify-center'>
        <label>
          <p>Course Title <sup className="text-pink-200">*</sup></p>
          <input
            type="text"
            {...register("courseTitle", { required: true })}
            className="w-full rounded bg-richblack-600 p-2 mt-2 text-white"
          />
          {errors.courseTitle && <p className="text-pink-200 text-sm">Title is required</p>}
        </label>

        {/* Course Description */}
        <label>
          <p>Course Description <sup className="text-pink-200">*</sup></p>
          <textarea
            {...register("courseShortDesc", { required: true })}
            className="w-full rounded bg-richblack-600 p-2 mt-2 text-white"
          />
          {errors.courseShortDesc && <p className="text-pink-200 text-sm">Description is required</p>}
        </label>

        {/* Price */}
        <label className="relative">
          <p className="mb-1 text-sm text-white">Price</p>
          <input
            type="number"
            {...register("coursePrice", { required: true })}
            className="w-full rounded bg-richblack-600 p-2 mt-2 px-8 text-white"
          />
          <span className="absolute left-2 top-[43px] text-white opacity-60"><LuIndianRupee size={20} /></span>
        </label>

        {/* Category */}
        <label>
          <p>Category <sup className="text-pink-200">*</sup></p>
          <select
            {...register("courseCategory", { required: true })}
            className="w-full rounded bg-richblack-600 p-2 mt-2 text-white"
          >
            <option value="">Select category</option>
            {courseCategories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </label>

        {/* Tags */}
        <label>
          <p>Tags <sup className="text-pink-200">*</sup></p>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag, i) => (
              <div key={i} className="bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center gap-2">
                {tag}
                <button type="button" onClick={() => handleDeleteTag(i)}>
                  <RxCross2 />
                </button>
              </div>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault()
                if (input.trim() && !tags.includes(input.trim())) {
                  setTags([...tags, input.trim()])
                  setInput("")
                }
              }
            }}
            placeholder="Add a tag and press Enter"
            className="w-full mt-2 p-2 rounded bg-richblack-600 text-white"
          />
        </label>

        {/* Thumbnail Upload */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Benefits */}
        <label>
          <p>Benefits of the course <sup className="text-pink-200">*</sup></p>
          <textarea
            {...register("courseBenefits", { required: true })}
            className="w-full rounded bg-richblack-600 p-2 mt-2 text-white"
          />
        </label>

        {/* Requirements */}
        <label>
          <p>Requirements/Instructions <sup className="text-pink-200">*</sup></p>
          <input
            value={inputRequirements}
            onChange={(e) => setInputRequirements(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                if (inputRequirements.trim()) {
                  setRequirements([...requirements, inputRequirements.trim()])
                  setInputRequirements("")
                }
              }
            }}
            className="w-full rounded bg-richblack-600 p-2 mt-2 text-white"
          />
        </label>
        <button className="text-yellow-5 mt-2" onClick={clickHandler}>
          Add
        </button>
        <div className="flex flex-wrap gap-2 mt-2">
          {requirements.map((req, i) => (
            <div key={i} className="bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center gap-2">
              {req}
              <button type="button" onClick={() => handleDeleteRequirement(i)}>
                <RxCross2 />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex md:flex-row flex-col items-center gap-y-3 justify-end md:gap-x-2 mt-6">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="bg-richblack-300 text-richblack-900 px-4 py-2 rounded"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          className="bg-yellow-25 text-richblack-800 px-6 md:px-4 py-2 rounded flex items-center gap-2"
        >
          {!editCourse ? "Next" : "Save Changes"} <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
    </div>
  )
}

export default CourseInformationForm
