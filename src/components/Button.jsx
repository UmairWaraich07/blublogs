/* eslint-disable react/prop-types */
const Button = ({
  children,
  type = "button",
  className = "",
  textColor = "text-dark",
  bgColor = "bg-light",
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-6 py-2 font-medium border-2 rounded-md border-dark hover:scale-105 transition-all duration-200
      flex items-center justify-center ${textColor} ${bgColor} ${className}`}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
