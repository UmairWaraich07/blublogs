import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileIcon } from "../Icons";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <div className="flex flex-col gap-1 bg-[#fffefe] shadow-md  absolute top-16 right-8 rounded-lg py-3">
          <Link to="/profile/123" className="hover:bg-[#f5f5f5] px-4">
            View Profile
          </Link>
          <button className="hover:bg-[#f5f5f5] px-4 " onClick={signout}>
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
