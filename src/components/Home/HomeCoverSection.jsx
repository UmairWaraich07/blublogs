/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import fileService from "../../appwrite/file";
import { Tag } from "../index";

const HomeCoverSection = ({ post }) => {
  return (
    <article className="relative h-[80vh] flex flex-col items-start justify-end rounded-3xl">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent
       from-0% to-dark/90 rounded-3xl z-0"
      />
      <img
        src={fileService.getPostPreview(post?.featuredImage)}
        className="w-full h-full object-cover object-center rounded-3xl -z-10"
      />
      <div className="absolute bottom-4 w-3/4 p-16 flex items-start justify-center flex-col text-light">
        <Tag
          link={`categories/${post.category.name}`}
          name={post.category.name}
        />
        <Link className="mt-6" to={`/blog/${post.$id}`}>
          <h1 className="font-black capitalize text-4xl cursor-pointer">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] 
              hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {post.title}
            </span>
          </h1>
        </Link>
      </div>
    </article>
  );
};

export default HomeCoverSection;
