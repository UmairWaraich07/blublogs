import { useLoaderData } from "react-router-dom";
import { Container, PostForm } from "../components";
// import { useEffect, useState } from "react";
import configService from "../appwrite/config";

export const editPostLoader = async ({ params }) => {
  try {
    console.log("fetching post data using editPostLoader");
    return await configService.getPost(params.id);
  } catch (error) {
    console.log(`Error on getting post : ${error}`);
    throw new Error(error.message);
  }
};
const EditPost = () => {
  const post = useLoaderData();
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [loader, setLoader] = useState(true);
  // const [post, setPost] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const session = await configService.getPost(id);
  //       if (session) {
  //         setPost(session);
  //       } else {
  //         navigate("..");
  //       }
  //     } catch (error) {
  //       console.log(`Error on getting post : ${error}`);
  //       throw new Error(error.message);
  //     } finally {
  //       setLoader(false);
  //     }
  //   })();
  // }, [id, navigate]);
  return (
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
