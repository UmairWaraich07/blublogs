/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { calculateReadingTime, formatDateString } from "../../utils";
import { slug } from "github-slugger";

const BlogDetails = ({ postData }) => {
  return (
    <div
      className="w-full flex items-center justify-around gap-2 max-sm:justify-between bg-accent dark:bg-accentDark p-4 rounded-lg flex-wrap
        font-medium dark:font-semibold text-xl max-sm:text-sm mt-8 text-light dark:text-dark"
    >
      <time>{formatDateString(postData?.$createdAt)}</time>
      <span>{postData?.views} views</span>

      <span>{calculateReadingTime(postData?.content)} read</span>
      <Link to={`/categories/${postData?.category?.$id}`}>
        #{slug(postData?.category?.name)}
      </Link>
    </div>
  );
};

export default BlogDetails;
