import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configService from "../appwrite/config";
import { BlogContent, BlogCover, BlogDetails, Container } from "../components";

const Blog = () => {
  const [postData, setPostData] = useState({});
  const [loader, setLoader] = useState(true);
  const [isViewIncremented, setIsViewIncremented] = useState(false); // Track view increment
  console.log(postData);
  const { id } = useParams();

  const incrementViewCount = useCallback(async () => {
    try {
      await configService.updateViewCount(id, {
        views: postData.views + 1,
      });
    } catch (error) {
      console.log(`Error incrementing view count : ${error}`);
    }
  }, [id, postData.views]);

  useEffect(() => {
    configService
      .getPost(id)
      .then((data) => setPostData(data))
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => setLoader(false));

    // Increment view count after post data is fetched
    if (!isViewIncremented && postData.views !== undefined) {
      incrementViewCount();
      setIsViewIncremented(true);
    }
  }, [id, isViewIncremented, incrementViewCount, postData.views]);

  return loader ? (
    <h1 className="text-6xl font-bold text-dark h-[70vh]">Loading...</h1>
  ) : (
    <article>
      <BlogCover blog={postData} />
      <Container>
        <BlogDetails postData={postData} />
        <div className="mt-8 w-full grid grid-cols-12 gap-16">
          {/* <div className="col-span-4">
            <TOC />
          </div> */}
          <div className="col-span-12">
            <BlogContent content={postData.content} />
          </div>
        </div>
      </Container>
    </article>
  );
};

export default Blog;
