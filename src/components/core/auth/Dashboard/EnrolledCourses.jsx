import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"


const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const getEnrolledCourses = async () => {
        try{
            const res = await getUserEnrolledCourses(token);
            console.log("Enrolled courses : ", res);
            setEnrolledCourses(res);
        }catch(err){
            console.log("Enrolled course fetching problem ", err.message)
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    },[]);


    return (
        <div className='text-richblack-5 h-[calc(100vh-3.5rem)]'>
            <h1 className='text-3xl font-semibold mb-10'>Enrolled Courses</h1>

            {
                !enrolledCourses ? (<div className='flex h-[60vh] justify-center items-center'>
                    <div className='loader'></div>
                </div>) : ( 
                    (
                        <div className=''>
                            <Table className=''>
                                <Thead className=''>
                                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 bg-richblack-700">
                                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                                            Courses
                                        </Th>
                                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                            Duration
                                        </Th>
                                        <Th className="text-left text-sm font-medium uppercase text-richblack-100 mr-4">
                                            Progress
                                        </Th>
                                    </Tr>
                                </Thead>

                                <Tbody className=''>
                                    {enrolledCourses?.length === 0 ? (
                                        <Tr>
                                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                                No courses found
                                                {/* TODO: Need to change this state */}
                                            </Td>
                                        </Tr>
                                        ) : (
                                            enrolledCourses?.map((course, index) => (
                                                <Tr className='flex flex-col md:flex-row justify-between md:gap-x-10 border-2 border-caribbeangreen-400 md:border-b md:border-richblack-800 px-6 md:py-8 py-3 gap-4' key={index} onClick={() => {
                                                navigate(
                                                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                )
                                                }}>
                                                    <Td className='flex flex-1 gap-x-4'>
                                                        <img src={course?.thumbnail} alt="img" className='w-[90px] h-[90px] rounded-lg object-cover'/>

                                                        <div>
                                                            <p>{course?.courseName}</p>
                                                            <p>{course?.courseDescription}</p>
                                                        </div>

                                                    </Td>
                                                    <Td className='text-sm font-medium text-richblack-100 mr-4'>
                                                        <p>{course?.totalDuration}</p>
                                                    </Td>
                                                    {/* <Td className='text-sm font-medium text-richblack-100 '>
                                                        

                                                        <p>Progress {course?.progressPercentage} %</p>
                
                                                        <ProgressBar completed={course?.progressPercentage}
                                                        isLabelVisible={false} height='8px' className='overflow-hidden'
                                                        />
                                                    </Td> */}
                                                    <Td className="text-sm font-medium text-richblack-100">
  <p className="mb-1">
    Progress {course?.progressPercentage}%
  </p>

  <div className="w-full bg-richblack-700 rounded-full h-2 overflow-hidden">
    <div
      className="bg-caribbeangreen-600 h-full transition-all duration-300"
      style={{ width: `${course?.progressPercentage}%` }}
    />
  </div>
</Td>

                                                </Tr>
                                            ))
                                    )}
                                </Tbody>
                            </Table>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default EnrolledCourses
