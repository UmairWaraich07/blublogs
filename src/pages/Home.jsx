import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/postSlice";
import { BlogPost, Container, HomeCoverSection } from "../components/index";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  useEffect(() => {
    (async () => {
      const data = await configService.getPosts();
      dispatch(setPosts(data.documents));
      setLoader(false);
    })();
  }, [dispatch]);
  return loader ? (
    <h1 className="text-6xl text-dark font-bold">Loading...</h1>
  ) : (
    <div className="w-full">
      <Container>
        <HomeCoverSection post={posts[3]} />
        <section className="w-full mt-24 px-20">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark">Recent Posts</h2>
            <Link
              to="/categories/all"
              className="text-accent underline text-base"
            >
              view all
            </Link>
          </div>

          <div className="w-full mt-10 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <BlogPost key={post.$id} post={post} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Home;
