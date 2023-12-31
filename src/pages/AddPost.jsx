import { Container, PostForm } from "../components/index";

const AddPost = () => {
  return (
    <div className="w-full mt-8">
      <Container>
        <h1 className="text-3xl text-dark dark:text-light font-bold">
          Write a blog post
        </h1>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
