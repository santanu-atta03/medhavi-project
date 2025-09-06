import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../Common/IconButton'
import { MdCloudUpload } from "react-icons/md";
import { setUser } from '../../../../slices/profileSlice';
import { deleteProfile, updateDisplayPicture } from '../../../../services/operations/settingsAPI';
import FormSection from './Settings/FormSection';
import ChangePassword from './Settings/ChangePassword';
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile);
  const [image, setimage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if(file){
      setimage(file);
    }
  }

  const uploadHandler = () => {
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", image);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      })
    }catch(err){
      console.log("Error in upload",err.message);
    }
  }

  const deleteHandler = () => {
    try{
      dispatch(deleteProfile(token, navigate));
    }catch(err){
      console.log("error whle deleteing : ",err.message)
    }
  }
  return (
    <>

      <h1 className='text-3xl font-semibold mb-10 text-richblack-5'>Settings</h1>
      <div className='flex justify-between items-center border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-richblack-800 px-12 p-8 '>
        <div className='flex gap-8 items-center'>
          <img src={user?.image} className='w-[100px] h-[100px] rounded-full'/>
          <div className='flex flex-col gap-3'>
            <h1 className='font-md'>Change profile picture</h1>
            <div className='flex md:flex-row flex-col gap-3'>
              <div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={imageHandler}
                  style={{ display: 'none' }} // hide the native input
                />

                <label htmlFor="file-upload" style={{
                  padding: "8px 18px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "4px",
                  display: "inline-block"
                }}>
                  Select
                </label>

                <span style={{ marginLeft: "10px", height:"40px" }} className='w-[40px] h-[40px] rounded-full'>
                  {image ? image.name : ""}
                </span>
              </div>
              <IconButton onclick={uploadHandler} disabled={loading || !image}> 
                  <div className='flex items-center gap-2'>
                    {
                      loading ? "Uploading..." : "Upload"
                    }
                    <MdCloudUpload />
                  </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>


      <div className='flex flex-col  border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-richblack-800 px-12 p-8 mt-8'>
        <h1 className='text-lg font-md mb-7'>Profile Information</h1>
        <FormSection />
      </div>

      <div className='flex flex-col  border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-richblack-800 px-12 p-8 mt-8'>
        <h1 className='text-lg font-md mb-7'>Change Password</h1>
         <ChangePassword />
      </div>

      <div className='flex flex-col  border-[1px] border-richblack-700 rounded-md text-richblack-5 bg-red-900 md:px-12 md:p-8 p-4 mt-8'>
        <div className='md:flex gap-x-5 md:gap-x-5 md:justify-start md:items-start'>
          <div className='bg-red-700 rounded-full w-[50px] h-[50px] md:w-[50px] md:h-[50px] flex items-center justify-center'>
            <ImBin size={28} color='red' className='w-[20px] md:w-[30px]'/>
          </div>
          <div className='flex flex-col gap-3 items-start'>
            <h1 className='text-md font-semibold'>Delete Account</h1>
            <div className='text-richblack-50'>
              <p>Would you like to delete your account ? </p>
              <p>This account may contain paid courses. Deleting your account is permanent and remove all the content associated with it.</p>
            </div>

            <button className='flex items-start justify-start border border-yellow-50 bg-yellow-50
              cursor-pointer gap-x-2 rounded-md py-2 px-4 font-semibold text-richblack-900' onClick={deleteHandler}>
              Delete account
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
