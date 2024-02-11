import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configService from "../appwrite/config";
import {
  BlogContent,
  BlogCover,
  BlogDetails,
  BlogInteraction,
  Container,
  WriitenBy,
} from "../components";
import { Loader } from "../Icons";

const Blog = () => {
  const [postData, setPostData] = useState({});
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [isViewIncremented, setIsViewIncremented] = useState(false); // Track view increment
  const { id } = useParams();

  const incrementViewCount = useCallback(async () => {
    try {
      return await configService.updateViewCount(id, {
        views: postData.views + 1,
      });
    } catch (error) {
      console.log(`Error incrementing view count : ${error}`);
    }
  }, [id, postData.views]);

  useEffect(() => {
    const fetchPostAndIncrement = async () => {
      try {
        const data = await configService.getPost(id);
        if (data) {
          setPostData(data);
        } else {
          navigate("/");
        }
        // increment the view count when post data is loaded
        if (!isViewIncremented && postData.views !== undefined) {
          incrementViewCount();
          setIsViewIncremented(true);
        }
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchPostAndIncrement();
  }, [id, navigate, isViewIncremented, postData.views, incrementViewCount]);

  return loader ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Loader
        className={`fill-dark text-dark  dark:fill-light dark:text-light`}
        width={100}
        height={100}
      />
    </div>
  ) : (
    <article className="w-full max-sm:mt-4">
      <BlogCover blog={postData} />
      <Container>
        <BlogDetails postData={postData} />

        <div className="w-full flex items-center justify-center">
          <div className="mt-8 max-sm:mt-4 w-full max-w-[680px]">
            <div className="w-full flex items-center gap-4 py-3 border-b-[1.5px] dark:border-b border-b-dark/10 dark:border-b-light">
              <span className=" font-medium text-xl max-sm:text-base text-accent dark:text-accentDark">
                Written by:
              </span>
              <WriitenBy post={postData} showDate={false} />
            </div>
            <BlogContent content={postData?.content} />
            <BlogInteraction postData={postData} setPostData={setPostData} />
          </div>
        </div>
      </Container>
    </article>
  );
};

export default Blog;
