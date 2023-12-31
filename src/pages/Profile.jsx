import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button, Container, ProfileInfo } from "../components/index";
import userService from "../appwrite/user";
import { Query } from "appwrite";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData } from "../store/profileSlice";

export async function profileLoader({ params }) {
  const id = params.id;
  try {
    console.log("fetching the profile data using ProfileLoader");
    return await userService.getUser([Query.equal("$id", [id])]);
  } catch (error) {
    console.log(`Error on fetching the profile posts : ${error}`);
    throw new Error(error.message);
  }
}

const Profile = () => {
  const dispatch = useDispatch();
  // ------------ Loaders ------------- //
  const data = useLoaderData();
  console.log({ data });
  const profileInfo = data.documents[0];
  dispatch(updateProfileData(data.documents[0].posts));
  // const [profileInfo, setprofileInfo] = useState({});

  const { pathname } = useLocation();
  const isActive = pathname.includes("saved");

  // const [loader, setLoader] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profilePosts);

  const isAuthor =
    profileInfo && userData ? profileInfo.$id === userData.$id : false;
  const navigate = useNavigate();
  // const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     const data = await userService.getUser([Query.equal("$id", [id])]);
  //     setprofileInfo(data.documents[0]);
  //     dispatch(updateProfileData(data.documents[0].posts));
  //     setLoader(false);
  //   })();
  // }, [id, navigate, dispatch]);
  return (
    <div className="w-full mt-8">
      <Container>
        <div className="">
          <div className="w-full flex max-sm:flex-col-reverse items-start justify-between gap-8 max-sm:gap-2">
            <div className="flex max-md:flex-col gap-6 px-20 max-md:px-2">
              <ProfileInfo userData={profileInfo} />
            </div>
            {userData?.$id === profileInfo?.$id && (
              <div className="w-full flex justify-end flex-1">
                <Button
                  onClick={() => navigate(`/profile/edit/${profileInfo.$id}`)}
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
            <div className="flex items-center justify-center gap-4 border-t-[1.5px] border-b-[1.5px] dark:border-t dark:border-b py-2 border-dark/10 dark:border-light">
              <Link
                className={`${
                  isActive
                    ? "text-gray dark:text-light/70 font-normal"
                    : "text-dark dark:text-light font-semibold"
                } text-lg `}
              >
                {profileData.length} Posts
              </Link>
              {isAuthor && (
                <Link
                  to="saved"
                  className={`${
                    !isActive
                      ? "text-gray dark:text-light/70 font-normal"
                      : "text-dark dark:text-light font-semibold"
                  } text-lg `}
                >
                  Saved
                </Link>
              )}
            </div>
            <Outlet context={profileInfo} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
