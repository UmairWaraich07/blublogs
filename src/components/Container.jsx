// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-10 max-md:px-4">
      {children}
    </div>
  );
};

export default Container;
