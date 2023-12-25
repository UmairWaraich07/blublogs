import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Container, ProfileInfo } from "../components/index";
import userService from "../appwrite/user";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState({});

  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const data = await userService.getUser([Query.equal("$id", [id])]);
      setUserData(data.documents[0]);
      setLoader(false);
    })();
  }, [id]);
  return loader ? (
    <h1 className="text-6xl font-bold text-dark">Loading...</h1>
  ) : (
    <div className="w-full mt-6">
      <Container>
        <div className="">
          <div className="w-full flex max-sm:flex-col-reverse items-start justify-between gap-8 max-sm:gap-2">
            <div className="flex max-md:flex-col gap-6">
              <ProfileInfo userData={userData} />
            </div>
            {authStatus && (
              <div className="w-full flex justify-end flex-1">
                <Button
                  onClick={() => navigate(`/profile/edit/${userData.$id}`)}
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
              <Link className="text-lg font-semibold">
                {userData.posts.length} Posts
              </Link>
              <Link to="saved" className="text-lg font-semibold">
                Saved
              </Link>
            </div>
            <Outlet context={userData} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
