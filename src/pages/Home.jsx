import { useEffect } from "react";
import authService from "../appwrite/auth";

const Home = () => {
  useEffect(() => {
    authService.getCurrentUser();
  }, []);
  return (
    <div className="">
      <h1 className="font-manrope">Home</h1>
    </div>
  );
};

export default Home;
