import React, { useId } from "react";

/* eslint-disable react/prop-types */
const Input = React.forwardRef(function Input(
  { label, type = "text", className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-dark font-semibold">
          {label} <span className="text-red-600">*</span>
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`px-4 py-2 focus:outline-none border-2 border-dark rounded-md  ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;
