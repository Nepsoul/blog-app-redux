import { Link } from "react-router-dom";

const UsersList = ({ allUser }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ padding: "25px 0 5px 0" }}>Users</th>
            <th style={{ padding: "25px 0 5px 0" }}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users123/` + user.id}>{user.username}</Link>
                </td>
                <td style={{ padding: "0 100px" }}>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default UsersList;
