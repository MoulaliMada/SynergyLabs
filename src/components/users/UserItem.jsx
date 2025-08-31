// components/users/UserItem.jsx
import { Link } from "react-router-dom";

export default function UserItem({ user, onDelete }) {
  return (
    <div className="user-item">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <div>
        <Link to={`/edit/${user.id}`} className="btn">Edit</Link>
        <button onClick={() => onDelete(user.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
