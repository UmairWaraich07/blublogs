import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Container, ProfileInfo } from "../components/index";
import userService from "../appwrite/user";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  const { pathname } = useLocation();
  const isActive = pathname.includes("saved");

  const [loader, setLoader] = useState(true);
  const { userData } = useSelector((state) => state.auth);

  const isAuthor = userInfo && userData ? userInfo.$id === userData.$id : false;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const data = await userService.getUser([Query.equal("$id", [id])]);
      setUserInfo(data.documents[0]);
      setLoader(false);
    })();
  }, [id]);
  return loader ? (
    <h1 className="text-5xl font-bold text-dark">Loading...</h1>
  ) : (
    <div className="w-full mt-8">
      <Container>
        <div className="">
          <div className="w-full flex max-sm:flex-col-reverse items-start justify-between gap-8 max-sm:gap-2">
            <div className="flex max-md:flex-col gap-6 px-20 max-md:px-4">
              <ProfileInfo userData={userInfo} />
            </div>
            {userData?.$id === userInfo?.$id && (
              <div className="w-full flex justify-end flex-1">
                <Button
                  onClick={() => navigate(`/profile/edit/${userInfo.$id}`)}
                  bgColor="bg-light"
                  textColor="text-dark"
                  className=""
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-center gap-4 border-t-[1.5px] border-b-[1.5px] py-2 border-dark/10">
              <Link
                className={`${
                  isActive ? "text-gray font-normal" : "text-dark font-semibold"
                } text-lg `}
              >
                {userInfo.posts.length} Posts
              </Link>
              {isAuthor && (
                <Link
                  to="saved"
                  className={`${
                    !isActive
                      ? "text-gray font-normal"
                      : "text-dark font-semibold"
                  } text-lg `}
                >
                  Saved
                </Link>
              )}
            </div>
            <Outlet context={userInfo} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
