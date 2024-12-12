import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import "./post.css";

function Post() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/hosting", {
        name,
        email,
        password,
      });

      // Display an alert with the response data
      alert("User added successfully");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Display an alert for errors
      alert(
        `Error adding user: ${error.response?.data || error.message}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Add User</button>
      {/* Corrected Link component for navigation */}
      <Link to="/delete">
        <button type="button">VIEW DETAILS</button>
      </Link>
    </form>
  );
}

export default Post;
