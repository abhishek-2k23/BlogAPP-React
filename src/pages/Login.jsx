import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import pic from "../assets/pic.jpg";

//login function
const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  //for cookies
  const [cookies, setCookies] = useCookies(["userCookies"]);

  //react-hook-form
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [error, setError] = useState(null);

  //form submit handler
  async function submitHandler(loginData) {
    let toastId;
    try {
      toastId = toast.loading("login in progress...");
      const res = await axios.post(
        `${process.env.REACT_APP_BackEndURL}/auth/login`,
        loginData
      );

      //set current user on the localstorage
      setCurrentUser(res.data.other);

      //set cookies
      cookies.name = "userCookie";
      setCookies("userCookie", res.data.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
      });

      //toast
      toast.success("Logged in");

      sessionStorage.setItem("loginStatusInfo", "true");
      toast.dismiss(toastId);
      //navigate
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      //any error
      console.log(error);
      if (error.response.status === 500) {
        setError("server error.");
        toast.error("server error");
      } else {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-2 filter backdrop:blur-md forLogin">
      <div className="containerforLogin w-auto lg:px-10 md:px-3 h-auto py-5 border border-gray-50-50 flex rounded-lg flex-col justify-center ">
          <h1 className="font-bold tracking-wider text-2xl text-gray-50 font-serif  shadow-md text-center mb-5">
            Login Here
          </h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col items-center  gap-3"
          >
            <div className={`${errors.password && "mb-2"} relative ` }>
              <label htmlFor="email" className="text-gray-50">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email "
                name="email"
                {...register("email", {
                  required: { value: true, message: "Email required" },
                })}
                className="border-b-2 p-3 w-full outline-none"
              />
              <p className="absolute -bottom-4 text-red-500 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div className={`${errors.password && "mb-2"} relative `}>
              <label htmlFor="password" className="text-gray-50">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password "
                name="password"
                {...register("password", {
                  required: { value: true, message: "password required" },
                })}
                className="border-b-2 p-1 w-full outline-none"
              />

              <p className="absolute -bottom-4 text-red-500 text-sm">
                {errors.password?.message}
              </p>
            </div>

            <div className={`${"mb-3"} relative w-full text-center capitalize tracking-wider`}>
              <input
                type="submit"
                value={"Login"}
                className="bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500 font-bold tracking-widest text-lg font-mono py-2 mt-2 rounded-sm text-white px-12 cursor-pointer"
              />
              <p className="absolute -bottom-6 left-7 text-center text-red-500 text-sm">
                {error}
              </p>
            </div>
            <div className="flex justify-between gap-3">

            <span className="bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500 font-bold tracking-widest text-lg font-mono py-2 mt-2 rounded-sm text-white px-12 cursor-pointer">
              <NavLink to="/register" className="text-gray-300 hover:text-green-400">
                Register
              </NavLink>
            </span>
            <span className="bg-green-500 hover:bg-white hover:text-green-500 text-green-400 hover:border-green-500 font-bold tracking-widest text-lg font-mono py-2 mt-2 rounded-sm px-12 cursor-pointer">
              <NavLink to="/" className="text-gray-300 hover:text-green-500">
                Home
              </NavLink>
            </span>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;
