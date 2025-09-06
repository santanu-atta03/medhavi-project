import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { ImTree } from "react-icons/im";
const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`flex items-center flex-col justify-evenly w-[360px] h-[280px] box-border ${currentCard === cardData?.heading ? "bg-white text-richblack-700 shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800 text-richblack-300"} py-3 px-4 gap-4`} onClick={() => setCurrentCard(cardData?.heading)}>
        <div className='gap-4'>
            <h1 className={`text-lg font-semibold mb-2 ${currentCard === cardData?.heading ? "text-richblack-900" : "text-white"}`}>{cardData.heading}</h1>
            <p className='text-[16px] '>{cardData.description}</p>
        </div>
        <div className='border-t border-dashed w-[100%] px-4'>

        </div>

        <div className='flex justify-between w-[100%]'>
            <div className={`flex gap-2 items-center ${currentCard === cardData?.heading ? "text-caribbeangreen-400" : "text-richblack-100"}`}>
                <MdPeopleAlt />
                <p>{cardData.level}</p>
            </div>
            <div className={`flex gap-2 items-center ${currentCard === cardData?.heading ? "text-caribbeangreen-400" : "text-richblack-100"}`}>
                <ImTree />
                <p>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
} 

export default CourseCard
