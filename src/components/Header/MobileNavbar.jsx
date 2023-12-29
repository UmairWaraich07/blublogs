/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ProfileIcon } from "../Icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const MobileNavbar = ({ authStatus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const signout = async () => {
    try {
      setIsMenuOpen(false);
      const session = await authService.logoutUser();
      if (session) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(
        `Error while sign out the user :: ProfileDropdown : ${error}`
      );
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <ProfileIcon
        className="w-[28px] h-[28px] fill-dark dark:fill-light cursor-pointer"
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
      />
      {isMenuOpen && (
        <div className="absolute top-10 right-0 pb-4 w-[230px] bg-light/80 backdrop-blur-sm border border-dark shadow-xl rounded-lg z-10">
          {!authStatus && (
            <div className="py-6 px-4 border-b border-dark/20">
              <h2 className="text-sm leading-tight font-bold text-center">
                Get started on Blugblogs
              </h2>
              <div className="flex flex-col gap-3 mt-5">
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-full text-sm bg-dark text-light text-center py-1"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-full text-sm border border-dark bg-transparent text-dark text-center py-1 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )}
          <div className="py-4 px-4">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return `${isActive ? "text-accent font-medium" : "text-dark"}
              block px-2 py-1 hover:bg-gray-100 `;
              }}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/categories/all"
              end
              className={({ isActive }) => {
                return `${isActive ? "text-accent font-medium" : "text-dark"}
              block px-2 py-1 hover:bg-gray-100 `;
              }}
              onClick={closeMenu}
            >
              Categories
            </NavLink>
            <NavLink
              to="/add-post"
              end
              className={({ isActive }) => {
                return `${isActive ? "text-accent font-medium" : "text-dark"}
              block px-2 py-1 hover:bg-gray-100 `;
              }}
              onClick={closeMenu}
            >
              Add Post
            </NavLink>
          </div>

          {authStatus && (
            <div className="border-t border-dark/20  space-y-3">
              <Link
                to={`/profile/${userData.$id}`}
                onClick={closeMenu}
                className="px-4 cursor-pointer flex items-center justify-start gap-2 text-dark font-medium border-b border-dark/20 py-4"
              >
                <PersonIcon className="w-5 h-5 text-dark" />
                Profile
              </Link>
              <button
                onClick={signout}
                className="px-4 cursor-pointer flex items-center justify-start gap-2 text-dark font-medium py-2"
              >
                <ExitIcon className="w-5 h-5 text-dark" />
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
