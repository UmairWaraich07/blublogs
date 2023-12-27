/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Tag = ({
  link,
  name,
  border = "border-light",
  active = true,
  className = "",
  ...props
}) => {
  return (
    <Link
      to={link}
      className={`px-10 py-3 rounded-full border-2 capitalize font-semibold
      hover:scale-105 transition-all ease duration-200 bg-dark text-light ${border} ${className} ${
        active ? "!bg-dark !text-light" : "!bg-light !text-dark"
      }`}
      {...props}
    >
      {name}
    </Link>
  );
};

export default Tag;
