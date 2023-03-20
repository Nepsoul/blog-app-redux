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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setBlog } from "./reducers/blogReducer";
import { setAllUser } from "./reducers/userReducer";
const App = () => {
  const noteFormRef = useRef();

  const dispatch = useDispatch();
  const importBlog = useSelector((state) => state.blog);
  const loginUser = useSelector((state) => state.loggedInUser);
  const allUser = useSelector((state) => state.user);
  //console.log(allUser, "alluser");
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
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(user));
      blogService.setToken(user.token);
    }
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
        {/* <BlogForm /> */}
        <BlogForm createBlog={handleBlogCreate} />
      </Togglable>
    );
  };

  const sortedBlogs = [...importBlog].sort((a, b) => b.likes - a.likes);
  //console.log(sortedBlogs, "sortedBlog");

  useEffect(() => {
    blogService.getAllUsers().then((user) => dispatch(setAllUser(user)));
  }, []);

  const Users = () => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ padding: "25px 0 5px 0" }}>Users</th>
              <th style={{ padding: "25px 0 5px 0" }}>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td style={{ padding: "0 100px" }}>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

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
    <Router>
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
              <Route path="/*" element={<Error />} />
              <Route path="/users" element={<Users />} />
              <Route path="/" element={<Home />} />
            </Routes>

            {/* <h2>new blog</h2>
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
            ))} */}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
