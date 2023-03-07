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
import {
  setBlogReducer,
  appendBlog,
  incrementOfLike,
} from "./reducers/blogReducer";
import { useSelector } from "react-redux";

const App = () => {
  const noteFormRef = useRef();

  const dispatch = useDispatch();
  const importBlog = useSelector((state) => state.blog);
  //console.log(importBlog, "importBlog");

  // const [blogs, setBlogs] = useState([]);
  // console.log(blogs, "blogs of usestate");
  //console.log(setBlogs, "setblog");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({ message: null, type: null });

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogReducer(blogs)));
    //console.log(blogs, "blogs from inside useeffect");
    // console.log(setBlogReducer(), "setblogfunc");
    //console.log(blogService.getAll(), "blogservice func");
    //console.log(blogService.getAll().then(), "till then func");
  }, []);

  //console.log(blogs, "blogs of data");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      console.log(user, "user of app");
      blogService.setToken(user.token);
      setUser(user);
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

  const raisedLike = async (id, updatedObject) => {
    console.log(id, "id parameter");
    console.log(updatedObject, "objto update parameter");
    // const updatedBlog = blog.find((blogs) => blogs.id === id);
    //console.log(updatedBlog, "updatedBlog");
    //const newBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 };
    // console.log(newBlog, "newBlog");
    const response = await blogService.update(id, updatedObject);

    dispatch(incrementOfLike(response));
    // console.log(response.data, "response of like");

    // importBlog.map((blogs) => (blogs.id === id ? response : blogs));
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
    setUser(null);
  };

  const handleBlogCreate = async (blogObject) => {
    console.log(blogObject, "within the create blgObj 107");
    const returnedBlog = await blogService.create(blogObject);
    console.log(blogObject, "blgObj line 109");
    console.log(returnedBlog, "returnedBlog");
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

  // let sortedBlogs = importBlog.sort((a, b) => b.likes - a.likes);
  // console.log(sortedBlogs, "sortedBlog");
  return (
    <div>
      <h2>blogs</h2>

      {/* <Notification message={message?.message} type={message?.type} /> */}
      <Notification />
      {user === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <span>{user.name} logged-in </span>
          <button onClick={logOut}>log out</button>

          <h2>new blog</h2>
          {blogForm()}
          {importBlog.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              //importBlog={importBlog}
              // setBlogs={setBlogs}
              // blogs={blogs}
              user={user}
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
