import React from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";


const UsersContext = React.createContext(null);

export function UsersProvider({ children }) {
const [users, setUsers] = React.useState([]);
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState("");
const [message, setMessage] = React.useState("");


// Load on mount
React.useEffect(() => {
(async () => {
setLoading(true);
setError("");
try {
const data = await getUsers();
setUsers(data);
} catch (err) {
setError(err.message || "Failed to fetch users");
} finally {
setLoading(false);
}
})();
}, []);

const addUser = async (payload) => {
setError("");
const tempId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
const optimistic = { id: tempId, ...payload };
setUsers(prev => [optimistic, ...prev]);
setMessage("User created successfully");
try {
const created = await createUser(payload);
// JSONPlaceholder returns an id but not persistent; keep optimistic id
return created;
} catch (err) {
setUsers(prev => prev.filter(u => u.id !== tempId));
setMessage("");
setError(err.message || "Failed to create user");
throw err;
}
};

const editUser = async (id, payload) => {
setError("");
const prevUsers = users;
setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...payload } : u)));
setMessage("User updated successfully");
try {
const updated = await updateUser(id, payload);
return updated;
} catch (err) {
setUsers(prevUsers); // rollback
setMessage("");
setError(err.message || "Failed to update user");
throw err;
}
};


const removeUser = async (id) => {
setError("");
const prevUsers = users;
setUsers(prev => prev.filter(u => u.id !== id));
setMessage("User deleted successfully");
try {
await deleteUser(id);
return true;
} catch (err) {
setUsers(prevUsers); // rollback
setMessage("");
setError(err.message || "Failed to delete user");
throw err;
}
};


const value = { users, loading, error, message, setMessage, addUser, editUser, removeUser };
return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}


export function useUsers() {
const ctx = React.useContext(UsersContext);
if (!ctx) throw new Error("useUsers must be used inside <UsersProvider>");
return ctx;
}