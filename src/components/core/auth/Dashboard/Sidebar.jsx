import React, { useState } from 'react'
import { sidebarLinks } from '../../../../Data/dashboard-links'
import { logout } from '../../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { ConfirmationModal } from '../../../Common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { IoLogInOutline } from "react-icons/io5";


const Sidebar = () => {
    const {user, loading : profileLoading} = useSelector((state) => state.profile);
    const {loading : authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLogOutModal, setShowLogOutModal] = useState(false)

    if(authLoading || profileLoading){
        return(
            <div className='loader'>
                Loading....
            </div>
        )
    }

    const logoutHandler = () => {
        dispatch(logout(navigate))
    }

    return (
        <div>
            <div className='flex min-w-[222px] flex-col border-r-2 border-r-richblack-700 md:h-[calc(100vh - 3.5rem)] py-10 bg-richblack-800'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) return null;
                            return(
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col mb-4'>
                    <SidebarLink 
                        link={{name : "Settings", path : "/dashboard/settings"}}
                        iconName={"VscSettingsGear"}
                    />
                </div>

                <div className=" gap-2 h-[600px] w-full bg-gray-100 text-richblack-300 ml-7 " >
                    <button onClick={() => setShowLogOutModal(true)} className='flex flex-row gap-2 items-center'>

                    <IoLogInOutline size={20}/>
                    Log out
                    </button>
                </div>

                    
            </div>
            {showLogOutModal && (
          <ConfirmationModal
           text1={"Log out"}
           text2={"Are you sure you want to log out?"}
           btn1text={"Log out"}
           btn2text={"Cancel"}
           btn1Handler={logoutHandler}
           btn2Handler={() => setShowLogOutModal(false)}
          />
        )}
        </div>
    )
}

export default Sidebar
