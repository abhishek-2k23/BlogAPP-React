import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { AuthContext } from "../context/authContext";
import axios from "axios";

//login function
const Login = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(AuthContext);

  //react-hook-form
  const { register, handleSubmit,formState } = useForm();
  const {errors}  = formState;

  const [error, setError]  = useState(null);

  //form submit handler
  async function submitHandler(loginData){
    try{
      const toastId = toast.loading("login in progress...")
      const res =  await axios.post(`${process.env.REACT_APP_BackEndURL}/auth/login`,loginData);
      setCurrentUser(res.data.other);
      //toast
      toast.success("Logged in");
      
      sessionStorage.setItem("loginStatusInfo","true");
      toast.dismiss(toastId);
    //navigate
      navigate("/");
    }catch(error){

      //any error
      console.log(error);
      if(error.response.status === 500){
        setError("server error.");
        toast.error("server error");
      }else{
        setError(error.response.data.message);
        toast.error(error.response.data.message);

      }
    }
  }
  
  return (
    <div className="bg-sky-200 flex flex-col items-center justify-center h-screen gap-2 filter backdrop:blur-md">
      <h1 className="font-bold tracking-wider text-2xl text-green-600 ">
        Login
      </h1>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col bg-white w-52  p-10 box-content items-center justify-center gap-3">
      <div className={`${errors.password && 'mb-2'} relative`}>
        <input
          type="email"
          placeholder="Enter your Email "
          name="email"
          {...register("email", {
            required: { value: true, message: "Email required" },
          })}
          className=" border-b-2 p-2 w-full outline-none"
        />
        <p className="absolute -bottom-4 text-red-500 text-sm">{errors.email?.message}</p>
      </div>
      <div className={`${errors.password && 'mb-2'} relative`}>
        <input
          type="password"
          placeholder="Enter your password "
          name="password"
          {...register("password", {
            required: { value: true, message: "password required" },
          })}
          className="border-b-2 p-2 w-full outline-none"
        />
        
        <p className="absolute -bottom-4 text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      
      <div className={`${ 'mb-3'} relative w-full text-center capitalize`}>
        <input
          type="submit"
          value={"Login"}
          className="bg-green-600 py-2 mt-2 rounded-sm text-white min-w-full  cursor-pointer"
        />
        <p className="absolute -bottom-6 left-7 text-center text-red-500 text-sm">{error}</p>
      </div>
        <span className="text-center">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500 underline ">
            Register
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

export default Login;
