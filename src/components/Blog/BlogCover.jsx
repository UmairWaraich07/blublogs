/* eslint-disable react/prop-types */
import fileService from "../../appwrite/file";
import { Tag } from "../index";

const BlogCover = ({ blog }) => {
  return (
    <div className="relative w-full h-[70vh] max-sm:h-[60vh] ">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent
       from-0% to-dark/60 z-0"
      />
      <img
        src={fileService.getPostPreview(blog?.featuredImage)}
        className="w-full h-full object-cover object-center -z-10"
      />
      <div className="absolute w-full flex items-center justify-center flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tag
          link={`/categories/${blog?.category?.$id}`}
          name={blog?.category?.name}
        />
        <h1 className="inline-block mt-6 font-semibold capitalize text-light text-4xl max-sm:text-2xl text-center leading-normal w-5/6">
          {blog?.title}
        </h1>
      </div>
    </div>
  );
};

export default BlogCover;
