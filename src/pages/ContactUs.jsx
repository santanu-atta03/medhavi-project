import React from 'react'
import { IoChatbubblesSharp } from "react-icons/io5";
import { GiEarthAmerica } from "react-icons/gi";
import { IoCallSharp } from "react-icons/io5";
import ContactUsForm from '../components/home/ContactUs/ContactUsForm';
import Footer from '../components/Common/Footer';
import ReviewSlider from '../components/Common/ReviewSlider';

const ContactUs = () => {
  return (
    <div>
    <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent justify-between gap-12 text-white lg:flex-row'> 
        <div className='flex flex-col md:flex-row md:items-start md:justify-between mx-auto mb-20'>
            <div className='lg:w-[30%] w-full mb-10 md:mb-0'>
                <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
                    <div className='flex flex-col gap-[4px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3 mb-2'>
                            <IoChatbubblesSharp size={25}/>
                            <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
                        </div>
                        <p className='ml-9'>Our friendly team is here to help.</p>
                        <p className='ml-9'>santanu2003atta@gmail.com</p>
                    </div>
                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3 mb-2'>
                            <GiEarthAmerica size={25}/>
                            <h1 className='text-lg font-semibold text-richblack-5'>Visit us</h1>
                        </div>
                        <p className='ml-9'>Come and say hello at our office HQ.</p>
                        <p className='ml-9'>Kolkata, West Bengal, 700028</p>
                    </div>
                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3 mb-2'>
                            <IoCallSharp size={25}/>
                            <h1 className='text-lg font-semibold text-richblack-5'>Call us</h1>
                        </div>
                        <p className='ml-9'>Call Mon - Fri from 10am to 4pm.</p>
                        <p className='ml-9'>+91 7811001547</p>
                    </div>
                </div>
            </div>
            <div className='lg:w-[60%]'>
                <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col items-center">
                    <h1 className="text-4xl leading-10 font-semibold text-richblack-5 ml-14">
                        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
                    </h1>
                    <p className="text-start mr-32 mt-3">
                        Tell us more about yourself and what you&apos;re got in mind.
                    </p>

                    <div className="mt-7 w-[90%]">
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h1 className='text-2xl font-semibold text-center text-white'>Review from other learners</h1>
    <div className='mx-auto mt-2 flex w-11/12 max-w-maxContent justify-between text-white lg:flex-row'>
        
    <ReviewSlider />
    </div>
    <Footer />
    </div>
  )
}

export default ContactUs
