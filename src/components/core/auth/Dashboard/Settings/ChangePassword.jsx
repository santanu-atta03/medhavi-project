import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../../../../../services/operations/settingsAPI';


const ChangePassword = () => {
    const {token} = useSelector((state) => state.auth)
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful},
    } = useForm();

    const changePasswordHandler = async(data) => {
        console.log("Update password data : ", data);
        try{
            await updatePassword(token, data);
        }catch(err){
            console.log("Error while updateing password",err.message)
        }
    }
  return (
    <form onSubmit={handleSubmit(changePasswordHandler)}>
      <div className="flex flex-col md:flex-row  gap-x-2 justify-around  max-w-[800px]">
        <div className='w-[95%] md:w-[45%]'>
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Create Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showOldPassword ? "text" : "password"}
                    name="password"
                    {...register("oldPassword", {required:true})}
                    placeholder="Enter Password"
                    style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                  />
                  <span
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                  >
                    {showOldPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
                </div>
                <div className='md:w-[40%] w-[95%] mt-5 md:mt-0'>
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showNewPassword ? "text" : "password"}
                    name="confirmPassword"
                    {...register("newPassword", {required : true})}
                    placeholder="Confirm Password"
                    style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                  />
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
                </div>
              </div>
               <div className='flex items-center justify-end mt-8 max-w-[86%] gap-4'>
                    <button className='flex items-center justify-around border border-yellow-50 bg-transparent
                    cursor-pointer gap-x-2 rounded-md py-2 px-4 font-semibold text-richblack-5 ' onClick={() => navigate("/dashboard/my-profile")}>
                        Cancel
                    </button>
                    <button className='flex items-center justify-around border border-yellow-50 bg-yellow-50
                    cursor-pointer gap-x-2 rounded-md py-2 px-4 font-semibold text-richblack-900' type='submit'>
                        Update
                    </button>
                </div>
    </form>
  )
}

export default ChangePassword
