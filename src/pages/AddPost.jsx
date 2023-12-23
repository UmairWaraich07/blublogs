import { Container, PostForm } from "../components/index";

const AddPost = () => {
  return (
    <div className="w-full">
      <Container>
        <h1 className="text-3xl font-bold">Write a blog post</h1>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
