import { Container, PostForm } from "../components";

const EditPost = () => {
  return (
    <div className="w-full">
      <Container>
        <h1 className="text-3xl font-bold">Edit your blog post</h1>
        {/* Pass the post to the PostForm component */}
        <PostForm />
      </Container>
    </div>
  );
};

export default EditPost;
