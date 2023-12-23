/* eslint-disable react/prop-types */
import React from "react";

const Textarea = ({ name, label, className = "", ...props }, ref) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={name} className="text-dark font-semibold">
          {label}
        </label>
      )}
      <textarea
        name={name}
        rows={4}
        cols={40}
        ref={ref}
        id={name}
        className={`px-4 py-2 focus:outline-none border-2 border-dark rounded-md  ${className}`}
        {...props}
      />
    </div>
  );
};

export default React.forwardRef(Textarea);
