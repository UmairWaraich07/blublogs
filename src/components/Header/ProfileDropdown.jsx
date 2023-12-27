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
        <ProfileIcon className="w-[28px] h-[28px] fill-dark dark:fill-light" />
      </div>
      {isOpen && (
        <div
          className="absolute top-[72px] right-10 py-5 px-4 space-y-3 bg-light/80 backdrop-blur-sm
         border border-dark shadow-xl rounded-lg z-10"
        >
          <Link
            to={`/profile/${userData.$id}`}
            className="cursor-pointer flex items-center justify-start gap-2 text-dark font-medium"
          >
            <PersonIcon className="w-5 h-5 text-dark" />
            Profile
          </Link>

          <button
            className="cursor-pointer flex items-center justify-start gap-2 text-dark font-medium"
            onClick={signout}
          >
            <ExitIcon className="w-5 h-5 text-dark" />
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
