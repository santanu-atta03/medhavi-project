import { dimensionValueTypes } from 'motion/react'
import React from 'react'
import { useSelector } from 'react-redux'
// import {Cart} from "../../../core/auth/Dashboard/Cart/index"
const YourCart = () => {
    const {totalItems} = useSelector((state) => state.cart)


    return (
        <>
            <h1 className='text-2xl font-semibold mb-10 text-richblack-5'>Your Cart</h1>
            {
                totalItems ? ("") : (
                    <div className='text-richblack-200 mt-10 ml-10'>
                        <h1 className='font-md text-md'>Nothing to show in cart</h1>
                    </div>
                )
            }
        </>
    )
}

export default YourCart
