import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const {courseId} = useParams();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async() => {
            setloading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
        }
        setloading(false);

        fetchCourseDetails();
    },[])


  return (
    <div className='text-richblack-25'>
      <h1 className='text-2xl font-semibold text-white mb-10'>Edit Course</h1>

      <div className='md:w-[60%]'>
        {
            course ? (<RenderSteps />) : (<div>No course found</div>)
        }
      </div>
    </div>
  )
}

export default EditCourse
