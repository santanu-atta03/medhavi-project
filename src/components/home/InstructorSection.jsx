import React from 'react'
import InstructorImage from "../../assets/Images/Instructor.png"
import HighlightText from './section1/HighlightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa6'
const InstructorSection = () => {
  return (
    <div className='mt-14'>
      <div className='flex flex-col md:flex-row items-center gap-32 justify-around'>
        <div className='w-[50%]'>
            <img src={InstructorImage} alt="" className='h-fit w-fit shadow-[-20px_-20px_rgba(255,255,255)]'/>

        </div>

        <div className='w-[60%] gap-5 flex flex-col items-start justify-center'>
            <h1 className='font-semibold text-3xl w-[30%]'>Become an <HighlightText text={"Instructor"} /></h1>
            <p className=''>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <Button active={true} linkto={"/signup"}>
                <div className='flex gap-3 items-center'>
                    Start Teaching Today 
                    <FaArrowRight />
                </div>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
