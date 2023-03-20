import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blog: blogReducer,
    loggedInUser: loggedInUserReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
