import { Loader } from "../Icons";
import { Logo } from "../components";

const Loading = () => {
  return (
    <div className="h-screen grid place-content-center relative">
      <div className="flex items-center justify-center">
        <Loader
          className={`fill-dark text-dark  dark:fill-light dark:text-light`}
          width={128}
          height={128}
        />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo width={128} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
