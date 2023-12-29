/* eslint-disable react/prop-types */
import { CalendarIcon } from "@radix-ui/react-icons";
import { formatJoinDate } from "../../utils";
import fileService from "../../appwrite/file";

const ProfileInfo = ({ userData }) => {
  return (
    <>
      <div>
        {userData.profileImage ? (
          <img
            src={fileService.getPostPreview(userData.profileImage)}
            className="w-32 h-32 max-md:w-28 max-md:h-28 object-contain rounded-full"
          />
        ) : (
          <div
            className="w-32 h-32 max-md:w-28 max-md:h-28 bg-lightBlue text-light rounded-full flex items-center justify-center
                  text-4xl font-bold"
          >
            {/* Handle undefined values gracefully */}
            {userData.username && userData.fullName
              ? // Dynamically create avatar text if both username and fullName are available
                userData.username.charAt(0) +
                userData.fullName
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase())
                  .slice(1)
                  .join("")
              : // Display a placeholder if either username or fullName is undefined
                "?"}
          </div>
        )}
      </div>
      <div className="text-dark dark:text-light">
        <h2 className="text-3xl font-bold">{userData?.fullName}</h2>
        <h4 className="font-medium text-lg">@{userData?.username}</h4>
        <div className="flex items-center gap-2 mt-4">
          <CalendarIcon className="text-dark dark:text-light w-5 h-5" />
          <p className=" font-medium dark:font-normal">
            {formatJoinDate(userData?.$createdAt)}
          </p>
        </div>
        <p className="mt-4 font-inter">{userData?.bio}</p>
      </div>
    </>
  );
};

export default ProfileInfo;
