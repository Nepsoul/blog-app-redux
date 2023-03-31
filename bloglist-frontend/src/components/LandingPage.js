import Blog from "./Blog";
import { useSelector } from "react-redux";

const LandingPage = ({ blogForm, sortedBlogs, raisedLike }) => {
  const loginUser = useSelector((state) => state.loggedInUser);

  return (
    <div>
      <h2>Blog App</h2>
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

export default LandingPage;
