import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    city: undefined,
    country: undefined,
  });
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", userInfo);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) =>
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  console.log(userInfo);
  return (
    <>
      <div className="register w-screen flex items-center justify-center ">
        <div className="register_container w-full max-w-5xl flex  justify-center flex-col gap-10 sm:p-5">
          <div className="rTitle mt-5 text-center">
            <h1 className=" font-bold text-4xl ">Register</h1>
          </div>
          <div className="user_Info flex justify-center sm:justify-between items-center  flex-wrap ">
            <div className="uname flex flex-col justify-center gap-2 ">
              <label className="ml-1 text-gray-700 font-semibold">
                Username
              </label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="text"
                placeholder="joe"
                onChange={handleChange}
                id="username"
                required
                autocomplete="off"
                min={3}
              />
            </div>
            <div className="uemail flex flex-col justify-center gap-2">
              <label className="ml-1 text-gray-700 font-semibold">Email</label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="email"
                placeholder="1234@gmail.com"
                onChange={handleChange}
                id="email"
                required
                autocomplete="off"
              />
            </div>
            <div className="uPass flex flex-col justify-center gap-2">
              <label className="ml-1 text-gray-700 font-semibold">
                Password
              </label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="password"
                placeholder="password"
                onChange={handleChange}
                id="password"
                required
                autocomplete="off"
              />
            </div>
          </div>
          <div className="extraInfo flex justify-center sm:justify-between items-center flex-wrap">
            <div className="phone flex flex-col justify-center gap-2">
              <label className="ml-1 text-gray-700 font-semibold">Phone</label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="text"
                placeholder="Phone No"
                onChange={handleChange}
                id="phone"
                required
                autocomplete="off"
                max={10}
                min={10}
              />
            </div>
            <div className="city flex flex-col justify-center gap-2">
              <label className="ml-1 text-gray-700 font-semibold">City</label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="text"
                placeholder="City"
                onChange={handleChange}
                id="city"
                required
                autocomplete="off"
              />
            </div>
            <div className="country flex flex-col justify-center gap-2">
              <label className="ml-1 text-gray-700 font-semibold">
                Country
              </label>
              <input
                className="border-2 outline-none border-slate-300 text-gray-600 p-2 rounded-md w-72"
                type="text"
                placeholder="Country"
                onChange={handleChange}
                id="country"
                required
                autocomplete="off"
              />
            </div>
          </div>
          <div className="btn text-center flex flex-col items-center justify-center gap-3">
            <button
              onClick={handleClick}
              className=" bg-[#003580] text-white font-bold p-3 border-none rounded-md cursor-pointer w-52 "
            >
              Register
            </button>
            <p>Have an account</p>
            <Link className="text-blue-600 underline" to={"/login"}>
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
