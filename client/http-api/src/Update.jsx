import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Leave the password blank for security reasons
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/hosting");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Leave the password blank for security reasons
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("No user selected for update.");
      return;
    }

    try {
      // Make sure the PUT request includes the correct data
      await axios.put(`http://localhost:3000/api/hosting/${selectedUser._id}`, formData);

      alert("User updated successfully!");
      fetchUsers(); // Refresh the list of users
      setSelectedUser(null);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error updating user:", error.message);
      alert("Failed to update user.");
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
            <button onClick={() => handleUserSelection(user)}>Edit</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <form onSubmit={handleUpdate}>
          <h2>Update User Details</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setSelectedUser(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Update;
