import { Link } from "react-router-dom";
import { Button } from "../components";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const NotFound = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col text-center max-sm:p-6 p-10 mt-8 text-dark dark:text-light">
      <ExclamationTriangleIcon className="w-20 h-20 " />
      <h1 className="text-dark dark:text-light text-4xl font-bold mt-2">
        404 Not Found
      </h1>
      <p className="font-inter md:text-lg mt-1">
        The page you&apos;re looking for could not be found.
      </p>
      <p className="font-inter md:text-lg mt-2">
        It might have been removed, had its name changed, or is temporarily
        unavailable.
      </p>
      <Link to="/">
        <Button className="mt-6">Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
