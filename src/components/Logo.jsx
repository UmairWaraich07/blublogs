import logo from "../assets/logo.png";
// eslint-disable-next-line react/prop-types
const Logo = ({ width }) => {
  return (
    <div className="flex items-center gap-1 text-dark">
      <div className={`w-16 max-md:w-12 rounded-full overflow-hidden ${width}`}>
        <img
          src={logo}
          alt="Logo"
          className="w-full h-auto rounded-full object-contain"
        />
      </div>
      <div className="font-bold text-xl">
        Blu<span className="text-accent">Blogs</span>
      </div>
    </div>
  );
};

export default Logo;
