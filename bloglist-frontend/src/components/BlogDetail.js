import { Link, useMatch } from "react-router-dom";
import { useState } from "react";

const BlogDetail = ({ sortedBlogs, updateLikes }) => {
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? sortedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  if (!singleBlog) return null;

  const [inputValue, setInputValue] = useState("");
  const [comments, setComment] = useState([]);

  const handleBlogComment = (e) => {
    e.preventDefault();
    const newComment = { id: comments.length + 1, content: inputValue };
    setComment([...comments, newComment]);
    setInputValue("");
  };
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
      <form onSubmit={handleBlogComment}>
        <div>
          comments{" "}
          <input
            type="text"
            name="comment"
            value={inputValue}
            placeholder="comment"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">submit</button>
        </div>
        <ul>
          {comments.map((cmt) => {
            return <li key={cmt.id}>{cmt.content}</li>;
          })}
        </ul>
      </form>
    </div>
  );
};

export default BlogDetail;
