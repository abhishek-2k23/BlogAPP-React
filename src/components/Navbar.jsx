import React, { useContext, useEffect,useRef } from "react";
import logo from "../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import {HiMenu} from "react-icons/hi";
import {toast }from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import { setShowSlider } from "../redux/slices/nav.slice";

const Navbar = () => {
  const {logout,loginStatus, setLoginStatus,currentUser,Snav,setSnav} = useContext(AuthContext);
  const navRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showSlider = useSelector((store) => store.nav.showSlider);

  console.log(showSlider);
  useEffect(() =>{
    let handler = (e) =>{
      if(!navRef.current.contains(e.target)){
        setSnav(false);
        // console.log(Snav);
      }
    }
    document.addEventListener("mousedown",handler);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handler);
    };
  },[setSnav,Snav])

  useEffect(() =>{
    if(sessionStorage.getItem("loginStatusInfo") === "true"){
      setLoginStatus(true);
    }
  },[setLoginStatus])
  
  return (
    <div className="w-screen flex justify-center px-1 relative ">
      <div className="h-auto lg:w-10/12 sm:w-12/12 w-full flex justify-between items-center m-0 shadow-sm pr-3">

        {/* logo */}
        <div className="logo lg:w-24 w-20  "> 
          <Link to="/">
          <img src={logo} alt="logo" /></Link>
        </div>

        {/* links for  large screens  */}
        <div className="links md:flex hidden justify-center lg:gap-7 gap-4 text-sm capitalize w-1/2 md:w-auto lg:uppercase items-center tracking-wide" >
          <Link to="/?cat=art">
            <p>ART</p>
          </Link>
          <Link to="/?cat=science">
            <p>science</p>
          </Link>
          <Link to="/?cat=technology">
            <p>Technology</p>
          </Link>
          <Link to="/?cat=cinema">
            <p>Cinema</p>
          </Link>
          <Link to="/?cat=design">
            <p>Design</p>
          </Link>
          <Link to="/?cat=food">
            <p>Food</p>
          </Link>
        </div>

        {/*  menu  for large screens */}
        <div className="md:flex hidden gap-4 justify-center normal-case items-center">
          {loginStatus && (
            <span className="font-medium tracking-wider font-mono">
              {(currentUser?.name).split(" ")[0]}
            </span>
          )}
          {loginStatus && (
            <span onClick={() =>{logout();
              toast.success("logged out");}} className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer hover:border-gray-300">
                Logout
            </span>
          )}
          
          {!loginStatus && (
            <span onClick={() => {navigate("/login")}} className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer hover:border-gray-300">
              
                <p className="tracking-wider font-semibold font-mono">
                  Login
                </p>
            </span>
          )}

          {!loginStatus && (
            <span onClick={() => {navigate("/register")}} className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer">
                <p className="tracking-wider font-semibold font-mono">
                  Register
                </p>
            </span>
          )}

{(!loginStatus || loginStatus) && (
            <span>
              <Link to="/write">
                {" "}
                <p className="w-10 h-10 text-sm flex items-center justify-center rounded-full bg-green-300 hover:bg-white hover:text-green-700 hover:border hover:border-green-500">
                  write
                </p>
              </Link>
            </span>
          )}
        </div>
        {/* large screen end */}

        {/* for mobile screens  */}
        <div className={`md:hidden ${Snav && 'hidden '} text-3xl text-teal-900`} onClick={() => {setSnav((prev) => !prev); dispatch(setShowSlider(true))}}  >
          <HiMenu></HiMenu>
        </div>

        {/* nav section */} 
          <div className={`${Snav ? "absolute md:hidden bg-teal-800 max-w-1/4 min-w-1/2 w-1/2 min-h-screen h-full right-0 top-0 transition-all duration-1000 z-20" : " absolute -right-40 transition-all duration-1000 ease"} text-white flex flex-col nav-container`} ref = {navRef}>
          

          <div className="links text-white flex flex-col w-full  items-start lg:gap-7 md:gap-3 md:w-auto capitalize p-2 gap-5 " >
            
            <div className="flex justify-between min-w-full items-center">
              <div>
                  {
                    loginStatus && <span>Hi,{` ${(currentUser?.name).split(" ")[0]}`}</span>
                  }

                  {/* login status  */}
                  {!loginStatus && (
                    <span>
                      <Link to="/login">
                        <p
                          onClick={() => {
                            setLoginStatus(true);
                          }}
                        >
                          Login
                        </p>
                      </Link>
                    </span>
                  )}
              </div>

              {/* blog write button  */}
              <div>
              <span>
              <Link to="/write">
                {" "}
                <h1 className="text-black w-10 h-10 text-sm flex items-center justify-center rounded-full bg-green-300 hover:bg-white hover:text-green-700 hover:border hover:border-green-500">
                  write
                </h1>
              </Link>
            </span>
              </div>
            </div>

            {/* category buttons  */}
          <Link to="/?cat=art">
            <p>Art</p>
          </Link>
          <Link to="/?cat=science">
            <p>science</p>
          </Link>
          <Link to="/?cat=technology">
            <p>Technology</p>
          </Link>
          <Link to="/?cat=cinema">
            <p>Cinema</p>
          </Link>
          <Link to="/?cat=design">
            <p>Design</p>
          </Link>
          <Link to="/?cat=food">
            <p>Food</p>
          </Link>
          {loginStatus && (
            <span onClick={() => {logout();toast.success("logged out");}}>
              <Link to="/login">
                Logout
              </Link>
            </span>
          )}
          
          

          {!loginStatus && (
            <span className="">
              <Link to="/register">Register</Link>
            </span>
          )}
        </div>
          
          </div>
        {/* nav section end */}
        {/* mobile screen end */}
      </div>
    </div>
  );
};

export default Navbar;
