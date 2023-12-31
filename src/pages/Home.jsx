// import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice";
import {
  BlogPost,
  Container,
  HomeCoverSection,
  Pagination,
} from "../components/index";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Query } from "appwrite";

const limit = 9;

export const homeLoader = async ({ params }) => {
  const page = params.page;
  try {
    console.log("fetching home posts using home loader");
    return await configService.getPosts(
      [Query.equal("status", "active")],
      page ? page : 1,
      limit
    );
  } catch (error) {
    console.log(`Error on fetching the home posts : ${error}`);
    throw new Error(error.message);
  }
};
const Home = () => {
  const dispatch = useDispatch();
  // const [loader, setLoader] = useState(true);
  // const { posts } = useSelector((state) => state.posts);
  // const activePosts = posts.filter((item) => item.status === "active");
  // const [postData, setPostData] = useState(activePosts || []);
  // const [totalPosts, setTotalPosts] = useState(0);

  const data = useLoaderData();
  const postData = data.documents;
  const totalPosts = data.total;
  dispatch(setPosts(data.documents));

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     console.log("fetching home posts");
  //     const data = await configService.getPosts(
  //       [Query.equal("status", "active")],
  //       page ? page : 1,
  //       limit
  //     );
  //     setPostData(data.documents);
  //     setTotalPosts(data.total);
  //     dispatch(setPosts(data.documents));
  //   };

  //   // if (!posts || posts?.length === 0) {
  //   fetchPosts();

  //   setLoader(false);
  // }, [dispatch, page]);

  return (
    <div className="w-full">
      <Container>
        <HomeCoverSection post={postData[0]} />
        <section className="w-full mt-24 px-20 max-md:px-2 max-lg:px-10">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-3xl max-sm:text-2xl font-bold text-dark dark:text-light">
              Recent Posts
            </h2>
            <Link
              to="/categories/all"
              className="text-accent dark:text-accentDark underline text-base md:text-lg font-medium"
            >
              view all
            </Link>
          </div>

          <div className="w-full mt-10 grid gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {postData?.map((post) => (
              <BlogPost key={post.$id} post={post} />
            ))}
          </div>
        </section>

        <Pagination
          currentPage={page ? page : 1}
          totalPages={Math.ceil(totalPosts / limit)}
          setSearchParams={setSearchParams} // Assuming a limit of 8 posts per page
        />
      </Container>
    </div>
  );
};

export default Home;
