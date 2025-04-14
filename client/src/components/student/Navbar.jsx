import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-black py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 shadow-md z-50">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={assets.logo} alt="Logo" className="w-14 lg:w-16 hover:rotate-6 transition duration-300" />
        <p className="text-2xl lg:text-3xl font-bold text-white tracking-wide">TutorSync</p>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="hover:underline underline-offset-4 transition duration-200"
            > 
              {isEducator ? "Tutor Dashboard" : "Become a Tutor"}
            </button> |
            <Link to="/my-enrollments" className="hover:underline underline-offset-4 transition">
              My Enrollments
            </Link> |
            <Link to="/about" className="hover:underline underline-offset-4 transition">
              About Us
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Create an Account
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-3 text-white text-xs">
        <div className="flex flex-col items-end space-y-1">
          {user && (
            <>
              <button onClick={becomeEducator} className="hover:text-orange-200">
                {isEducator ? "Dashboard" : "Be a Tutor"}
              </button>
              <Link to="/my-enrollments" className="hover:text-orange-200">
                Enrollments
              </Link>
              <Link to="/about" className="hover:text-orange-200">
                About
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="User" className="w-7" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
