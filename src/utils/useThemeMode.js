import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "../store/themeSlice";

const useThemeMode = () => {
  const dispatch = useDispatch();
  const setThemeMode = (mode) => {
    if (mode === "light") {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
      console.log("dispatched dark mode");
    }
  };
  const getThemeMode = () => {
    return JSON.parse(localStorage.getItem("theme")) || "light";
  };

  return [setThemeMode, getThemeMode];
};

export default useThemeMode;
