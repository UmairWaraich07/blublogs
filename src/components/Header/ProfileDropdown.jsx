import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileIcon } from "../Icons";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Adding event listener when component mounts
    window.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const signout = async () => {
    try {
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
  return (
    <>
      <div
        className="relative inline-block cursor-pointer"
        ref={dropdownRef}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <ProfileIcon className="w-8 h-8 fill-dark dark:fill-light" />
      </div>
      {isOpen && (
        <div
          className="flex flex-col bg-[#ececec] shadow-lg  absolute top-16 right-8 rounded-lg
        text-dark py-3 z-50"
        >
          <Link
            to={`/profile/${userData.$id}`}
            className="hover:bg-[#bbbbbb] px-4 py-2 cursor-pointer flex items-center justify-start gap-2 text-sm font-medium"
          >
            <PersonIcon />
            Visit Profile
          </Link>

          <button
            className="hover:bg-[#bbbbbb]  px-4 py-2 cursor-pointer flex items-center justify-start gap-2 text-sm font-medium"
            onClick={signout}
          >
            <ExitIcon />
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
