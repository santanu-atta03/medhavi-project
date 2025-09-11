import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/home/section1/HighlightText';
import Button from '../components/home/Button';
import Banner from "../assets/Images/banner.mp4"
import Codeblocks from '../components/home/section1/Codeblocks';
import TimelineSection from '../components/home/TimelineSection';
import LearnLanguageSection from '../components/home/LearnLanguageSection';
import InstructorSection from '../components/home/InstructorSection';
import ExploreMore from '../components/home/ExploreMore';
import Footer from '../components/Common/Footer';
import ReviewSlider from '../components/Common/ReviewSlider';
import bghome from "../assets/Images/homebg.png"
import HomeFront from '../components/Common/HomeFront';
const Home = () => {
  return (
    <div className='mt-0 relative'>

      <div className='homefrontbody'>
        <HomeFront />
      </div>

      {/* <div className='w-full flex flex-col items-center  left-2 h-[700px] mx-auto' style={{backgroundImage : `url(${bghome})`}}>

      
        <Link to={"/signup"}>
          <div className='group mx-auto mt-16 mb-20 w-fit bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none rounded-full overflow-hidden relative'>
            <div className='flex items-center gap-2 rounded-md px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-800 overflow-hidden'>
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

          <div className='w-[92%] h-[40%] bg-caribbeangreen-400 px-3 py-6 rounded-2xl md:h-20 md:w-[35%]  md:bg-opacity-0 md:px-0 md:py-0 text-center mx-auto'>

         
        
           <div className='flex flex-col items-center gap-2 text-4xl mb-5 '>
              <p>Empower your future with <span><HighlightText text = {" Coding Skills"} /></span> </p>
              
            </div>

            <div className='w-full md:max-w-[600px] text-[15px] text-center text-white pr-5 mr-8 mt-5 md:mt-0 '>
              <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
            </div>
         </div>
       

        <div className='flex gap-5 mt-32'>
          <Button linkto={"/signup"} active={true} children={"Learn more"} />
          <Link to={"/signup"} className='text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 bg-richblack-300'>
            Book a demo
          </Link>
        </div>
      </div> */}


      {/* section 1 div */}
      <div className='relative mx-auto flex w-11/12 max-w-maxContent  flex-col items-center justify-between gap-8 text-white bg-[url("../assets/Images/homebg.png")]' >
      

        <div className=''>
          <Codeblocks 
          position={"lg:flex-row"}
          heading={<div className='text-4xl font-semibold'>
            Unlock your <HighlightText text={"Coding Potential"} /> with our Online Courses
            </div>}
          subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
          btn1={{text:"Try it yourself" ,active:true , linkto:"/signup"}}
          btn2={{text:"Learn more" ,active:false , linkto:"/login"}}
          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
            codeColor={"text-white"}
          />
        </div>

        <div>
          <Codeblocks 
          position={"lg:flex-row-reverse"}
          heading={<div className='text-4xl font-semibold'>
            Start <HighlightText text={"Coding in seconds"} />
            </div>}
          subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
          btn1={{text:"Continue lesson" ,active:true , linkto:"/login"}}
          btn2={{text:"Learn more" ,active:false , linkto:"/login"}}
          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
            codeColor={"text-white"}
          />
        </div>

        <div className='w-11/12 max-w-maxContent bg-richblack-900 flex flex-col items-center gap-4'>
          <ExploreMore />
        </div>
      </div>

      {/* section2 div */}

      <div className='bg-pure-greys-5 text-richblack-500 mt-20'>
        <div className='homepage-bg h-[333px]'>

            <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto'>
              <div className='h-[150px]'></div>
              <div className='flex gap-7'>
                <Button active={true} linkto={"/signup"}>
                    <div className='flex gap-2 items-center'>
                      Explore full catalog
                      <FaArrowRight />
                    </div>
                </Button>

                <Button active={false} linkto={"/login"}>
                  <div className='text-white'>
                    Learn more
                  </div>
                </Button>
              </div>
            </div>
        </div>

        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7 mx-auto mt-[90px]'>
            <div className='flex flex-row justify-around gap-7 items-center mx-auto'>
              <div className='text-4xl font-semibold w-[45%]'>
                <p>Get the skills you need for a </p>
                <HighlightText text={"job that is in demand"} />
              </div>
              <div className='w-[40%] gap-6 flex flex-col items-start justify-start'>
                <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <Button active={true} linkto={"/signup"}>
                  Learn more
                </Button>
              </div>
            </div>

            <TimelineSection />

            <LearnLanguageSection />

        </div>
      </div>

      {/* section 3 */}

      <div className='md:w-11/12 md:max-w-maxContent md:mx-auto flex flex-col md:items-center justify-between bg-richblack-900 text-white p-4 gap-5'>
        <InstructorSection />

            <div className='text-4xl text-semibold text-center mt-20 text-richblack-50'>
          Reviews from other learners
          </div>

        <ReviewSlider />
        
      </div>
        
      <Footer />
    </div>
  )
}

export default Home
