import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../Data/navbar-links";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import file from "../../assets/Logo/Medhavi.mp4"
import logo3 from "../../assets/Logo/logo3.png"
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import Button from "../home/Button";
import { FaArrowRight } from "react-icons/fa6";
import ProfileDropDown from "../home/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { matchPath } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import SidebarModal from "./SidebarModal";
import homebg from "../../assets/Images/homebg.png"
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebarModal] = useState(null);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing sub links data : ", result.data.data);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Error in fetching category");
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);
  useEffect(() => {
    console.log("Token from Redux:", token);
    console.log("Type of token:", typeof token);
  }, [token]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  console.log("User:", user);
console.log("Account Type:", user?.accountType);
console.log("Is Authenticated:", isAuthenticated);

  return (
    <div className="flex h-20 items-center justify-center bg-richblack-900 text-white" >
      <div className="w-11/12 max-w-maxContent flex items-center justify-between absolute sm:ml-3">
          <Link className="flex items-center gap-3 text-2xl font-bold" to={"/"}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg animate-pulse">
              💡
            </div>
            <span>Medhavi</span>
          </Link>


        <nav className="hidden md:block ">
          <ul className="hidden md:flex gap-10 text-white list-none">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  
                    token != null && isAuthenticated && (
                      <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-5"
                      } transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          <>
                            {subLinks
                              //   ?.filter(
                              //     (subLink) => subLink?.courses?.length > 0
                              //   )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                    )
                  
                  
                ) : (
                  <Link to={link?.path}>
                    <p
                      className="relative transition-colors duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-2 md:gap-x-5 items-center">
          {user && isAuthenticated &&  user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <FaShoppingCart className="text-richblack-400" size={22} />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="hidden md:block">
              <Link
                className="btn-signup bg-white bg-opacity-10 border border-white border-opacity-30 text-[#e6e7ee] rounded-full px-6 py-2.5 font-semibold text-base hover:-translate-y-[2px] hover:bg-opacity-30 transition-all duration-300" to={"/login"}
              >

                  Log in
              
              </Link>

            </div>
          )}
          {token === null && (
            <div className="hidden md:block">
              <Link
                className="btn-signup bg-gradient-to-br from-cyan-400 to-green-400 text-[#0a0e27] rounded-full px-6 py-2.5 font-semibold text-base hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(0,212,255,0.4)] transition-transform duration-300" to={"/signup"}
              >

                  Sign Up
              
              </Link>

            </div>
          )}
          
          
          {user && isAuthenticated && <ProfileDropDown />}
          <div className="background md:hidden">
            <button className="menu__icon" onClick={() => setSidebarModal(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      {sidebar && <SidebarModal setSidebarModal={setSidebarModal}/>}
    </div>
  );
};

export default Navbar;
