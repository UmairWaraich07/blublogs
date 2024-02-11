import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../Icons";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ authentication = false, children }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.authStatus);
  // const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authentication && authStatus === false) {
      navigate(
        `/login?message=You need to login first&redirectTo=${pathname}`,
        { replace: true }
      );
    }
    setLoader(false);
  }, [authentication, authStatus, navigate, pathname]);
  return loader ? (
    <div className="h-screen grid place-content-center">
      <div>
        <Loader />
      </div>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
