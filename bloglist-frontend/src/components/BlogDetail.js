import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
import { setCommentStore } from "../reducers/commentReducer";
import { useSelector, useDispatch } from "react-redux";

const BlogDetail = ({ sortedBlogs, updateLikes }) => {
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? sortedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const commentStore = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  //console.log(commentStore, "cmtstore");

  const [inputValue, setInputValue] = useState("");
  //const [comments, setComment] = useState([]);

  const handleBlogComment = (e) => {
    e.preventDefault();
    const newComment = { id: commentStore.length + 1, content: inputValue };
    dispatch(setCommentStore([...commentStore, newComment]));
    setInputValue("");
  };

  if (!singleBlog) return "loading...";

  return (
    <div>
      <h2>Blogs</h2>
      <h2>{singleBlog.title}</h2>
      <div>
        <Link to={singleBlog.id}>{singleBlog.url}</Link>
      </div>
      &nbsp;
      <div>
        {singleBlog.likes} likes{" "}
        <button
          onClick={() => {
            updateLikes(singleBlog.id);
          }}
        >
          like
        </button>
      </div>{" "}
      <div>added by {singleBlog.author}</div>
      &nbsp;
      <form onSubmit={handleBlogComment}>
        <div>
          <strong> comments</strong>{" "}
          <input
            type="text"
            //name="input"
            value={inputValue}
            //placeholder="input"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">submit</button>
          <ul>
            {commentStore.map((cmt) => {
              return <li key={cmt.id}>{cmt.content}</li>;
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default BlogDetail;
