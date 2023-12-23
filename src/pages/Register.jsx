import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../components";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.registerUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log({ userData });
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(`Error while submitting the registerData : ${error}`);
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
          Create a new account
        </div>
        <p className="text-gray text-sm mt-2 text-center">
          To use BluBlogs, Please enter your details
        </p>
        <form
          onSubmit={handleSubmit(create)}
          className="w-full flex flex-col gap-3 mt-5"
        >
          <Input
            label="Name"
            type="text"
            className="w-full"
            placeholder="FullName"
            {...register("fullName", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm"> {errors.name.message}</span>
          )}
          <Input
            label="Username"
            type="text"
            className="w-full"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <span className="text-red-600 text-sm">
              {" "}
              {errors.username.message}
            </span>
          )}
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
            <span className="text-red-600 text-sm">
              {" "}
              {errors.email.message}
            </span>
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
          {error && <span className="text-red-600 text-sm"> {errors}</span>}

          <Button type="submit" className="w-full mt-3" disabled={isLoading}>
            {isLoading && (
              <span className="mr-2">
                <ReloadIcon className="w-4 h-4 animate-spin" />
              </span>
            )}
            {isLoading ? "Registering your account" : "Register your account"}
          </Button>
        </form>
        <div className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
