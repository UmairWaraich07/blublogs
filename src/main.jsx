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
} from "./pages/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="categories/all" element={<Categories />} />
        <Route path="profile/:id" element={<Profile />} />
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
