import { Link } from "react-router-dom";
import { Container } from "../index";
import { useForm } from "react-hook-form";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
const Footer = () => {
  const { register, handleSubmit } = useForm();
  const submit = (data) => {
    console.log(data);
  };
  return (
    <footer className="w-full text-light mt-24 rounded-2xl mb-6">
      <Container>
        <div className="bg-dark rounded-2xl">
          <div className="py-20 flex items-center justify-center flex-col">
            <h1 className="text-3xl max-sm:text-2xl font-medium text-center capitalize px-2">
              Interesting Stories | Updates | Guides
            </h1>
            <p className="font-inter text-center mt-5 text-base max-sm:text-sm px-4 w-3/5 max-sm:w-full">
              Subscribe to learn about new technology and updates. Join over
              5000+ members community to stay up to date with latest news.
            </p>

            <form
              onSubmit={handleSubmit(submit)}
              className="p-2 max-sm:p-1 mt-6 min-w-[350px] max-sm:min-w-[320px] px-4 max-sm:px-2 max-sm:text-sm flex items-stretch bg-light rounded-md"
            >
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required.",
                })}
                className="outline-none border-b border-b-gray font-medium text-dark w-full rounded"
              />
              <button
                type="submit"
                className="ml-4 py-2 px-5 font-medium bg-dark text-light rounded-md"
              >
                Submit
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/umair-amjad-595811274/"
                className="w-6 h-6 hover:scale-125 transition-all duration-200"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://twitter.com/reachumair"
                className="w-6 h-6 hover:scale-125 transition-all duration-200"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://github.com/UmairWaraich07"
                className="w-6 h-6 hover:scale-125 transition-all duration-200"
              >
                <GithubIcon className="fill-light" />
              </a>
            </div>
          </div>
          <div className="w-full text-light border-t border-light font-medium py-6 px-8 flex gap-3 max-sm:flex-col items-center justify-between">
            <p>&copy;2023 Blublogs. All rights reserved.</p>
            {/* <Link to="/sitemap.xml" className="underline text-center">
              sitemap.xml
            </Link> */}
            <p>
              Made with &hearts; by <Link className="underline">Umair</Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
