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
import { setBlogReducer, appendBlog, updateBlog } from "./reducers/blogReducer";
import { useSelector } from "react-redux";
import { setLoggedInUser } from "./reducers/loggedInUserReducer";

const App = () => {
  const noteFormRef = useRef();

  const dispatch = useDispatch();
  const importBlog = useSelector((state) => state.blog);
  const loginUser = useSelector((state) => state.loggedInUser);
  //console.log(importBlog, "import from store");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogReducer(blogs)));
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
    // console.log(updatedBlog, "update from app");
    const newBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 };

    const response = await blogService.update(id, newBlog);
    dispatch(updateBlog(response));
    //setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
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
        </>
      )}
    </div>
  );
};

export default App;
