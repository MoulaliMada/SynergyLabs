// api/userService.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users"; 
// You can replace with your backend URL

export const getUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createUser = async (user) => {
  const res = await axios.post(API_URL, user);
  console.log(user)
  console.log(res.data)
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axios.put(`${API_URL}/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
