import { apiConnector } from "../apiconnector"
import { contactusEndpoint } from "../apis"
import { toast } from "react-hot-toast"
const {
    CONTACT_US_API
} = contactusEndpoint


export function contactus(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", CONTACT_US_API, formData, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // if you're sending JSON
            })

            if (!response?.data?.success) {
                throw new Error(response.data?.message || "Unknown error")
            }

            toast.success("Message sent successfully!")
            console.log("CONTACT_US_API RESPONSE:", response.data)
        }catch(err){
            console.log("CONTACT_US_API API ERROR............", err.message)
            toast.error("Could Not send mail")
        }
        toast.dismiss(toastId);
    }
}