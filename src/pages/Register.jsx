import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const { register, handleSubmit, formState } = useForm();

  const [error, setError] = useState(null);
  const { errors } = formState;

  const navigate = useNavigate();

  async function submitHandler(RegisterData) {
    console.log(RegisterData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BackEndURL}/auth/register`,
        RegisterData
      );
      console.log("response", res);
      navigate("/login");
      toast.success("You are registered.");
    } catch (err) {
      console.log("error", err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-2 filter backdrop:blur-md forLogin">
      <div className="containerforLogin sm:w-5/12 md:w-4/12 lg:w-3/12 px-3 w-auto h-auto py-5 border border-gray-50-50 flex rounded-lg flex-col justify-center">
        <h1 className="font-bold tracking-wider text-2xl text-gray-50 font-serif  shadow-md text-center mb-5">
          Register
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col items-center  gap-3"
        >
          <div
            className={`${
              errors.name && "mb-2 transition-all duration-500"
            } relative`}
          >
            <label htmlFor="name" className="text-gray-50">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name "
              name="name"
              id="Name"
              {...register("name", {
                required: { value: true, message: "Name required" },
              })}
              className="border-b-2 p-1 w-full outline-none text-green-400 bg-[rgba(255,255,255,0.1)]"
            />
            <p className="text-red-500 text-sm absolute -bottom-5">
              {errors.name?.message}
            </p>
          </div>
          <div
            className={`${
              errors.email && "mb-4 transition-all duration-500"
            } relative`}
          >
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
              className="border-b-2 p-1 w-full outline-none text-green-400 bg-[rgba(255,255,255,0.1)]"
            />
            <p className="text-red-500 text-sm absolute -bottom-5">
              {errors.email?.message}
            </p>
          </div>
          <div
            className={`${
              errors.password && "mb-4 transition-all duration-500"
            } relative`}
          >
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
              className="border-b-2 p-1 w-full outline-none text-green-400 bg-[rgba(255,255,255,0.1)]"
            />
            <p className="text-red-500 text-sm absolute -bottom-5">
              {errors.password?.message}
            </p>
          </div>
          <div
            className={`${"mb-3"} relative w-full text-center capitalize tracking-wider flex justify-center`}
          >
            <input
              type="submit"
              value={"Register"}
              className="bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500 font-bold tracking-widest text-lg font-mono py-2 mt-2 rounded-sm text-white px-12 cursor-pointer"
            />
            <p className="absolute -bottom-6 left-7 text-center text-red-500 text-sm">
              {error}
            </p>
          </div>

          <div className="flex justify-center gap-3 hover:text-green-400  text-white">
            <div className=" mb-3 md:mb-0">
              <button
                className="text-center py-2.5 px-8 rounded-md bg-green-500 hover:bg-white  hover:text-green-500"
                onClick={() => navigate(`/login`)}
              >
                Login
              </button>
            </div>
            <div className=" mb-3 md:mb-0">
              <button
                className="text-center py-2.5 px-8 rounded-md bg-green-500 hover:bg-white  hover:text-green-500"
                onClick={() => navigate(`/`)}
              >
                Home
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
