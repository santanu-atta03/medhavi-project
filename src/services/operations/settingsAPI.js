import { toast } from "react-hot-toast"
import { setLoading, setToken, setReset } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import {logout} from "../../services/operations/authAPI"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function updateDisplayPicture(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            });
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Photo Updated");
            dispatch(setUser(response.data.data));
        }catch(err){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", err.message)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId);
    }
};


export function updateProfile(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT",  UPDATE_PROFILE_API, formData, {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            });
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage = response.data.updatedUserDetails.image
            ? response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))
            toast.success("Profile details Updated");
        }catch(err){
            console.log(err)
            console.log("UPDATE_PROFILE_API API ERROR............", err.message)
            toast.error("Could Not Update profile data")
        }
        toast.dismiss(toastId);
    }
};


export async function updatePassword(token, formData){
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",  CHANGE_PASSWORD_API, formData, {
                Authorization : `Bearer ${token}`
            });
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password updated successfully");
        }catch(err){
            console.log(err)
            console.log("CHANGE_PASSWORD_API API ERROR............", err.message)
            toast.error("Could Not Update password")
        }
        toast.dismiss(toastId);
};


export function deleteProfile(token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE",  DELETE_PROFILE_API, null, {
                Authorization : `Bearer ${token}`
            });
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(logout(navigate));
            toast.success("Profile deleted Successfully");
        }catch(err){
            console.log(err)
            console.log("UPDATE_PROFILE_API API ERROR............", err.message)
            toast.error("Could Not delete profile")
        }
        toast.dismiss(toastId);
    }
};

