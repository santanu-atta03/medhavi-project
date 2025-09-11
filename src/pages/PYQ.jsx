import React from 'react'
import { Link } from 'react-router-dom'
import makaut from "../assets/Images/makaut.png"
const PYQ = () => {
  return (
    <div className='w-11/12 max-w-maxContent flex flex-col mx-auto'>
      <div>
        <h1 className='text-white text-2xl font-semibold text-center mt-10'>Previous Year Question's</h1>



        <div>
            <h1 className='text-white text-2xl font-semibold text-left mt-10 hover:'>Engineering Section</h1>
            <div className='w-[90%] h-[1px] bg-white mt-2'></div>

            <Link to={"/pyq/makaut"}>
              <img src={makaut} alt="" width={290} className='mt-4'/>
            </Link>

        </div>
      </div>
    </div>
  )
}

export default PYQ
