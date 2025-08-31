// pages/AddUserPage.jsx
import { createUser } from "../api/userService";
import UserForm from "../components/users/UserForm";
import { useNavigate } from "react-router-dom";

export default function AddUserPage() {
  const navigate = useNavigate();

  const handleAdd = async (user) => {
    await createUser(user);
    navigate("/");
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm onSubmit={handleAdd} />
    </div>
  );
}
