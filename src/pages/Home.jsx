import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/postSlice";
import {
  BlogPost,
  Container,
  HomeCoverSection,
  Pagination,
} from "../components/index";
import { Link, useSearchParams } from "react-router-dom";
import { Query } from "appwrite";
import { Loader } from "../Icons";

const Home = () => {
  const limit = 9;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const { posts } = useSelector((state) => state.posts);
  const activePosts = posts.filter((item) => item.status === "active");
  const [postData, setPostData] = useState(activePosts || []);
  const [totalPosts, setTotalPosts] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("fetching home posts");
        const data = await configService.getPosts(
          [Query.equal("status", "active")],
          page ? page : 1,
          limit
        );
        setPostData(data.documents);
        setTotalPosts(data.total);
        dispatch(setPosts(data.documents));
      } catch (error) {
        console.log(`Error while fetching home posts : ${error}`);
        throw new Error(error.message);
      }
    };

    if (!postData || postData?.length === 0) {
      fetchPosts();
    }

    setLoader(false);
  }, [dispatch, page, postData]);

  return loader ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader
        className={`fill-dark text-dark  dark:fill-light dark:text-light`}
        width={100}
        height={100}
      />
    </div>
  ) : (
    <div className="w-full">
      <Container>
        <HomeCoverSection post={posts[0]} />
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
