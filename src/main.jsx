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
  NotFound,
  Error,
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
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route
          index
          element={
            <ProtectedRoute authentication={false}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="blog/:id"
          element={
            <ProtectedRoute authentication={false}>
              <Blog />
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
          path="categories/:id"
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
          path="profile/edit/:id"
          element={
            <ProtectedRoute authentication={true}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="edit-post/:id"
          element={
            <ProtectedRoute authentication={true}>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
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
