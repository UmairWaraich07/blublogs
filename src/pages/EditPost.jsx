import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import configService from "../appwrite/config";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState({});

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
  return loader ? (
    <h1 className="text-6xl text-dark font-bold h-[90vh]">Loading....</h1>
  ) : (
    <div className="w-full">
      <Container>
        <h1 className="text-3xl font-bold">Edit your blog post : {id}</h1>
        {/* Pass the post to the PostForm component */}
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
