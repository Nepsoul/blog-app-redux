import { useState } from "react";
import blogService from "../services/blogs";
import { deleteBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
// import { setNotification } from "../reducers/notificationReducer";
// import { useSelector } from "react-redux";

const Blog = ({ blog, updateLikes }) => {
  const [display, setDisplay] = useState(false);

  //console.log(blog, "blog");

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showToggle = () => {
    setDisplay(!display);
  };

  const deletedBlog = async (id) => {
    console.log(id, "id from del service");
    await blogService.remove(id);
    // console.log(toRemove, "toRemove from Blog");
    dispatch(deleteBlog(id));

    // const del = blogs.find((blog) => blog.id === id);
  };
  //setBlogs(blogs.filter((blog) => blog.id !== id));
  // console.log(del, "itis de");
  // console.log(blog.id, "blog id from del file");
  //   const notifyMessage = window.confirm(
  //     `Remove blog "${del.title}" by ${del.author}`
  //   );
  //   if (notifyMessage) {
  //     await blogService.remove(id);
  //     setBlogs(blogs.filter((blog) => blog.id !== id));
  //   }

  //   dispatch(
  //     setNotification({
  //       message: `"${blog.title}" blog is deleted by ${blog.author}`,
  //       type: "error",
  //     })
  //   );

  //   setTimeout(() => {
  //     dispatch(setNotification({ message: null, type: null }));
  //   }, 5000);
  // };

  return (
    <div style={blogStyle}>
      {!display ? (
        <div className="blog">
          {blog.title} {blog.author}
          <button className={"view"} onClick={showToggle}>
            view
          </button>
        </div>
      ) : (
        <div>
          <div>
            {blog.title}
            <button onClick={showToggle}>hide</button>
          </div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes: {blog.likes}{" "}
            <button id="likeButton" onClick={() => updateLikes(blog.id)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>
            <button
              id="remove-button"
              style={{
                color: "brown",
                backgroundColor: "lightpink",
                font: " bold",
              }}
              onClick={() => {
                deletedBlog(blog.id);
              }}
            >
              remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
// {blog.user.id === user.id || blog.user ? (
//   <button
//     id="remove-button"
//     style={{
//       color: "brown",
//       backgroundColor: "lightpink",
//       font: " bold",
//     }}
//     onClick={() => {
//       deletedBlog(blog.id);
//     }}
//   >
//     remove
//   </button>
// ) : null}
