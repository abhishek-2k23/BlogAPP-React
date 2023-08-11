import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import axios from "axios";
const Register = () => {
  const { register, handleSubmit,formState } = useForm();

  const [error, setError] = useState(null);
  const {errors} = formState;

  const navigate = useNavigate();

  async function submitHandler(RegisterData){
    console.log(RegisterData);
    try{
      const res = await axios.post(`${process.env.REACT_APP_BackEndURL}/auth/register`,RegisterData);
      console.log("response",res)
      navigate("/login");
      toast.success("You are registered.");
    }catch(err){
      console.log("error",err);
      setError(err.response.data.message);
    }
  }
  
  return (
    <div className="bg-sky-200 flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="font-bold tracking-wider text-2xl text-green-600 ">
        Register
      </h1>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col bg-white w-52  p-10 box-content items-center justify-center gap-3">
        <div className={`${errors.name && 'mb-2 transition-all duration-500'} relative`}>
        <input
          type="text"
          placeholder="Enter your Name "
          name="name"
          id="Name"
          {...register("name", {
            required: { value: true, message: "Name required" },
          })}
          className=" border-b-2 p-2 w-full outline-none relative"
        />
        <p className="text-red-500 text-sm absolute -bottom-5">{errors.name?.message}</p>
        </div>
        <div className={`${errors.email && 'mb-4 transition-all duration-500'} relative`}>
        <input
          type="email"
          placeholder="Enter your Email "
          name="email"
          {...register("email", {
            required: { value: true, message: "Email required" },
          })}
          className=" border-b-2 p-2 w-full outline-none"
        />
        <p className="text-red-500 text-sm absolute -bottom-5">{errors.email?.message}</p>
        </div>
        <div className={`${errors.password && 'mb-4 transition-all duration-500'} relative`}>
        <input
          type="password"
          placeholder="Enter your password "
          name="password"
          {...register("password", {
            required: { value: true, message: "password required" },
          })}
          className="border-b-2 p-2 w-full outline-none"
        />
        <p className="text-red-500 text-sm absolute -bottom-5">{errors.password?.message}</p>
        </div>
        <div className={` w-full relative `}>
        <input
          type="submit"
          value={"Register"}
          className="bg-green-600 py-2 mt-2 rounded-sm text-white min-w-full  cursor-pointer"
        />
        <p className="text-red-500 -bottom-4 text-center text-sm">{error}</p>
        </div>
        <span className="text-center">
          you have an account?{" "}
          <NavLink to="/login" className="text-blue-500 underline ">
            Login
          </NavLink>
        </span>
        <span className="text-center">
          <NavLink to="/" className="text-blue-500 underline ">
            Home
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default Register;
