import { Link, useMatch } from "react-router-dom";

const BlogDetail = ({ sortedBlogs, updateLikes }) => {
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? sortedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  if (!singleBlog) return null;

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
    </div>
  );
};

export default BlogDetail;
