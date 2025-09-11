import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../../Data/countrycode.json"
import { useDispatch } from 'react-redux';
import { contactus } from '../../../services/operations/contactAPI';
const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = async(data) =>{
        console.log("Logging data : ", data);
        try{
            setLoading(true);
            dispatch(contactus(null, data))
            setLoading(false);
        }catch(err){
            console.log(err.message)
        }
    };
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email : "",
                firstName:"",
                lastName:"",
                contactNumber:"",
                message : ""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <form action="" className='text-richblack-50' onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-5 w-[90%] mx-auto'>
            <div className='flex gap-5'>
                <div className='w-[50%]'>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="firstName"
                        {...register("firstName", {required:true})}
                        placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                </div>

                <div className='w-[50%]'>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name
                        </p>
                        <input
                        required
                        type="text"
                        name="lastName"
                        {...register("lastName")}
                        placeholder="Enter last name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                </div>
            </div>

            <div>
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    required
                    type="text"
                    name="email"
                    {...register("email", {required:true})}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter email address.
                    </span>
                    )}
                </label>
            </div>
            <div>
                <div>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Phone Number <sup className="text-pink-200">*</sup>
                        </p>
                        
                        <div className='flex gap-4'>
                            {/* <div style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[20%] p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5">
                                <select name="countryCode" id="countryCode" className='bg-richblack-800 w-full h-full' {...register("countryCode")}>
                                    {
                                        CountryCode.map((element, index) => {
                                            return(
                                                <option key={index} value={element.code}>
                                                    {element.code}  - {element.country}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}

                            <select name="countryCode" id="countryCode" className='w-[20%] p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5' {...register("countryCode")}>
                                    {
                                        CountryCode.map((element, index) => {
                                            return(
                                                <option key={index} value={element.code} className=''>
                                                    {element.code} - {element.country} 
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                        <input
                        required
                        type="text"
                        name="contactNumber"
                        
                        {...register("contactNumber", {required:{value:true, message:"Enter your phone number"},  maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },})}
                        placeholder="01234 56789"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[80%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                            </span>
                        )}
                        </div>
                        
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="message" className="lable-style">
                    Message <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    placeholder="Enter your message here"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>

            <button type='submit' className='text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] bg-yellow-50 text-black hover:shadow-none hover:scale-95 transition-all duration-200'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm
