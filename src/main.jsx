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
} from "./pages/index.js";
import {
  ProfilePosts,
  ProfileSaveds,
  ProtectedRoute,
} from "./components/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute authentication={false}>
              <Home />
            </ProtectedRoute>
          }
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
          path="categories/all"
          element={
            <ProtectedRoute authentication={false}>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute authentication={false}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePosts />} />
          <Route path="saved" element={<ProfileSaveds />} />
        </Route>

        <Route
          path="edit-post/:postId"
          element={
            <ProtectedRoute authentication={true}>
              <EditPost />
            </ProtectedRoute>
          }
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
