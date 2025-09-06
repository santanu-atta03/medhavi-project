import React from 'react'
import HighlightText from './section1/HighlightText'
import KnowYourProgress from "../../assets/Images/Know_your_progress.svg"
import PlanYourLesson from "../../assets/Images/Plan_your_lessons.svg"
import CompareWithOthers from "../../assets/Images/Compare_with_others.svg"
import Button from './Button'

const LearnLanguageSection = () => {
  return (
    <div className='mt-20 mb-20'>
        <div className='flex flex-col items-center'>

            <div className='flex items-center flex-col w-[75%] text-center gap-2 text-black'>
                <p className='text-3xl font-semibold'>Your swiss knife for <HighlightText text={"Learning any language"} /></p>
                <p className='text-[15px]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>

            <div className='flex flex-col mt-4 md:flex-row md:items-center mb-10'>
                <img src={KnowYourProgress} alt="Know_your_progress" 
                    className='object-contain -mr-32 ml-10'
                />
                <img src={CompareWithOthers} alt="Compare_with_others" 
                    className='object-contain -mr-32'
                />
                <img src={PlanYourLesson} alt="Plan_your_lessons" 

                />
            </div>

            <Button active={true} linkto={"/signup"}>
                Learn more
            </Button>
        </div>
    </div>
  )
}

export default LearnLanguageSection
