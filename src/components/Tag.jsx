/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Tag = ({
  link,
  name,
  border = "border-light",
  active,
  className = "",
  ...props
}) => {
  return (
    <Link
      to={link}
      className={`px-10 max-md:px-6 py-3 max-md:py-1 rounded-full border-2 capitalize font-semibold max-md:font-medium
      hover:scale-105 transition-all ease duration-200 ${border}  ${
        active
          ? "bg-dark text-light dark:bg-light dark:text-dark"
          : "bg-light text-dark dark:bg-dark dark:text-light"
      } ${className}`}
      {...props}
    >
      {name}
    </Link>
  );
};

export default Tag;
