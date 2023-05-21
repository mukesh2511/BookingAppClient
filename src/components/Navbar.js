import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="navbar h-12 bg-[#003580] flex justify-center ">
        <div className="navContainer px-4 lg:px-0 flex items-center w-full max-w-5xl text-white justify-between">
          <Link to="/">
            <span className="logo font-bold text-2xl">myBooking</span>
          </Link>
          {user ? (
            <div className="navItems">
              <button className="navButton  bg-white text-[#febb02]  ml-5 py-1 px-2 rounded-[50%] cursor-pointer font-bold text-center">
                {user.username.charAt(0).toUpperCase()}
              </button>
              <button
                className="navButton bg-white text-[#003580]  ml-5  py-1 px-2 rounded-sm cursor-pointer"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navItems">
              <button
                className="navButton  bg-white text-[#003580]  ml-5 py-1 px-2 rounded-sm cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="navButton bg-white text-[#003580]  ml-5  py-1 px-2 rounded-sm cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
