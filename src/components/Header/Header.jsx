import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { MoonIcon, SunIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { lightMode, darkMode } from "../../store/themeSlice";
import ProfileDropdown from "./ProfileDropdown";
import Button from "../Button";
import { navItems } from "../../constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.themeMode);
  const authStatus = useSelector((state) => state.auth.authStatus);

  const handleTheme = () => {
    if (mode === "light") {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  };
  return (
    <header className="w-full flex items-center justify-between p-4 px-10 ">
      <Link to="/">
        <Logo />
      </Link>

      <nav
        className="flex items-center justify-center gap-2 px-8 py-3 bg-light/80 backdrop-blur-sm rounded-full border border-dark
      fixed top-6 right-1/2 translate-x-1/2 font-medium capitalize "
      >
        {navItems.map((item) => (
          <NavLink key={item.url} to={item.url} className="hover:opacity-75">
            {item.name}
          </NavLink>
        ))}
        <button
          className={`${
            mode === "light" ? "bg-dark" : "bg-light"
          } w-6 h-6 rounded-full flex items-center justify-center`}
          onClick={handleTheme}
        >
          {mode === "light" ? (
            <MoonIcon className="w-4 h-4 text-white" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      <div className="flex items-center justify-center gap-4 ">
        {authStatus ? (
          <ProfileDropdown />
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              className="cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="cursor-pointer"
              bgColor="bg-dark"
              textColor="text-light"
            >
              Register
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
