import { Link, useMatch } from "react-router-dom";
import { useState } from "react";

const BlogDetail = ({ sortedBlogs, updateLikes }) => {
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? sortedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const [inputValue, setInputValue] = useState("");
  const [comments, setComment] = useState([]);

  const handleBlogComment = (e) => {
    e.preventDefault();
    const newComment = { id: comments.length + 1, content: inputValue };
    setComment([...comments, newComment]);
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
            {comments.map((cmt) => {
              return <li key={cmt.id}>{cmt.content}</li>;
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default BlogDetail;
