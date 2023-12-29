import { Link, NavLink, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { lightMode, darkMode } from "../../store/themeSlice";
import { Button, Logo, MobileNavbar, ProfileDropdown } from "../index";
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
    <header className="w-full flex items-center justify-between py-4 px-10 max-md:px-4 max-w-[1320px] mx-auto">
      <Link to="/">
        <Logo />
      </Link>

      <nav
        className="max-lg:hidden flex items-center justify-center gap-3 px-8 py-3 bg-light/80 backdrop-blur-sm rounded-full border border-dark
      fixed top-6 right-1/2 translate-x-1/2 font-medium capitalize z-50 "
      >
        {navItems.map((item) => (
          <NavLink key={item.url} to={item.url} className=" hover:opacity-75">
            {item.name}
          </NavLink>
        ))}
        <button
          className={`${
            mode === "light" ? "bg-dark" : "bg-light"
          } w-6 h-6 rounded-full flex items-center justify-center p-[2px]`}
          onClick={handleTheme}
        >
          {mode === "light" ? (
            <MoonIcon className="w-6 h-6 text-white" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      <div className="max-lg:hidden flex items-center justify-center gap-4 ">
        {authStatus ? (
          <ProfileDropdown />
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              className="cursor-pointer"
              bgColor="bg-light"
              textColor="text-dark"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="cursor-pointer"
            >
              Register
            </Button>
          </>
        )}
      </div>

      {/* Mobile Navigation Items */}
      <div className="flex items-center gap-6 lg:hidden">
        <button
          className={`${
            mode === "light" ? "bg-dark" : "bg-light"
          } w-6 h-6 rounded-full flex items-center justify-center p-[2px]`}
          onClick={handleTheme}
        >
          {mode === "light" ? (
            <MoonIcon className="w-6 h-6 text-white" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>

        <MobileNavbar authStatus={authStatus} />
      </div>
    </header>
  );
};

export default Header;
