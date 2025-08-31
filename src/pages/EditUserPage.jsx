// pages/EditUserPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api/userService";
import UserForm from "../components/users/UserForm";
import Spinner from "../components/common/Spinner";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    await updateUser(id, updatedUser);
    navigate("/");
  };

  if (!user) return <Spinner />;

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm initialData={user} onSubmit={handleUpdate} />
    </div>
  );
}
