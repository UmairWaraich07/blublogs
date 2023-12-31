import { useOutletContext } from "react-router-dom";
import BlogPost from "../BlogPost";
import { useSelector } from "react-redux";

const ProfilePosts = () => {
  const userInfo = useOutletContext();
  const { profileData } = useSelector((state) => state.profilePosts);

  return (
    <div className="w-full mt-10 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 max-md:px-2 max-lg:px-10">
      {profileData?.map((post) => (
        <BlogPost
          key={post.$id}
          post={post}
          authorId={userInfo.$id}
          showAuthor={false}
        />
      ))}
    </div>
  );
};

export default ProfilePosts;
