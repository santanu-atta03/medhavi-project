import React from 'react'

const InputBar = ({type,heading,value,name,id,onchange}) => {
  return (
    <div>
        <div className='w-[45%] '>
            <label>
                <h1>{heading}</h1>
                
                <input type={type} value={value}
                name={name}
                id={id}
                onChange={onchange}
                
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5 mt-2"
                />
            </label>
        </div>
    </div>
  )
}

export default InputBar
