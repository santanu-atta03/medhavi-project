import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { RxCross2 } from "react-icons/rx"
import VideoDetailsSidebar from "./VideoSidebar"
import Sidebar from "../Dashboard/Sidebar"

export default function SidebarWithHamburger() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      {/* Hamburger Button (Visible on small screens) */}
<button className="group relative inline-block w-[20px] p-[5px] h-[40px] m-[25px] md:hidden " onClick={toggleSidebar}>
  <span
    className="mx-[auto] my-[0] relative top-[12px] w-[20px] h-[3px] bg-[#c73d13] block [transition-property:margin,_width] group-hover:w-[20px] duration-200 after:absolute after:content-[''] after:mt-[12px] after:w-[30px] after:h-[3px] after:bg-[#0d7750] after:block after:left-[0] after:[transition-property:margin,_left] after:duration-200 group-hover:after:mt-[6px] group-hover:after:-left-[5px] before:absolute before:content-[''] before:-mt-[12px] before:w-[30px] before:h-[3px] before:bg-[#3c1e9f] before:block before:left-[0] before:[transition-property:margin,_width,_left] before:duration-200 group-hover:before:-mt-[6px] group-hover:before:w-[10px] group-hover:before:left-[5px]"
  ></span>
</button>



      {/* Sidebar Overlay (Only when open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black bg-opacity-40 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar Slide-in */}
      <div
        className={`fixed top-0 left-0 z-[1002] h-full w-[80%] max-w-[220px] transform bg-richblack-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button for mobile */}
        <div className="flex items-center justify-end p-4 md:hidden">
          <button
            onClick={closeSidebar}
            className="text-white"
            aria-label="Close Sidebar"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* The actual sidebar content */}
        <Sidebar />
      </div>
    </>
  )
}
