import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
//import { addNewComment } from "../reducers/commentReducer";
//import { setCommentStore } from "../reducers/commentReducer";
import { useDispatch } from "react-redux";
import { setComment } from "../reducers/blogReducer";
//import { setBlog } from "../reducers/blogReducer";

const BlogDetail = ({ sortedBlogs, updateLikes }) => {
  const blogMatch = useMatch("/blogs/:id");
  const singleBlog = blogMatch
    ? sortedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  //console.log(singleBlog.comments, "comt of blog detatil");
  // const commentStore = useSelector((state) => state.comments);

  //const commentSection = [...commentStore]; //directly redux store can not map, for this with new ref used
  const dispatch = useDispatch();

  // const [inputValue, setInputValue] = useState("");
  // const [comment, setComment] = useState([]);
  const [commentData, setCommentData] = useState({
    comment: "",
  });
  //console.log(commentData, "cmmtndata");
  const handleBlogComment = (e) => {
    e.preventDefault();
    //const newComment = { id: commentStore.length + 1, content: inputValue };
    // dispatch(setCommentStore([...commentSection, newComment]));

    // debugger;
    dispatch(setComment(singleBlog.id, commentData));
    setCommentData({ comment: "" });
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
            value={commentData.comment}
            //placeholder="input"
            onChange={(e) => {
              setCommentData({ ...commentData, comment: e.target.value });
            }}
          />
          <button type="submit">submit</button>
        </div>
      </form>
      {/* {singleBlog.comments.length !== 0
        ? singleBlog.comments.map((cmt, index) => (
            <>
              <ul>
                <li key={index}>{cmt.comment}</li>
              </ul>
            </>
          ))
        : null} */}
      {singleBlog.comments.map((cmt) => (
        <div key={cmt.id}>
          <ul>
            <li>
              {cmt.comment}
              {console.log(cmt.id, "cmt")}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlogDetail;
