import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogPost } from "../index";
import configService from "../../appwrite/config";
import { Loader } from "../../Icons";

const ProfileSaveds = () => {
  const userInfo = useOutletContext();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await configService.fetchSavedPostsData(
          userInfo.savedPosts
        );
        const activeSavedPosts = fetchedPosts.filter(
          (post) => post.status === "active"
        );
        setSavedPosts(activeSavedPosts);
      } catch (error) {
        console.log(`Error while fetching savedPosts Data : ${error}`);
        throw new Error(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [userInfo.savedPosts]);

  return loader ? (
    <div className="flex items-center justify-center mt-10">
      <Loader
        className={`fill-dark text-dark  dark:fill-light dark:text-light`}
        width={48}
        height={48}
      />
    </div>
  ) : (
    <div className="w-full mt-10 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 max-md:px-2 max-lg:px-10">
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => <BlogPost key={post.$id} post={post} />)
      ) : (
        <div>No saved Post</div>
      )}
    </div>
  );
};

export default ProfileSaveds;
