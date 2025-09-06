import React from 'react'
import ContactUsForm from '../ContactUs/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center mx-auto mt-12 gap-8'>
      <div className='text-center gap-5'>
        <h1 className='text-3xl text-white font-semibold'>Get in touch</h1>
        <p className='text-[16px] text-richblack-100 mt-4'>We’d love to here for you, Please fill out this form.</p>
      </div>
      <div className='mx-auto'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
