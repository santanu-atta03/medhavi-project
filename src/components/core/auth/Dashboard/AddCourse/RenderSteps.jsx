import React from 'react'
import { FaCheck } from 'react-icons/fa6';
import {useSelector} from "react-redux"
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';
const RenderSteps = () => {

    const {step} = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title : "Course Information"
        },
        {
            id: 2,
            title : "Course Builder"
        },
        {
            id: 3,
            title : "Publish"
        },
    ];


    return (
        <>
            <div className='flex '>
                {
                    steps.map((item) => (
                        <div className='flex items-center w-[44%] md:w-full mb-3' key={item.id}>
                            <div className='flex items-center'>
                                <div className={`${step === item.id ? "bg-yellow-800 text-yellow-25 border-yellow-200" : "border-richblack-700 bg-richblack-800 text-richblack-300"} grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step > item.id ? "bg-yellow-50" : ""}`}>
                                    {
                                        step > item.id ? (<FaCheck className='text-caribbeangreen-100'/>) : (<div className='flex flex-col text-center'>
                                            <h1 className=''>{item.id}</h1>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className={`${item.id !== 3 ? "border-t-2 h-[2px] w-[220px] border-dashed" : ""} ${step > item.id ? "border-yellow-25 " : "border-yellow-600" }`}>

                            </div>
                        </div>
                    ))
                }
            </div>
            
            <div className='flex justify-between mb-4'>
                {
                    steps.map((item) => (
                        
                        <div className={`${item.title === "Course Builder" ? "md:mr-32 mr-20" : "mr-12"} ${item.title === "Publish" ? "md:mr-12 mr-2" : ""} `} key={item.id}>
                            <p>{item.title}</p>
                        </div>
                        
                    ))
                }
            </div>
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}

export default RenderSteps
