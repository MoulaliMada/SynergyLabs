// pages/HomePage.jsx
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userService";
import UserList from "../components/users/UserList";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>User Management</h1>
      <Link to="/add" className="btn">Add User</Link>
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
}
