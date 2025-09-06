import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/catalogAPI';
import CourseSlider from '../components/core/auth/Catalog/CourseSlider';
import Course_Card from '../components/core/auth/Catalog/Course_Card';
import Footer from '../components/Common/Footer';


const Catalog = () => {

    const {loading} = useSelector((state) => state.profile);
    const [catalogPageData, setCatalogPageData] = useState([]);
    const {catalogName} = useParams();
    const [categoryId, setCategoryId] = useState([]);

    const [loadingCategories, setLoadingCategories] = useState(false);
const [loadingDetails, setLoadingDetails] = useState(false);

useEffect(() => {
  const getCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("category res : ", res);
      const category_id = res?.data?.data?.filter(
        (ct) =>
          ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]?._id;
      setCategoryId(category_id);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };
  getCategories();
}, [catalogName]);

useEffect(() => {
  if (!categoryId || categoryId.length !== 24) {
    console.log("❌ Skipping fetch — invalid categoryId:", categoryId);
    return;
  }
  const getCategoryDetails = async () => {
    setLoadingDetails(true);
    try {
        if(categoryId){
      const res = await getCatalogaPageData(categoryId);
      console.log("Printing res: ", res);
      setCatalogPageData(res);
        }
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };
  if(categoryId){
      getCategoryDetails(); 
  }
}, [categoryId]);


  return (
    <>
      <div className='text-white'>
        <div className='gap-5 bg-richblack-700 mb-12'> 
            <div className='flex flex-col w-11/12 max-w-maxContent px-[100px] py-[70px] justify-around gap-8'>
                <p>Home / Catalog / <span className='text-yellow-200'>{catalogPageData?.data?.selectedCategory?.name}</span></p>

                <p className='text-2xl font-semibold'>{catalogPageData?.data?.selectedCategory?.name}</p>
                <p>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>

        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className='flex flex-col gap-4'>
                <p className='text-2xl font-semibold'>Courses to get you started</p>
                <div className='flex gap-x-3 border-b-2 border-b-richblack-500 gap-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                    <p>Trending</p>
                </div>
                <div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>
        </div>

        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div>
                <p className='text-2xl font-semibold'>Top courses in <span className='text-pink-400'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            </div>
            <div>
                <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
            </div>
        </div>

        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <p className='text-2xl font-semibold '>Frequently Bought</p>
            <div className='border w-[50%] '></div>
            <div className='w-[80%]  mt-5'>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[300px]"} Width={"w-[100px]"} />
                  ))}
              </div>
            </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Catalog
