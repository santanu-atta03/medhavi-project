import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from "../components/core/auth/Dashboard/Sidebar"
import { Outlet } from 'react-router-dom';
import SidebarWithHamburger from '../components/core/auth/ViewCourse/SidebarWithHamburger';

const Dashboard = () => {

    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className='loader'>
                Loading....
            </div>
        )
    }
    return (
        <div className='relative flex flex-col md:flex-row min-h-[calc(100vh - 3.5rem)]'>
           <SidebarWithHamburger />
            <div className='h-[calc(100vh - 3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
