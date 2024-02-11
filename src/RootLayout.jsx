import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "./store/themeSlice";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Loader } from "./Icons";
import { Logo } from "./components";

const RootLayout = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("theme")) || "light";
    console.log(mode);
    if (mode === "light") {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
      console.log("dispatched dark mode");
    }
  }, [dispatch]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) =>
        console.log(`Error while getting currentUser :: RootLayout :: ${error}`)
      )
      .finally(() => setLoader(false));
  }, [dispatch]);
  return !loader ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <div className="h-screen grid place-content-center relative">
      <div className="flex items-center justify-center">
        <Loader
          className={`fill-dark text-dark  dark:fill-light dark:text-light`}
          width={100}
          height={100}
        />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
