import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Loader } from "../Icons";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState({});
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const session = await configService.getPost(id);
        if (session) {
          setPost(session);
        } else {
          navigate("..");
        }
      } catch (error) {
        console.log(`Error on getting post : ${error}`);
        throw new Error(error.message);
      } finally {
        setLoader(false);
      }
    })();
  }, [id, navigate]);

  if (userData?.$id !== post?.authorId?.$id) return <Navigate to="/" />;

  return loader ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader
        className={`fill-dark text-dark  dark:fill-light dark:text-light`}
        width={100}
        height={100}
      />
    </div>
  ) : (
    <div className="w-full mt-8">
      <Container>
        <h1 className="text-3xl font-bold dark:text-light">
          Edit your blog post
        </h1>
        {/* Pass the post to the PostForm component */}
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
