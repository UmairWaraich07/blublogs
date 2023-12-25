import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configService from "../appwrite/config";
import {
  BlogContent,
  BlogCover,
  BlogDetails,
  BlogInteraction,
  Container,
} from "../components";

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
          <div className="col-span-12 border-x-[1.5px] border-b-[1.5px] rounded-b border-accent">
            <BlogContent content={postData?.content} />
            <BlogInteraction postData={postData} setPostData={setPostData} />
          </div>
        </div>
      </Container>
    </article>
  );
};

export default Blog;
