import { Link } from "react-router-dom";
import fileService from "../appwrite/file";
import { formatDateString } from "../utils";

/* eslint-disable react/prop-types */
const BlogPost = ({ post }) => {
  return (
    <div className="text-dark flex flex-col gap-4 group">
      <Link
        className="w-full h-full overflow-hidden rounded-xl"
        to={`/blog/${post.$id}`}
      >
        <img
          src={fileService.getPostPreview(post.featuredImage)}
          alt={post.title}
          className="aspect-[4/3] rounded-xl w-[350px] h-[300px] object-cover object-center
           group-hover:scale-105 transition-all duration-300"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <Link
          to={`/categories/${post.category.name}`}
          className="text-accent font-semibold text-sm uppercase"
        >
          {post.category.name}
        </Link>
        <Link to={`/blog/${post.$id}`}>
          <h4 className="text-lg font-semibold capitalize cursor-pointer">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px] 
              group-hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {post.title}{" "}
            </span>
          </h4>
        </Link>
        <p className="text-dark/50 font-semibold text-base capitalize">
          {formatDateString(post.$createdAt)}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
