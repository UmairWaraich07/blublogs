/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { calculateReadingTime, formatDateString } from "../../utils";

const BlogDetails = ({ postData }) => {
  return (
    <div
      className="w-full flex items-center justify-around bg-accent p-4 rounded-lg flex-wrap
        font-medium text-xl mt-8 text-light"
    >
      <time>{formatDateString(postData?.$createdAt)}</time>
      <span>{postData?.views} views</span>

      <span>{calculateReadingTime(postData?.content)} read</span>
      <Link to={`/categories/${postData?.category.name}`}>
        #{postData?.category.name}
      </Link>
    </div>
  );
};

export default BlogDetails;
