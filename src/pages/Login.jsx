import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import Logo from "../components/Logo";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sumbit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log({ userData });
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(`Error while submitting the logged in data : ${error}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full grid place-content-center min-h-screen p-6">
      <div className=" w-[450px] max-sm:w-full">
        <div className="w-full flex items-center justify-center ">
          <Logo />
        </div>
        <div className="text-dark text-3xl font-bold text-center">
          Login to your account
        </div>
        <p className="text-gray text-sm mt-2 text-center">
          Welcome back! Please enter your details
        </p>
        <form
          onSubmit={handleSubmit(sumbit)}
          className="w-full flex flex-col gap-3 mt-5"
        >
          <Input
            label="Email"
            type="email"
            className="w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm"> {errors.email.message}</p>
          )}

          <Input
            label="Password"
            type="password"
            className="w-full"
            placeholder="Password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm"> {errors.password.message}</p>
          )}
          {error && <p className="text-red-600 text-sm"> {error}</p>}
          <Button
            type="submit"
            className="w-full mt-3"
            bgColor="bg-dark"
            textColor="text-light"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="mr-2">
                <ReloadIcon className="w-4 h-4 animate-spin" />
              </span>
            )}
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
