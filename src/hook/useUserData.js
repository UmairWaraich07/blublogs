import { useSelector } from "react-redux";

export const useUserData = () => {
  const { userData } = useSelector((state) => state.auth);

  return userData;
};
