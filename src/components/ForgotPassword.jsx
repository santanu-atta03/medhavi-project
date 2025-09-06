import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PiArrowBendDownLeftFill } from "react-icons/pi";
import { getPasswordResetToken} from "../services/operations/authAPI"

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    
    <div className='flex justify-center items-center h-screen w-screen'>
      {
        loading ? (<div className='loader '></div>) : (
            <div className='w-11/12 max-w-maxContent flex flex-col justify-center mx-auto items-center h-screen text-richblack-5 gap-2 text-start'>
                <div className='text-start gap-y-4 h-screen flex flex-col justify-center'>
                    <h1 className='text-3xl font-semibold'>
                        {
                            !emailSent ? "Reset your password" : "Check your email"
                        }
                    </h1>

                    <p className='text-[15px] lg:max-w-[380px]'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={submitHandler}>
                        {!emailSent && (
                        <label className="w-full mt-3 gap-2">
                            <p className="mb-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            
                            />
                        </label>
                        )}
                        <button
                        type="submit"
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900"
                        >
                        {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    <div className='flex items-center gap-2'>
                        <Link to={"/login"}>
                            <div className='flex gap-2 items-center'>
                                <PiArrowBendDownLeftFill />
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
