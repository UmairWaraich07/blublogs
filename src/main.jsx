import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import {
  AddPost,
  Categories,
  Home,
  Login,
  Register,
  Profile,
  EditPost,
  EditProfile,
  Blog,
} from "./pages/index.js";
import {
  ProfilePosts,
  ProfileSaveds,
  ProtectedRoute,
} from "./components/index.js";
import { homeLoader } from "./pages/Home.jsx";
import { profileLoader } from "./pages/Profile.jsx";
import { postLoader } from "./pages/Blog.jsx";
import { editProfileLoader } from "./pages/EditProfile.jsx";
import { editPostLoader } from "./pages/EditPost.jsx";
import { categoriesLoader } from "./pages/Categories.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute authentication={false}>
              <Home />
            </ProtectedRoute>
          }
          loader={homeLoader}
        />
        <Route
          path="blog/:id"
          element={
            <ProtectedRoute authentication={false}>
              <Blog />
            </ProtectedRoute>
          }
          loader={postLoader}
        />
        <Route
          path="add-post"
          element={
            <ProtectedRoute authentication={true}>
              <AddPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="categories/:id"
          element={
            <ProtectedRoute authentication={false}>
              <Categories />
            </ProtectedRoute>
          }
          loader={categoriesLoader}
        />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute authentication={false}>
              <Profile />
            </ProtectedRoute>
          }
          loader={profileLoader}
        >
          <Route index element={<ProfilePosts />} />
          <Route path="saved" element={<ProfileSaveds />} />
        </Route>

        <Route
          path="profile/edit/:id"
          element={
            <ProtectedRoute authentication={true}>
              <EditProfile />
            </ProtectedRoute>
          }
          loader={editProfileLoader}
        />

        <Route
          path="edit-post/:id"
          element={
            <ProtectedRoute authentication={true}>
              <EditPost />
            </ProtectedRoute>
          }
          loader={editPostLoader}
        />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
