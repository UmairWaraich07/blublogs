import { useParams } from "react-router-dom";
import { BlogPost, Container, Tag } from "../components/index";
import { useEffect, useState } from "react";
import configService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/postSlice";
import { slug } from "github-slugger";

const Categories = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [categoryPostLoader, setCategoryPostLoader] = useState(true);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  //find the name of the active category using its id
  const activeCategory = categories.filter((category) => category.$id === id);
  const activeCategoryName =
    activeCategory && activeCategory.length > 0
      ? activeCategory[0]?.name
      : "all";
  const { posts } = useSelector((state) => state.posts);

  const [categoryPosts, setCategoryPosts] = useState(posts || []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await configService.getCategories();
      if (data) setCategories(data.documents);
      setLoader(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!posts || posts?.length === 0) {
      console.log("fetching the posts for all category....");
      (async () => {
        const data = await configService.getPosts();
        setCategoryPosts(data.documents);
        dispatch(setPosts(data.documents));
      })();
    }
    if (id === "all") {
      const activePosts = posts.filter((item) => item.status === "active");
      setCategoryPosts(activePosts);
    }

    if (id !== "all") {
      (async () => {
        console.log("fetching the posts with other id....");

        const data = await configService.getCategory(id);
        const activePosts = data.post.filter(
          (item) => item.status === "active"
        );
        setCategoryPosts(activePosts);
        setCategoryPostLoader(false);
      })();
    }
    setCategoryPostLoader(false);
  }, [dispatch, posts, id]);

  return (
    <div className="w-full mt-8">
      <Container>
        <div className="px-20 max-md:px-2">
          <h1 className="text-6xl max-sm:text-3xl max-md:text-4xl font-semibold text-dark dark:text-light">
            #{slug(activeCategoryName)}
          </h1>
          <p className="font-inter text-dark/90 dark:text-light/90 max-sm:text-sm mt-1">
            Discover more categories and expand your knowledge!
          </p>
        </div>

        <div className="mt-10 max-sm:mt-8 border-t-2 border-t-dark dark:border-t-light border-b-2 border-b-dark dark:border-b-light px-20 max-sm:px-0 py-6 max-sm:py-4">
          <div className="flex items-center flex-wrap gap-4 max-sm:gap-3">
            <Tag
              key="all"
              name={`#all`}
              link={`/categories/all`}
              border="border-dark dark:border-light"
              className="!lowercase md:!py-2"
              active={id === "all"}
            />
            {loader ? (
              <h1 className="text-xl text-dark dark:text-light">Loading...</h1>
            ) : (
              categories?.map((category) => (
                <Tag
                  key={category.$id}
                  link={`/categories/${category.$id}`}
                  name={`#${slug(category?.name)}`}
                  border="border-dark dark:border-light"
                  className="!lowercase md:!py-2 "
                  active={id === category.$id}
                />
              ))
            )}
          </div>
        </div>

        <div className="w-full mt-12 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 max-md:px-2">
          {categoryPostLoader ? (
            <h1 className="text-xl text-dark dark:text-light">Loading...</h1>
          ) : (
            categoryPosts?.map((post) => (
              <BlogPost key={post?.$id} post={post} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
