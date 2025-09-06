import React, { useState } from 'react'
import { HomePageExplore } from '../../Data/homepage-explore';
import HighlightText from './section1/HighlightText';
import CourseCard from './section1/CourseCard';
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => (course.tag === value));
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };
  return (
    <div>
      <div className='gap-5'>
        <h1 className='text-4xl font-semibold text-center'>Unlock the <HighlightText text={"Power of Code"}/></h1>
        <p className='text-center mt-2 mb-12 text-white'>Learn to build anything that you can imagine</p>
      </div>

      <div className='lg:flex md:gap-5 -mt-5 mx-auto md:w-max bg-richblack-800 text-richblack-200 p-2 md:rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-20 rounded-lg flex flex-row flex-wrap w-[90%] items-center gap-4'>
        {
          tabsName.map((element, index) => {
            return(
              <div className={`text-[16px] flex flex-row items-center gap-2 rounded-full ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 md:px-7 py-2 px-3`} key={index} onClick={() => setMyCards(element)}>
                {element}
              </div>
            )
          })
        }
      </div>

      <div className='lg:h-[150px]'>
      </div>

      <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-[90%] lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-20 lg:px-0 px-3'>
        {
          courses.map((element, index) => {
            return(
              <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ExploreMore
