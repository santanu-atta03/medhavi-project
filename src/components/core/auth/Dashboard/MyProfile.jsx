import React from 'react'
import Dashboard from '../../../../pages/Dashboard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../Common/IconButton';
import { AiFillEdit } from "react-icons/ai";

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <>
            <h1 className='text-2xl font-semibold mb-10 text-richblack-5'>My profile</h1>
            <div className='flex flex-col gap-4 md:flex-row justify-between items-center border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-richblack-800 px-12 p-8'>
                <div className='flex flex-col md:flex-row gap-8 items-center'>
                    <img src={user?.image} className='w-[100px] h-[100px] rounded-full'/>
                    <div className='flex flex-col'>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div>
                    <IconButton onclick={() => navigate("/dashboard/settings")}>
                        <AiFillEdit />
                        Edit
                    </IconButton>
                </div>
            </div>

            <div className='flex flex-col border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-richblack-800 px-12 p-8 mt-12'>
                <div className='flex flex-row justify-between '>
                    <h1 className='text-lg font-md text-richblack-5'>Personal Details</h1>
                    <div>
                        <IconButton onclick={() => navigate("/dashboard/settings")}>
                            <AiFillEdit />
                            Edit
                        </IconButton>
                    </div>
                </div>

                <div className='flex flex-row justify-between max-w-[600px] gap-3 mt-3 '>
                    <div className='flex flex-col '>
                        <h1 className='text-richblack-300'>First Name</h1>
                        <h1>{user?.firstName}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-richblack-300'>Last Name</h1>
                        <h1>{user?.lastName}</h1>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between max-w-[630px] gap-3 mt-3'>
                    <div className='flex flex-col '>
                        <h1 className='text-richblack-300'>Email</h1>
                        <h1>{user?.email}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-richblack-300'>Phone Number</h1>
                        <h1>{user?.additionalDetails?.contactNumber ? (user?.additionalDetails?.contactNumber) : ("N/A")}</h1>
                    </div>
                </div>

                <div className='flex flex-row justify-between max-w-[578px] gap-3 mt-3'>
                    <div className='flex flex-col '>
                        <h1 className='text-richblack-300'>Date of Birth</h1>
                        <h1>{user?.additionalDetails?.dateOfBirth}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-richblack-300'>Gender</h1>
                        <h1>{user?.additionalDetails?.gender ? (user?.additionalDetails?.gender) : ("N/A")}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile
