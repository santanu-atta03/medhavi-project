import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import VerifyEmail from "./components/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/auth/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/auth/Dashboard/Settings";
import YourCart from "./components/core/auth/Dashboard/YourCart";
import { useDispatch, useSelector } from "react-redux";
import { profileEndpoints } from "./services/apis";
import { apiConnector } from "./services/apiconnector";
const { GET_USER_DETAILS_API } = profileEndpoints;
import { setUser } from "./slices/profileSlice";
import EnrolledCourses from "./components/core/auth/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/auth/Dashboard/AddCourse";
import MyCourses from "./components/core/auth/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/auth/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/auth/ViewCourse/VideoDetails";
import Cart from "./components/core/auth/Dashboard/Cart";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Instructor from "./components/core/auth/InstructorDasboard/Instructor";
import Error from "./components/Common/Error";
import ViewCourse from "./pages/View_Course";
import PYQ from "./pages/PYQ";
import MakautPyq from "./components/home/Makaut/MakautPyq";
import PyqList from "./components/home/PYQ/PyqList";
import { setLogin } from "./slices/authSlice";
import GoogleCallback from "./pages/GoogleCallback";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.profile);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await apiConnector(
  //         "GET",
  //         GET_USER_DETAILS_API,
  //         null,
  //         {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         }
  //       );

  //       if (response.data.success) {
  //         dispatch(setUser(response.data.data)); // update Redux with user info
  //       } else {
  //         console.error("Failed to fetch user profile:", response.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error.message);
  //     }
  //   };

  //   if (token) {
  //     fetchUserProfile();
  //   }
  // }, [token, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setLogin({
        token,
        user: JSON.parse(user),
      }));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home setAccountType={setAccountType}/>} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/signup" element={<SignUp accountType={accountType} setAccountType={setAccountType}/>} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/pyq" element={<PYQ />}/>
        <Route path="/pyq/makaut" element={<MakautPyq /> } />
        <Route path="/pyq/makaut/:dept" element={<PyqList />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="update-password/:id"
          element={
            // <OpenRoute>
            <UpdatePassword />
            // </OpenRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route
            path="dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/instructor" element={<Instructor />} />
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          <Route
            path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
