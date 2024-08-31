import React, { useContext, useEffect, useRef } from "react"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { HiMenu } from "react-icons/hi"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { setShowSlider } from "../redux/slices/nav.slice"
import PhoneNav from "./PhoneNav"

const Navbar = () => {
  const { logout, loginStatus, setLoginStatus, currentUser, Snav, setSnav } =
    useContext(AuthContext)
  const navRef = useRef()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const showSlider = useSelector((store) => store.nav.showSliderMenu)

  console.log(showSlider)
  useEffect(() => {
    let handler = (e) => {
      if (!navRef.current.contains(e.target)) {
        setSnav(false)
        // console.log(Snav);
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handler)
    }
  }, [setSnav, Snav])

  useEffect(() => {
    if (sessionStorage.getItem("loginStatusInfo") === "true") {
      setLoginStatus(true)
    }
  }, [setLoginStatus])

  return (
    <div className="w-screen flex justify-center px-1 relative ">
      <div className="h-auto lg:w-10/12 sm:w-12/12 w-full flex justify-between items-center m-0 shadow-sm pr-3">
        {/* logo */}
        <div className="logo lg:w-24 w-20  ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* links for  large screens  */}
        <div className="links md:flex hidden justify-center lg:gap-7 gap-4 text-sm capitalize w-1/2 md:w-auto lg:uppercase items-center tracking-wide">
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
              {(currentUser?.name)?.split(" ")[0]}
            </span>
          )}
          {loginStatus && (
            <span
              onClick={() => {
                logout()
                toast.success("logged out")
              }}
              className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer hover:border-gray-300"
            >
              Logout
            </span>
          )}

          {!loginStatus && (
            <span
              onClick={() => {
                navigate("/login")
              }}
              className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer hover:border-gray-300"
            >
              <p className="tracking-wider font-semibold font-mono">Login</p>
            </span>
          )}

          {!loginStatus && (
            <span
              onClick={() => {
                navigate("/register")
              }}
              className="border border-green-400 px-5 py-2 rounded-md hover:bg-green-400  hover:text-white cursor-pointer"
            >
              <p className="tracking-wider font-semibold font-mono">Register</p>
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
        <div
          className={`md:hidden text-3xl text-teal-900`}
          onClick={() => {
            dispatch(setShowSlider(true))
            console.log('onClick', showSlider)
          }}
        >
          <HiMenu></HiMenu>
        </div>

        {/* nav section */}
        <div
          ref={navRef}
          className={`absolute ${showSlider ? 'block' : 'hidden'} md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white p-4 z-50`}
        >
          <PhoneNav />
        </div>
        {/* nav section end */}
        {/* mobile screen end */}
      </div>
    </div>
  )
}

export default Navbar
