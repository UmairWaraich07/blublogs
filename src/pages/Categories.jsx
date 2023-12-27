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
      console.log("fetching the posts because redux posts is empty....");
      (async () => {
        const data = await configService.getPosts();
        setCategoryPosts(data.documents);
        dispatch(setPosts(data.documents));
      })();
    }
    if (id === "all") {
      setCategoryPosts(posts);
    }

    if (id !== "all") {
      (async () => {
        const data = await configService.getCategory(id);
        setCategoryPosts(data.post);
        setCategoryPostLoader(false);
      })();
    }
    setCategoryPostLoader(false);
  }, [dispatch, posts, id]);

  return (
    <div className="w-full mt-8">
      <Container>
        <div className="px-20">
          <h1 className="text-6xl font-semibold">#all</h1>
          <p className="font-inter text-dark/90 mt-1">
            Discover more categories and expand your knowledge!
          </p>
        </div>

        <div className="mt-10 border-t-2 border-b-2 px-20 py-6">
          <div className="flex items-center gap-4">
            <Tag
              key="all"
              name={`#all`}
              link={`/categories/all`}
              border="border-dark"
              className="!lowercase !py-2"
              active={id === "all"}
            />
            {loader ? (
              <h1 className="text-xl text-dark">Loading...</h1>
            ) : (
              categories?.map((category) => (
                <Tag
                  key={category.$id}
                  link={`/categories/${category.$id}`}
                  name={`#${slug(category?.name)}`}
                  border="border-dark"
                  className="!lowercase !py-2 "
                  active={id === category.$id}
                />
              ))
            )}
          </div>
        </div>

        <div className="w-full mt-12 grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20">
          {categoryPostLoader ? (
            <h1 className="text-xl text-dark">Loading...</h1>
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
