// components/users/UserList.jsx
import UserItem from "./UserItem";

export default function UserList({ users, onDelete }) {
  return (
    <div>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        users.map((user) => (
          <UserItem key={user.id} user={user} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
