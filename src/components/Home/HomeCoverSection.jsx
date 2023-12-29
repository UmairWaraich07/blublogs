/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import fileService from "../../appwrite/file";
import { Tag } from "../index";

const HomeCoverSection = ({ post }) => {
  return (
    <article className="relative h-[70vh] md:h-[80vh] max-sm:mt-4 flex flex-col items-start justify-end rounded-2xl">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent
       from-0% to-dark/90 rounded-3xl z-0"
      />
      <img
        src={fileService.getPostPreview(post?.featuredImage)}
        className="w-full h-full object-cover object-center rounded-3xl -z-10"
      />
      <div className="absolute bottom-4 w-3/4 p-16 max-sm:px-6 max-sm:py-12 max-sm:w-full flex items-start justify-center flex-col text-light">
        <Tag
          link={`categories/${post?.category?.$id}`}
          name={post?.category?.name}
          className="!bg-dark !text-light !border-light"
        />
        <Link className="max-sm:mt-3 mt-6" to={`/blog/${post?.$id}`}>
          <h1 className="font-black capitalize text-4xl md:text-3xl sm:text-2xl max-sm:text-xl  cursor-pointer">
            <span
              className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/60 dark:to-accentDark/60 bg-[length:0px_6px] 
              hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {post?.title}
            </span>
          </h1>
        </Link>
      </div>
    </article>
  );
};

export default HomeCoverSection;
