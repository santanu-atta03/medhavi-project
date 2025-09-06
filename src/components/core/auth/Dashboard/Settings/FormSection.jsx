import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../../../slices/profileSlice';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';

const FormSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful},
    } = useForm();

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = async (data) => {
        console.log("Form data : ", data);

        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("gender", data.gender);
        formData.append("contactNumber", data.contactNumber);
        formData.append("about", data.about);

        try {
            dispatch(updateProfile( token, formData ));
        } catch (err) {
            console.error("Error while updating profile", err.message);
        }
    };

    useEffect(() => {
        if (user) {
            reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            dateOfBirth: user.dateOfBirth || "",
            gender: user.gender || "",
            contactNumber: user.contactNumber || "",
            about: user.about || "",
            });
        }
    }, [user, reset]);


    useEffect(() => {
        if(isSubmitSuccessful){
            navigate("/dashboard/my-profile")
        }
    },[isSubmitSuccessful]);

    return (
        <div>
            <form action="" onSubmit={handleSubmit(submitForm)}>
                <div className='flex gap-8 justify-start  flex-col '>
                    <div className='flex md:items-start  justify-between max-w-[800px] gap-3'>
                        <div className='w-[45%] '>
                            <label>
                                <h1>First Name</h1>
                                
                                <input type="text" defaultValue={user?.firstName}
                                name='firstName'
                                id='firstName'
                                {...register("firstName")}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                                />
                            </label>
                        </div>
                        <div className='w-[45%] '>
                            <label>
                                <h1>Last Name</h1>
                                
                                <input type="text" defaultValue={user?.lastName}
                                name='lastName'
                                id='lastName'
                                {...register("lastName")}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                                />
                            </label>
                        </div>
                    </div>


                    <div className='flex  items-center justify-between md:max-w-[800px] gap-3'>
                        <div className='w-[45%] '>
                            <label>
                                <h1>Date of Birth</h1>
                                
                                <input type='date' value={user?.dateOfBirth}
                                name='dateOfBirth'
                                id='dateOfBirth'
                                {...register("dateOfBirth")}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                                />
                            </label>
                        </div>
                        <div className='w-[45%] '>
                            <label>
                                <h1 className=''>Gender</h1>
                                
                                <select name="gender" id="gender" style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2" {...register("gender")}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className='flex justify-between max-w-[800px] gap-3'>
                        <div className='w-[45%] '>
                            <label>
                                <h1>Contact Number</h1>
                                
                                <input type="text" value={user?.contactNumber}
                                name='contactNumber'
                                id='contactNumber'
                                {...register("contactNumber")}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                                />
                            </label>
                        </div>
                        <div className='w-[45%] md:w-[45%] mt-6 md:mt-0'>
                            <label>
                                <h1>About</h1>
                                
                                <input type="text" value={user?.about}
                                name='about'
                                id='about'
                                {...register("about")}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                                />
                            </label>
                        </div>
                    </div>

                </div>

                <div className='flex items-center justify-end mt-8 max-w-[89%] gap-4'>
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
        </div>
    )
}

export default FormSection
