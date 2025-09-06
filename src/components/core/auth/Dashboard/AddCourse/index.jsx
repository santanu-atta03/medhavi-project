import { PiShootingStarLight } from "react-icons/pi";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    return(
        <div className="text-richblack-5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="md:w-[70%]">
                    <h1 className="text-2xl font-semibold mb-6">Add Course</h1>
                    <div className="">
                        <RenderSteps />
                    </div>
                </div>
                <div className="flex flex-col gap-3 bg-richblack-700 md:h-[410px] p-8 rounded-md md:w-[400px]">
                    <div className="flex items-center gap-2 text-2xl font-semibold">
                        <PiShootingStarLight className="text-yellow-25"/>
                        Code Upload tips
                    </div>
                    <div className="text-sm ">
                        <ul className="list-disc flex flex-col gap-2 items-start">
                            <li>Set the Course Price option or make it free.</li>
                            <li>Standard size for the course thumbnail is 1024x576.</li>
                            <li>Video section controls the course overview video.</li>
                            <li>Course Builder is where you create & organize a course.</li>
                            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                            <li>Information from the Additional Data section shows up on the course single page.</li>
                            <li>Make Announcements to notify any important</li>
                            <li>Notes to all enrolled students at once.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}