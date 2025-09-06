// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { RxCross2 } from "react-icons/rx";
// import ReactStars from "react-rating-stars-component";
// import { useSelector } from "react-redux";
// import IconBtn from "./IconBtn";
// import { Link, matchPath } from "react-router-dom";
// import { NavbarLinks } from "../../Data/navbar-links";
// import { apiConnector } from "../../services/apiconnector";
// import { BsChevronDown } from "react-icons/bs";
// import { categories } from "../../services/apis";

// export default function SidebarModal({ setSidebarModal }) {
//   const { user } = useSelector((state) => state.profile);
//   const { courseEntireData } = useSelector((state) => state.viewCourse);
//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { token } = useSelector((state) => state.auth);
//   const [slideIn, setSlideIn] = useState(false);

//   const fetchSubLinks = async () => {
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API);
//       console.log("Printing sub links data : ", result.data.data);
//       setSubLinks(result.data.data);
//     } catch (error) {
//       console.log("Error in fetching category");
//       console.log(error.message);
//     }
//   };
//   useEffect(() => {
//     if(token){

//         fetchSubLinks();
//     }
//     setSlideIn(true)
//   }, []);

//   useEffect(() => {
//     console.log("Token from Redux:", token);
//     console.log("Type of token:", typeof token);
//   }, [token]);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   const handleClose = () => {
//     setSlideIn(false);
//     setTimeout(() => setSidebarModal(null), 300); // Match animation duration
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[1000] bg-richblack-500 bg-opacity-10 "
//       onClick={handleClose}
//     >
//       <div
//         className={`absolute rounded-lg right-0 top-14 h-[50%] w-[50%] max-w-[500px] transform bg-richblack-800 bg-opacity-90 shadow-lg transition-transform duration-500 ease-in-out ${
//           slideIn ? "translate-x-0" : "translate-x-full"
//         }`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Body */}
//         <div className="p-6 overflow-auto  text-richblack-5">
//           <div className="flex flex-col items-center gap-x-4 mb-6">
//             <Link to={"/login"}>Log in</Link>
//             <Link to={"/signup"}>Sign up</Link>
//             <div className="h-[1px] w-[90%] bg-caribbeangreen-300 mt-4"></div>
//           </div>

//           <div>
//             <ul className="flex flex-col mx-auto text-richblack-25">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     token != null && (
//                       <>
//                         <div
//                           className={`flex cursor-pointer items-center gap-1 ${
//                             matchRoute("/catalog/:catalogName")
//                               ? "text-yellow-25"
//                               : "text-richblack-25"
//                           }`}
//                         >
//                           <p>{link.title}</p>
//                           <BsChevronDown />
//                           <div className="flex flex-col">
                            
//                             {loading ? (
//                               <p className="text-center">Loading...</p>
//                             ) : subLinks && subLinks.length ? (
//                               <>
//                                 {subLinks
//                                   //   ?.filter(
//                                   //     (subLink) => subLink?.courses?.length > 0
//                                   //   )
//                                   ?.map((subLink, i) => (
//                                     <Link
//                                       to={`/catalog/${subLink.name
//                                         .split(" ")
//                                         .join("-")
//                                         .toLowerCase()}`}
//                                       className="rounded-lg bg-transparent  hover:bg-richblack-50"
//                                       key={i}
//                                     >
//                                       <p>{subLink.name}</p>
//                                     </Link>
//                                   ))}
//                               </>
//                             ) : (
//                               <p className="text-center">No Courses Found</p>
//                             )}
//                           </div>
//                         </div>
//                       </>
//                     )
//                   ) : (
//                     <Link to={link?.path}>
//                       <p
//                         className={`${
//                           matchRoute(link?.path)
//                             ? "text-yellow-25"
//                             : "text-richblack-25"
//                         }`}
//                       >
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../Data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { BsChevronDown } from "react-icons/bs";
import { categories } from "../../services/apis";

export default function SidebarModal({ setSidebarModal }) {
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false); // 👈 Toggle state for Catalog dropdown

  const location = useLocation();

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Error in fetching category", error.message);
    }
  };

  useEffect(() => {
    if (token) fetchSubLinks();
    setSlideIn(true);
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(() => setSidebarModal(null), 300);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-richblack-500 bg-opacity-10 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className={`absolute rounded-lg right-0 top-14 h-[90%] w-[70%] max-w-[500px] transform bg-richblack-800 bg-opacity-90 shadow-lg transition-transform duration-500 ease-in-out ${
          slideIn ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Body */}
        <div className="p-6 overflow-y-auto text-richblack-5">
          {/* Auth Links */}
          {
            token === null && (
                <div className="flex flex-col items-center gap-y-4 mb-6">
            <Link to="/login" onClick={handleClose}>
              <p className="bg-yellow-700 px-8 py-3 text-lg font-lg text-richblack-300 rounded-full hover:bg-yellow-200 hover:text-richblack-600">Log in</p>
            </Link>
            <Link to="/signup" onClick={handleClose}>
            <p className="bg-caribbeangreen-700 px-8 py-3 text-lg font-lg text-richblack-100 rounded-full hover:bg-caribbeangreen-200:text-richblack-600">Sign up</p>
            </Link>
            <div className="h-[1px] w-[90%] bg-caribbeangreen-300 mt-4"></div>
          </div>
            )
          }
          

          {/* Navbar Links */}
          <ul className="flex flex-col gap-4">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  token && (
                    <div>
                      {/* Catalog Header */}
                      <div
                        className={`flex cursor-pointer items-center justify-between rounded px-2 py-2 transition-all ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        onClick={() => setCatalogOpen((prev) => !prev)}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown
                          className={`transform transition-transform duration-300 ${
                            catalogOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>

                      {/* Catalog Dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          catalogOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="flex flex-col gap-2 pl-4 pt-2">
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded hover:bg-richblack-700 px-2 py-1 text-sm text-richblack-25"
                                onClick={handleClose}
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="text-sm pl-2">No Courses Found</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                ) : (
                  <Link to={link?.path} onClick={handleClose}>
                    <p
                      className={`px-2 py-2 rounded hover:bg-richblack-700 transition-all ${
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
        </div>
      </div>
    </div>
  );
}
