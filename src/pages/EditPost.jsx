import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useSelector } from "react-redux";

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
    <h1 className="text-6xl text-dark dark:text-light font-bold h-[90vh]">
      Loading....
    </h1>
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
