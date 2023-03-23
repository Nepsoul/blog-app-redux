import { useMatch } from "react-router-dom";

const IndividualUser = ({ allUser }) => {
  const match = useMatch("users123/:hello123");
  const userLink = match
    ? allUser.length > 0
      ? allUser.find((user) => user.id === match.params.hello123)
      : null
    : null;

  //console.log(Number(match.params.id), "parm match id");

  //to remove error while refreshing individual user's created blog i.e. refreshing this component
  if (!userLink) {
    return null;
  }
  return (
    <div>
      <h2>{userLink.username}</h2>
      <h2>Added Blogs</h2>
      <div>
        <ul>
          {userLink.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndividualUser;
