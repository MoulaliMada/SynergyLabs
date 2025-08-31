// components/users/UserForm.jsx
import { useState, useEffect } from "react";

export default function UserForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

 useEffect(() => {
  if (initialData && (initialData.name || initialData.email)) {
    setFormData({
      name: initialData.name || "",
      email: initialData.email || "",
    });
  }
}, [initialData]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn">Save</button>
    </form>
  );
}
