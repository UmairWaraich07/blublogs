/* eslint-disable react/prop-types */
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../appwrite/user";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../store/authSlice";
import configService from "../../appwrite/config";

const BlogInteraction = ({ postData, setPostData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasLiked, setHasLiked] = useState(false);
  const [loader, setLoader] = useState(true);
  const [hasSaved, setHasSaved] = useState(false);
  const { authStatus, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userData?.savedPosts && userData) {
      // Check if savedPosts is missing
      (async () => {
        const data = await userService.getUser([
          Query.equal("$id", [userData?.$id]),
        ]);
        dispatch(updateUserData(data.documents[0]));
      })();
    }
    setHasLiked(postData?.likedBy?.includes(userData?.$id));
    setHasSaved(userData?.savedPosts?.includes(postData?.$id));
    setLoader(false);
  }, [userData, dispatch, postData]);

  const handleLike = async () => {
    if (!authStatus) navigate("/login");
    try {
      const updatedPost = await configService.updateLike(postData.$id, {
        likedBy: hasLiked
          ? postData.likedBy.filter((id) => id !== userData.$id) // remove ID
          : [...postData.likedBy, userData.$id], //ADD ID
      });
      if (updatedPost) {
        setHasLiked((prevState) => !prevState);
        console.log({ updatedPost });
        setPostData(updatedPost);
      }
    } catch (error) {
      console.log("Error updating like:", error);
      throw Error(error.message);
    }
  };
  const handleSaved = async () => {
    if (!authStatus) navigate("/login");
    try {
      const savedPost = await userService.updateSaved(userData.$id, {
        savedPosts: hasSaved
          ? userData.savedPosts.filter((id) => id !== postData.$id)
          : [...userData.savedPosts, postData.$id],
      });
      if (savedPost) {
        setHasSaved((prevState) => !prevState);
        dispatch(updateUserData(savedPost));
      }
    } catch (error) {
      console.log(`Error on updating the saved post : ${error}`);
      throw new Error(error.message);
    }
  };

  return loader ? (
    <h1 className="text-2xl text-dark">Loading...</h1>
  ) : (
    <div className="py-3 px-10 max-sm:px-4 border-t-[1.5px] dark:border-t border-b-[1.5px] dark:border-b border-dark/10 dark:border-light flex items-center gap-10">
      <div
        className="flex items-center gap-1 cursor-pointer group "
        onClick={handleLike}
      >
        {hasLiked ? (
          <HeartFilledIcon className="w-6 h-6 text-heart" />
        ) : (
          <HeartIcon className="text-dark dark:text-light w-6 h-6 transition group-hover:text-heart" />
        )}
        <span
          className={`${
            hasLiked ? "text-heart" : "text-dark dark:text-light"
          } font-semibold transition group-hover:text-heart`}
        >
          {postData?.likedBy?.length}
        </span>
      </div>
      <div className="cursor-pointer" onClick={handleSaved}>
        {hasSaved ? (
          <BookmarkFilledIcon className="text-blue w-6 h-6" />
        ) : (
          <BookmarkIcon className="text-dark dark:text-light w-6 h-6 transition hover:text-blue" />
        )}
      </div>
    </div>
  );
};

export default BlogInteraction;
