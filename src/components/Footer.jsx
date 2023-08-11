import React from 'react'
import logo from "../assets/logo.png";
import 'react-quill/dist/quill.snow.css';
const Footer = () => {
  return (
    <div className='flex justify-center items-center mt-10 mb-1 z-30'>
        <div className='lg:w-10/12 w-full flex justify-between items-center bg-green-300 pr-5'>
        <div className="logo md:w-24 w-20">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <p className='text-sm'>Made with <span className='text-red-500'>♥</span>  By <span className='underline text-base text-green-950 font-mono'>Abhishek</span> </p>
        </div>
        </div>
    </div>
  )
}

export default Footer;