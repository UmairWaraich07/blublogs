import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Tag = ({ link, name, className = "", ...props }) => {
  return (
    <Link
      to={link}
      className={`px-10 py-3 bg-dark text-light rounded-full border-2 border-light capitalize font-semibold
      hover:scale-105 transition-all ease duration-200 ${className}`}
      {...props}
    >
      {name}
    </Link>
  );
};

export default Tag;
