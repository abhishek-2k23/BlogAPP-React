import React, { useEffect } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedCategory, setShowSlider } from "../redux/slices/nav.slice"
import { IoCloseSharp } from "react-icons/io5"
import { Link, useNavigation } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
import { FaAnglesDown } from "react-icons/fa6"
import toast from "react-hot-toast"

const PhoneNav = () => {
  const { logout, loginStatus, setLoginStatus, currentUser, Snav, setSnav } =
    useContext(AuthContext)
  const sliderMenuRef = useRef(null)
  const dispatch = useDispatch()
  const navStates = useSelector((store) => store.nav)
  const { showSliderMenu, selectedCategory } = navStates
  console.log(showSliderMenu, selectedCategory)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sliderMenuRef.current &&
        !sliderMenuRef.current.contains(event.target)
      ) {
        dispatch(setShowSlider(false))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dispatch])

  return (
    <div>
      {showSliderMenu && (
        <div
          ref={sliderMenuRef}
          className="md:hidden fixed top-0 left-0 w-full h-full bg-teal-950 text-gray-100 p-4 z-50"
        >
          {/* close box  */}
          <div className="flex justify-end ">
            <div
              className="flex justify-center items-center text-gray-800 bg-red-500 w-7 h-7 rounded-full cursor-pointer"
              onClick={() => dispatch(setShowSlider(!showSliderMenu))}
            >
              <IoCloseSharp />
            </div>
          </div>

          {/*user name or login button  */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="block flex-1 text-left px-4 py-2 text-base text-gray-700 bg-green-100 rounded-md hover:bg-gray-100 cursor-pointer font-semibold "
                onClick={() => dispatch(setShowSlider(false))}
              >
                {/* logged in user info  */}
                {(loginStatus) && (
                  <span>Hi,{` ${currentUser?.name?.split(" ")[0]}`}</span>
                )}

                {/* in case of user is not logged in  */}
                {/* login status  */}
                {!loginStatus && (
                  <span >
                    <Link to="/login">
                      <p
                        onClick={() => {
                          setShowSlider(false)
                        }}
                      >
                        Login
                      </p>
                    </Link>
                  </span>
                )}
              </div>

              <div onClick={() => dispatch(setShowSlider(false))}>
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

            {/* category menu  for mobile */}
            <div className="relative">
              <div className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-green-100 space-x-5 w-full">
                Category
                <FaAnglesDown />
              </div>

              {true && (
                <div className="mt-2 w-full pl-1  rounded-md shadow-lg py-2 z-50">
                  {categoryData.map((category) => (
                    <Link
                      to={category?.url}
                      key={category?.name}
                      onClick={() => {
                        dispatch(setShowSlider(false))
                        dispatch(setSelectedCategory(category?.name))
                      }}
                      className={`block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold ${
                        selectedCategory === category?.name
                          ? "bg-green-500 text-white"
                          : "bg-green-50"
                      } mb-2 rounded-lg space-y-2`}
                    >
                      {" "}
                      {category?.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* logout button for logged in user */}
              {loginStatus && currentUser !== undefined&& (
                <button
                  onClick={() => {
                    logout()
                    toast.success("logged out")
                  }}
                  className="mt-4 w-full bg-red-500 flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-50 space-x-5"
                >
                  Logout
                </button>
              )}

              {/* Register button for new users  */}
              {(!loginStatus) && (
                <Link
                  to="/register"
                  onClick={() => {
                    dispatch(setShowSlider(false))
                  }}
                  className="mt-4 w-full bg-blue-500 flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-50 space-x-5"
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const categoryData = [
  {
    name: "Art",
    url: "/?cat=art",
  },
  {
    name: "science",
    url: "/?cat=science",
  },
  {
    name: "technology",
    url: "/?cat=technology",
  },
  {
    name: "cinema",
    url: "/?cat=cinema",
  },
  {
    name: "design",
    url: "/?cat=design",
  },
  {
    name: "food",
    url: "/?cat=food",
  },
]
export default PhoneNav
