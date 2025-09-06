import React from 'react'
import IconButton from '../../../../../Common/IconButton'
import { MdAddCircleOutline } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateSection } from '../../../../../../services/operations/courseDetailsAPI';
import { createSection } from '../../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../../slices/courseSlice';
import { setEditCourse } from '../../../../../../slices/courseSlice';
import { toast } from "react-hot-toast"
import { setStep } from '../../../../../../slices/courseSlice';
import {MdNavigateNext} from "react-icons/md"
import NestedView from './NestedView';

const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [editSectionName, setEditSectionName] = useState(null)
    const dispatch = useDispatch();

  // handle form submission
  const formSubmitHandler = async (data) => {
    // console.log(data)
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
      // console.log("edit", result)
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if (result) {
      // console.log("section result", result)
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

    return (
        <div className='bg-richblack-800 p-5 rounded-md'>

            <h1 className='text-2xl font-semibold mb-4'>Course Builder</h1>
            <form action="" onSubmit={handleSubmit(formSubmitHandler)}>
                <div>
                    <label htmlFor="">
                        <h1>Create Section</h1>

                        <input type="text" 
                            id="sectionName"
                            {...register("sectionName",{required:true})}
                            placeholder='Add a section to build your course'
                            style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                        />
                    </label>
                </div>

                <div className='mt-4 mb-4'>
                    <IconButton
                    type="submit"
                    text={editSectionName ? "Edit Section Name" : "Create Section"}
                    outline={true}
                    >
                        <MdAddCircleOutline color='yellow'/>
                    </IconButton>
                    {editSectionName && (
                        <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-sm text-richblack-300 underline"
                        >
                        Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}
            {/* Next Prev Button */}
            <div className="flex justify-end gap-x-3 mt-5">
                <button
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                Back
                </button>
                <IconButton disabled={loading} text="Next" onclick={goToNext}>
                <MdNavigateNext />
                </IconButton>
            </div>
        </div>
    )
}

export default CourseBuilderForm
