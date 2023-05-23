import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://mybooking-i6bm.onrender.com/api/auth/login",
        credentials
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      <div className="login flex justify-center w-screen h-screen">
        <div className="lContainer flex flex-col justify-center items-center gap-5 w-[60%] lg:w-[25%]">
          <input
            className="outline-0 border border-black  p-4 rounded-sm w-full "
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            autoFocus
          />
          <input
            className="outline-0 border border-black  p-4 rounded-sm w-full"
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="bg-[#003580]   text-white font-bold p-4 border-none w-full rounded-md cursor-pointer"
          >
            Login
          </button>
          {error && (
            <span className="text-red-700 font-bold">{error.message}</span>
          )}
          <p>Don't have an account</p>
          <Link className="text-blue-600 underline" to={"/register"}>
            Register here
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
