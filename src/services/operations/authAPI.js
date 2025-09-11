import { toast } from "react-hot-toast"
import { showPasswordResetToast } from "../../toastNotifications"
import { setLoading, setToken, setReset } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  SIGNUP_GOOGLE_API,
  LOGIN_API,
  LOGIN_GOOGLE_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function googleSignup(googleToken, navigate, accountType) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up with Google...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_GOOGLE_API, {
        token: googleToken,
        accountType
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Google signup failed");
      }
      
      dispatch(setToken(token));
      const userImage = user.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      dispatch(setUser({ ...user, image: userImage }));

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...user, image: userImage }));

      toast.success("Signup successful");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error(error?.response?.data?.message || "Google signup failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function login(email, password, navigate) {
  return async (dispatch) => {

    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      toast.error("You are already logged in.");
      navigate("/dashboard/my-profile");
      return;
    }
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      const message = error.response?.data?.message || "Login Failed";
      toast.error(message);
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function googleLogin(googleToken, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing in with Google...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_GOOGLE_API, {
        token: googleToken,
      });
      console.log("Response from google : ",response)
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ ...response.data.user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Google Login Error:", error);
      const message = error?.response?.data?.message || "Google login failed";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      showPasswordResetToast("Congrats!", "Password reset sucessfully");
      dispatch(setReset(true));
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      // toast.error("Unable to reset password");
      showPasswordResetToast("Error!", "Unable to reset password")
    }
    dispatch(setLoading(false));
  }
}