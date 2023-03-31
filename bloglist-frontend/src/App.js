import { useState, useEffect, useRef } from "react";
//import Blog from "./components/Blog";
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
import { setAllUser, appendUserBlog } from "./reducers/userReducer";
import UsersList from "./components/UsersList";
import IndividualUser from "./components/IndividaulUser";
import BlogDetail from "./components/BlogDetail";

import { useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavigationLink from "./components/NavigationLink";

//import { setCommentStore } from "./reducers/commentReducer";

const App = () => {
  const noteFormRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const importBlog = useSelector((state) => state.blog);
  const loginUser = useSelector((state) => state.loggedInUser);
  const allUser = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userList, setUserList] = useState([]);
  // console.log(userList, "userlist");

  // const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({ message: null, type: null });

  // const commentStore = useSelector((state) => state.comments);
  // const commentStoreLength = 0;

  // useEffect(() => {
  //   if (commentStore.length > commentStoreLength) {
  //     dispatch(setBlog());
  //   }
  // }, [commentStore.length, dispatch]);

  useEffect(() => {
    dispatch(setBlog());

    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(user));
      blogService.setToken(user.token);
    }

    blogService.getAllUsers().then((users) => dispatch(setAllUser(users)));

    // blogService.getComments().then((id) => dispatch(setCommentStore(id)));
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
    const returnedBlog = await blogService.create(blogObject);
    dispatch(appendBlog(returnedBlog));
    dispatch(appendUserBlog(returnedBlog));
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

  //const sortedBlogs = [...importBlog].sort((a, b) => b.likes - a.likes);

  const Error = () => {
    return (
      <div>
        <h2>URL not Matched</h2>
      </div>
    );
  };

  return (
    <div>
      {/* <Notification message={message?.message} type={message?.type} /> */}
      <div>
        {" "}
        <Notification />
      </div>
      &nbsp;
      {loginUser === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <NavigationLink logOut={logOut} />
          <Routes>
            <Route
              path="/users123/:id"
              element={<IndividualUser allUser={allUser} />}
            />
            <Route path="/*" element={<Error />} />
            <Route path="/users" element={<UsersList allUser={allUser} />} />
            <Route
              path="/"
              element={
                <LandingPage
                  blogForm={blogForm}
                  sortedBlogs={importBlog}
                  raisedLike={raisedLike}
                />
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetail sortedBlogs={importBlog} updateLikes={raisedLike} />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
