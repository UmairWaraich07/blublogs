import { Link, useNavigate } from "react-router-dom";
import fileService from "../appwrite/file";
import { formatDateString } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import configService from "../appwrite/config";
import { updateProfileData } from "../store/profileSlice";
import { setPosts } from "../store/postSlice";

/* eslint-disable react/prop-types */
const BlogPost = ({ post, authorId, showAuthor = true }) => {
  // console.log({ post });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profilePosts);
  const { posts } = useSelector((state) => state.posts);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData?.$id ? authorId === userData.$id : false;
  // console.log({ post });
  const handleDeletePost = async () => {
    const categoryId = post.category.$id;
    const deletedPost = await configService.deletePost(post.$id);
    if (deletedPost) {
      const data = await configService.getCategory(categoryId);
      const categoryPosts = data.post;

      if (!categoryPosts || categoryPosts.length === 0) {
        // Delete the empty category document
        await configService.deleteCategory(categoryId);
      }

      // after deletion, update the profileData of redux to get fresh updated data
      const updatedProfileData = profileData.filter(
        (profilePost) => profilePost.$id !== post.$id
      );
      dispatch(updateProfileData(updatedProfileData));
      // after deletion of a post, update the redux state of home posts
      const updatedPosts = posts.filter(
        (homePost) => homePost.$id !== post.$id
      );
      dispatch(setPosts(updatedPosts));
    }
  };
  return (
    <div className="relative text-dark dark:text-light flex flex-col gap-4 group">
      {isAuthor && (
        <div className="absolute bg-[#ececec] dark:bg-[#e6e6e6] text-light py-1.5 px-4 rounded-md right-2 top-2 z-40">
          <button onClick={() => navigate(`/edit-post/${post?.$id}`)}>
            <Pencil2Icon className="text-blue w-5 h-5" />
          </button>
          <button className="ml-3" onClick={handleDeletePost}>
            <TrashIcon className="text-heart w-5 h-5" />
          </button>
        </div>
      )}
      <Link
        className="w-full h-full overflow-hidden rounded-xl"
        to={`/blog/${post?.$id}`}
      >
        <img
          src={fileService.getPostPreview(post?.featuredImage)}
          alt={post?.title}
          className="aspect-[4/3] rounded-xl w-full h-[300px] object-cover object-center
           group-hover:scale-105 transition-all duration-300"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <Link
          to={`/categories/${post?.category?.$id}`}
          className="text-accent dark:text-accentDark font-semibold text-sm uppercase"
        >
          {post?.category?.name}
        </Link>
        <Link to={`/blog/${post?.$id}`}>
          <h4 className="max-sm:text-base text-lg font-semibold capitalize cursor-pointer">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] 
              group-hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {post?.title}{" "}
            </span>
          </h4>
        </Link>
        {showAuthor && (
          <Link
            to={`/profile/${post?.authorId?.$id}`}
            className="flex items-center gap-3 mt-1 flex-wrap"
          >
            <div className="flex items-center gap-1.5">
              {post.authorId.profileImage ? (
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
                  {post?.authorId.username && post?.authorId.fullName
                    ? // Dynamically create avatar text if both username and fullName are available
                      post?.authorId.username.charAt(0) +
                      post?.authorId.fullName
                        .split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .slice(1)
                        .join("")
                    : // Display a placeholder if either username or fullName is undefined
                      "?"}
                </div>
              )}

              <p className="text-dark dark:text-light font-medium cursor-pointer">
                {post?.authorId?.fullName}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-gray dark:bg-light/60" />
              <p className="text-gray dark:text-light/50 font-semibold text-sm capitalize cursor-pointer">
                {formatDateString(post?.$createdAt)}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
