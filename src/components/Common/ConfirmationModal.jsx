// ConfirmationModal.jsx
import React from "react"
import { CButton } from "@coreui/react"
import { IoWarningOutline } from "react-icons/io5"

export const ConfirmationModal = ({
  text1,
  text2,
  desc,
  btn1text,
  btn2text,
  btn1Handler,
  btn2Handler,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg">
        <div className="p-4 bg-red-600 text-white rounded-t-lg flex flex-col items-center gap-3">
          <IoWarningOutline size={28} />
          <h3 className="text-lg font-semibold">{text2}</h3>
        </div>
        {desc && (
          <div className="p-4 text-richblack-800 text-sm">{desc}</div>
        )}
        <div className="flex justify-end gap-2 p-4 border-t">
          <CButton
            color="secondary"
            onClick={btn2Handler}
            className="bg-caribbeangreen-200 text-richblack-900 rounded-lg px-2 py-1"
          >
            {btn2text}
          </CButton>
          <CButton
            color="danger"
            onClick={btn1Handler}
            className="bg-red-800 text-white rounded-lg px-3 py-1"
          >
            {btn1text}
          </CButton>
        </div>
      </div>
    </div>
  )
}
