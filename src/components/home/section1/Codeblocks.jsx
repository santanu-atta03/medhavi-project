import React from 'react'
import Button from '../Button'
import {TypeAnimation} from "react-type-animation"
import { FaArrowRight } from "react-icons/fa6";

const Codeblocks = ({heading, subheading, codeblock, btn1, btn2,position, backgroundGradient, codeColor}) => {

  return (
    <div className={`flex ${position} my-20 justify-evenly flex-col lg:gap-3 gap-5`}>
      
        <div className='w-[100%] lg:w-[45%] flex flex-col gap-8'>
            {heading}
            <div className="text-richblack-300 text-base font-bold w-[85%] mt-3">
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <Button active={btn1.active} linkto={btn1.linkto}>
                    <div className="flex items-center gap-2">
                        {btn1.text}
                        <FaArrowRight />
                    </div>
                </Button>
                <Button active={btn2.active} linkto={btn2.linkto}>
                    <div className="flex items-center gap-2">
                        {btn2.text}
                        <FaArrowRight />
                    </div>
                </Button>
            </div>
      </div>

      <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] blur-border will-change-transform  transition-transform duration-500 hover:scale-105' >
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 `}>
            <TypeAnimation 
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
            />
        </div>
      </div>
    </div>
  )
}

export default Codeblocks
