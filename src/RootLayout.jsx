import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "./store/themeSlice";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { ReloadIcon } from "@radix-ui/react-icons";

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
    <div className="h-screen grid place-content-center">
      <div>
        <ReloadIcon className="w-16 h-16 text-dark animate-spin" />
      </div>
    </div>
  );
};

export default RootLayout;
