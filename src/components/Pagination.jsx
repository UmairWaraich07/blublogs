/* eslint-disable react/prop-types */

const Pagination = ({ currentPage, totalPages, setSearchParams }) => {
  const page = Number(currentPage);

  const handleSearchParams = (key, value) => {
    setSearchParams((prevParams) => {
      if (!value) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  return (
    <nav className="flex justify-center items-center mt-16">
      <ul className="flex gap-4 list-none px-4 py-2 rounded-md border border-dark dark:border-light">
        <li
          className={`px-5 py-2 flex items-center justify-center rounded-lg border-[1.5px] border-dark dark:border-light
           bg-dark text-light ${
             page === 1 ? "cursor-not-allowed" : "  cursor-pointer"
           }`}
        >
          <button
            className="w-full text-center text-sm font-medium text-gray-700"
            disabled={page === 1}
            onClick={() => handleSearchParams("page", page - 1)}
          >
            Prev
          </button>
        </li>
        <div className="text-accent dark:text-accentDark flex items-center justify-center text-lg font-semibold">
          {page}
        </div>
        <li
          className={`px-5 py-2 flex items-center justify-center rounded-lg border-[1.5px] border-dark dark:border-light
           bg-dark text-light ${
             page === totalPages || totalPages === 0
               ? "cursor-not-allowed"
               : "  cursor-pointer"
           }`}
        >
          <button
            className="w-full text-center text-sm font-medium text-gray-700"
            disabled={totalPages === 0 || page === totalPages}
            onClick={() => handleSearchParams("page", page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
