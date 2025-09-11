import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!code) {
      toast.error("Authorization code not found");
      navigate("/login");
      return;
    }

    let accountType = "Student";
    try {
      if (state) {
        const decoded = JSON.parse(atob(state));
        if (decoded.accountType) {
          accountType = decoded.accountType;
        }
      }
    } catch (err) {
      console.warn("Failed to decode state param", err);
    }
    async function exchangeCodeForToken() {
      try {
        const response = await axios.post("https://medhavi-project-1.onrender.com/api/v1/auth/google-auth-code", {
          code,
          accountType
        });

        const { user, token } = response.data;

        // Store in Redux
        dispatch(setLogin({ token, user }));
        dispatch(setUser(user));

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Logged in with Google!");
        navigate("/dashboard/my-profile");
      } catch (error) {
        console.error("Google login failed:", error);
        toast.error("Google login failed");
        navigate("/login");
      }
    }

    exchangeCodeForToken();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="text-center mt-20 text-white text-xl">
      Logging you in with Google...
    </div>
  );
}

export default GoogleCallback;
