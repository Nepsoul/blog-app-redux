import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { appendBlog, updateBlog } from "./reducers/blogReducer";
import { useSelector } from "react-redux";
import { setLoggedInUser } from "./reducers/loggedInUserReducer";
import { Routes, Route } from "react-router-dom";
import { setBlog } from "./reducers/blogReducer";
import { setAllUser } from "./reducers/userReducer";
import UsersList from "./components/UsersList";
import IndividualUser from "./components/IndividaulUser";
import BlogDetail from "./components/BlogDetail";

import { useNavigate } from "react-router-dom";
const App = () => {
  const noteFormRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const importBlog = useSelector((state) => state.blog);
  const loginUser = useSelector((state) => state.loggedInUser);
  const allUser = useSelector((state) => state.user);
  // console.log(allUser, "alluser");
  //console.log(importBlog, "import from store");
  //console.log(loginUser, "loginUser");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userList, setUserList] = useState([]);
  // console.log(userList, "userlist");

  // const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({ message: null, type: null });
  useEffect(() => {
    dispatch(setBlog());

    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(user));
      blogService.setToken(user.token);
    }

    blogService.getAllUsers().then((users) => dispatch(setAllUser(users)));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      dispatch(setLoggedInUser(user));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      //setMessage({ message: exception.response.data.error, type: "error" });
      dispatch(
        setNotification({
          message: exception.response.data.error,
          type: "error",
        })
      );

      setTimeout(() => {
        // setMessage({ message: null, type: null });
        // setMessage(null);
        dispatch(setNotification({ message: null, type: null }));
      }, 5000);
    }
  };

  const raisedLike = async (id) => {
    const updatedBlog = importBlog.find((blogs) => blogs.id === id);
    //console.log(updatedBlog, "update from app");
    const newBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 };
    const response = await blogService.update(id, newBlog);
    dispatch(updateBlog(response));
    //setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
    dispatch(
      setNotification({
        message: `you have liked "${newBlog.title}" blog which was added by "${newBlog.author}"`,
        type: "update",
      })
    );
    setTimeout(() => {
      dispatch(setNotification({ message: null, type: null }));
    }, 5000);
  };

  const loginForm = () => (
    <Togglable buttonLabel="show me login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setLoggedInUser(null));
    navigate("/");
  };

  const handleBlogCreate = async (blogObject) => {
    // console.log(blogObject, "within the create blgObj 107");
    const returnedBlog = await blogService.create(blogObject);
    //console.log(blogObject, "blgObj line 109");
    // console.log(returnedBlog, "returnedBlog");
    dispatch(appendBlog(returnedBlog));
    // setBlogs(blogs.concat(returnedBlog));
    //console.dir(noteFormRef.current(), "noteform");
    noteFormRef.current();
    //console.log(noteFormRef.current(), "returnedblog");
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm createBlog={handleBlogCreate} />
      </Togglable>
    );
  };

  const sortedBlogs = [...importBlog].sort((a, b) => b.likes - a.likes);
  //console.log(sortedBlogs, "sortedBlog");

  const Error = () => {
    return (
      <div>
        <h2>URL not Matched</h2>
      </div>
    );
  };

  const Home = () => {
    return (
      <div>
        <h2>new blog</h2>
        {blogForm()}
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // setBlogs={setBlogs}
            // blogs={blogs}
            user={loginUser}
            // setMessage={setMessage}
            updateLikes={raisedLike}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>

      {/* <Notification message={message?.message} type={message?.type} /> */}
      <Notification />
      {loginUser === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <span>{loginUser.name} logged-in </span>
          <button onClick={logOut}>log out</button>
          <Routes>
            <Route
              path="/users123/:id"
              element={<IndividualUser allUser={allUser} />}
            />
            <Route path="/*" element={<Error />} />
            <Route path="/users" element={<UsersList allUser={allUser} />} />
            <Route path="/blogs" element={<Home />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetail
                  sortedBlogs={sortedBlogs}
                  updateLikes={raisedLike}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
