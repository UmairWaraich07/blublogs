/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import fileService from "../../appwrite/file";
import { formatDateString } from "../../utils";

const WriitenBy = ({ post, showDate = true }) => {
  return (
    <Link
      to={`/profile/${post?.authorId?.$id}`}
      className="flex items-center gap-3 mt-1 flex-wrap"
    >
      <div className="flex items-center gap-1">
        {post?.authorId?.profileImage ? (
          <img
            src={fileService.getPostPreview(post?.authorId?.profileImage)}
            alt={post?.authorId?.fullName}
            className="w-7 h-7 object-cover rounded-full"
          />
        ) : (
          <div
            className="w-7 h-7 bg-lightBlue text-light rounded-full flex items-center justify-center
          text-sm font-medium"
          >
            {/* Handle undefined values gracefully */}
            {post?.authorId?.username && post?.authorId?.fullName
              ? // Dynamically create avatar text if both username and fullName are available
                post?.authorId?.username.charAt(0) +
                post?.authorId?.fullName
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase())
                  .slice(1)
                  .join("")
              : // Display a placeholder if either username or fullName is undefined
                "?"}
          </div>
        )}

        <p className="text-dark font-medium cursor-pointer">
          {post?.authorId?.fullName}
        </p>
      </div>
      {showDate && (
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-gray" />
          <p className="text-gray font-semibold text-sm capitalize cursor-pointer">
            {formatDateString(post?.$createdAt)}
          </p>
        </div>
      )}
    </Link>
  );
};

export default WriitenBy;
