import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationLink = ({ logOut }) => {
  const loginUser = useSelector((state) => state.loggedInUser);

  return (
    <div
      style={{
        padding: "5px",
        border: " 3px solid #82D2F7",
        backgroundColor: "#ccc",
      }}
    >
      <span>
        <Link to="/">Blogs</Link>
      </span>{" "}
      &nbsp;
      <span>
        <Link to="/users">Users</Link>
      </span>{" "}
      &nbsp;
      <span>{loginUser.name} logged-in </span>
      <button onClick={logOut}>log out</button>
    </div>
  );
};
export default NavigationLink;
