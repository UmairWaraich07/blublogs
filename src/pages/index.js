import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const AddPost = lazy(() => import("./AddPost"));
const Categories = lazy(() => import("./Categories"));
import Login from "./Login";
import Register from "./Register";
const Profile = lazy(() => import("./Profile"));
const EditPost = lazy(() => import("./EditPost"));
const EditProfile = lazy(() => import("./EditProfile"));
const Blog = lazy(() => import("./Blog"));
const NotFound = lazy(() => import("./NotFound"));
const Error = lazy(() => import("./Error"));

export {
  Home,
  AddPost,
  Categories,
  Login,
  Register,
  Profile,
  EditPost,
  EditProfile,
  Blog,
  NotFound,
  Error,
};
