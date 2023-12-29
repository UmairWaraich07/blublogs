/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Select = ({ label, options = [], className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="text-dark dark:text-light dark:font-medium font-semibold"
        >
          {label} <span className="text-red-600">*</span>
        </label>
      )}
      <select
        id={id}
        {...props}
        className={`px-4 py-2 focus:outline-none border-2 dark:bg-gray dark:text-light border-dark rounded-md  ${className}`}
        ref={ref}
      >
        {options.map((item) => (
          <option
            key={item}
            value={item}
            className="hover:bg-dark hover:text-light"
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
