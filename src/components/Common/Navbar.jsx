import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../Data/navbar-links";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
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
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
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

  return (
    <div className="flex h-14 items-center justify-center border-b-2 border-b-richblack-400 bg-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between absolute sm:ml-3">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="" />
        </Link>

        <nav className="hidden md:block ">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  
                    token != null && (
                      <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
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
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
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
          {user && user?.accountType != "Instructor" && (
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
              <Button active={false} linkto={"/login"}>
                <div className="text-richblack-5">Log in</div>
              </Button>
            </div>
          )}
          {token === null && (
            <div className="hidden md:block">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Sign up
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          )}
          
          
          {token && <ProfileDropDown />}
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
