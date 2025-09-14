import React from 'react'
import HighlightText from '../components/home/section1/HighlightText'
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import CountUp from "../components/Common/CountUp"
import GradientText from '../components/Common/GradientText'
import LearningGrid from '../components/home/About/LearningGrid'
import ContactFormSection from '../components/home/About/ContactFormSection'
import ReviewSlider from '../components/Common/ReviewSlider'
import Footer from '../components/Common/Footer'
  

const AboutUs = () => {
  return (
    <div className=''>
        <section className='bg-richblack-800'>
            <div className='flex flex-col w-11/12 max-w-maxContent items-center justify-center mx-auto'>
                <div className='text-white flex flex-col justify-center items-center mx-auto relative mb-[160px]'>
                    
                    <div className='w-[65%] text-center mx-auto mt-28 mb-10'>
                        <p className='text-4xl font-semibold mb-5'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /></p>
                        <p className='text-[17px]  text-center text-richblack-300 font-inter font-medium'>Medhavi is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>

                    <div className='shadow-[0_0_50px_11px]  shadow-brown-400 mx-3 my-7 p-1 w-[290px] h-[5px] mt-5'></div>
                    <div className='flex flex-col md:flex-row justify-around items-center gap-6 md:translate-y-[50%] absolute md:top-[50%] top-[93%]'>
                        <img src={aboutus1} alt="" className='md:block hidden'/>
                        <img src={aboutus2} alt="" className='md:block hidden'/>
                        <img src={aboutus3} alt="" />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center mt-[220px] justify-center mx-auto mb-32'>
                <div>
                    <div className=' bg-richblack-900 text-richblack-200 text-3xl font-semibold text-center leading-normal flex flex-col gap-3'>
                        <div className='mx-auto'>
                            <BiSolidQuoteLeft />
                        </div>
                        <p>We are passionate about revolutionizing the way we learn. Our innovative platform     <HighlightText text={"Combines technology"} />,<span className='text-[#FF512F]'> expertise ,</span> and communiy to create an <span className='text-[#F9D423]'>unparalleled educational experience.</span></p>
                        <div className='mx-auto'>
                            <BiSolidQuoteRight />
                        </div>
                    </div>
                </div>
                
                <div className='mt-32 mx-auto'>
                    <div className='flex flex-col md:flex-row justify-around items-center mx-auto mb-[170px]'>
                        <div className='flex flex-col w-[90%] md:w-[37%] text-richblack-300 text-[16px] justify-around gap-4'>
                            <h1 className='bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-bold text-3xl'>Our founding story</h1>
                            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div className='mt-10 md:mt-0'>
                                <img src={FoundingStory} alt="img" className='shadow-top-left-pink shadow-[#FC6767]'  style={{boxShadow: '-8px -8px 20px 0 #FC6767'}}/>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row text-richblack-300 text-[16px] justify-around items-center mt-32'>
                        <div className='flex flex-col w-[90%] md:w-[36%] gap-5'>
                            <h1 className='bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold text-3xl'>Our Vision</h1>
                            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>

                        <div className='flex flex-col w-[90%] mt-10 md:mt-0 md:w-[36%] gap-5'>
                            <h1 className='bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold text-3xl'>Our Mission</h1>
                            <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='bg-richblack-700'>
            <div className='w-11/12 max-w-maxContent flex flex-row items-center md:mt-[220px] justify-center mx-auto mb-32 py-20'>
                <GradientText>
                    <h1 className='text-3xl font-semibold'>5K</h1>
                    <p className='text-[16px] '>Active Students</p>
                </GradientText>

                <GradientText>
                    <CountUp
                    from={0}
                    to={10}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-3xl font-semibold"
                    />
                    <span className='text-3xl font-semibold'> +</span>
                    <p className='text-[16px] '>Mentors</p>
                </GradientText>
                <GradientText>
                    <CountUp
                    from={0}
                    to={200}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-3xl font-semibold"
                    />
                    <span className='text-3xl font-semibold'> +</span>
                    <p className='text-[16px] '>Courses</p>
                </GradientText>
                <GradientText>
                    <CountUp
                    from={0}
                    to={50}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-3xl font-semibold"
                    />
                    <span className='text-3xl font-semibold'> +</span>
                    <p className='text-[16px] '>Awards</p>
                </GradientText>
                
            </div>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto'>
            <LearningGrid />
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center mt-12 mb-20'>
            <ContactFormSection />
        </section>

        <section>
            <div className='md:w-11/12 md:max-w-maxContent md:mx-auto flex flex-col md:items-center md:mt-12 md:mb-20'>
                <h1 className='text-3xl text-center font-semibold text-richblack-5'>Review from other learners</h1>
                <ReviewSlider />
            </div>
        </section>

        <Footer>
            <Footer />
        </Footer>
    </div>
  )
}

export default AboutUs
