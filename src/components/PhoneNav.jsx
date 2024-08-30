import React, {useEffect}from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSlider } from '../redux/slices/nav.slice'
import {IoCloseSharp} from 'react-icons/io5'
import { Link } from 'react-router-dom'

const PhoneNav = () => {
  const sliderMenuRef = useRef(null)
  const dispatch = useDispatch();
  const showSliderMenu = useSelector((store) => store.nav.showSliderMenu)

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
          className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white p-4 z-50"
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

          {/* Team for mobile  */}
          <div className="mt-4 space-y-4">
            <Link
              to="/team"
              className="block w-full text-left px-4 py-2 text-base text-gray-700 bg-white rounded-md hover:bg-gray-100 cursor-pointer font-semibold"
              onClick={() => dispatch(setShowSlider(!showSliderMenu))}
            >
              Team
            </Link>

           

            {/* filter menu  for mobile */}
            <div className="relative" >
              <div
                className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-white space-x-5 w-full"
                
              >
                <button className="font-semibold tracking-wider">
                  category
                </button>
              </div>

              
              {/* //add user  */}
              <button
                onClick={() => dispatch(setAddUser(true))}
                className="mt-4 w-full bg-blue-500 flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-50 space-x-5"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhoneNav