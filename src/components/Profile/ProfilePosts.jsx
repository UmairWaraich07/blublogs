import { useOutletContext } from "react-router-dom";
import BlogPost from "../BlogPost";

const ProfilePosts = () => {
  const userInfo = useOutletContext();

  return (
    <div className="w-full mt-10 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20">
      {userInfo?.posts.map((post) => (
        <BlogPost key={post.$id} post={post} authorId={userInfo.$id} />
      ))}
    </div>
  );
};

export default ProfilePosts;
