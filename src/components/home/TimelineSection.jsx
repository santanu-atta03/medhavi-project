import React from 'react'
import Logo1 from "../../assets/TimelineLogo/Logo1.svg"
import Logo2 from "../../assets/TimelineLogo/Logo2.svg"
import Logo3 from "../../assets/TimelineLogo/Logo3.svg"
import Logo4 from "../../assets/TimelineLogo/Logo4.svg"
import TimelineImage from "../../assets/Images/TimelineImage.png"

const timeline = [
    {
        id : 1,
        Logo : Logo1,
        heading : "Leadership",
        description : "Fully committed to the success company"
    },
    {
        id : 2,
        Logo : Logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority"
    },
    {
        id : 3,
        Logo : Logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        id : 4,
        Logo : Logo4,
        heading : "Solve the problem",
        description : "Code your way to a solution"
    },
]
const TimelineSection = () => {
  return (
    <div className='mt-20 mb-20'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-[180px]'>
        <div className='w-[50%] md:w-[90%] flex flex-col gap-4'>
            {
                timeline.map((element, index) => {
                    return (
                        <div key={index}>
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='w-[50px] h-[50px] flex items-center bg-white rounded-full justify-center'>
                                    <img src={element.Logo} alt="" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                            {
                                element.id < 4 ? <div className='border-dashed border-l-2 h-[25px] text-center ml-6 mt-2 border-richblack-100'>

                            </div> : <div></div>
                            }
                            
                        </div>
                        
                    )
                })
            }
            
        </div>

        <div className='w-[100%] relative'>
            <div className='relative h-[200px] w-[590px] rounded-full shadow-[0_0_30px_9px]  shadow-blue-200 mx-3 my-7 flex items-center justify-center'>
                <img src={TimelineImage} alt="" className='w-fit h-fit'/>
            </div>
            <div className='w-[400px] h-[100px] bg-caribbeangreen-700 absolute flex justify-evenly items-center left-[50%] translate-x-[-50%] translate-y-[40%]'>
                <div className='flex max-w-[90px] items-center justify-between gap-4'>
                    <p className='text-white font-semibold text-3xl'>10</p>
                    <p className='text-caribbeangreen-100 '>Years Experiences</p>
                </div>
                <div className='border-l-2 border-white h-[35px] ml-10'></div>
                <div className='flex max-w-[140px] items-center justify-between gap-4'>
                    <p className='text-white font-semibold text-3xl'>250</p>
                    <p className='text-caribbeangreen-100 '>Types of courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
