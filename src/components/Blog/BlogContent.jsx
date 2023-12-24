/* eslint-disable react/prop-types */
import parse from "html-react-parser";

const BlogContent = ({ content }) => {
  return (
    <div
      className="w-full prose lg:prose-xl max-w-max
        prose-blockquote:bg-accent/20
        prose-blockquote:p-2
        prose-blockquote:px-6
       prose-blockquote:border-accent
        prose-blockquote:not-italic
        prose-blockquote:rounded-r-lg
        prose-li:marker:text-accent 
    "
    >
      {parse(content)}
    </div>
  );
};

export default BlogContent;
