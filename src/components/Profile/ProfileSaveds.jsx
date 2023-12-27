import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogPost } from "../index";
import configService from "../../appwrite/config";

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
        setSavedPosts(fetchedPosts);
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
    <h1 className="text-2xl text-dark">Loading...</h1>
  ) : (
    <div className="w-full mt-10 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 max-md:px-2">
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => <BlogPost key={post.$id} post={post} />)
      ) : (
        <div>No saved Post</div>
      )}
    </div>
  );
};

export default ProfileSaveds;
