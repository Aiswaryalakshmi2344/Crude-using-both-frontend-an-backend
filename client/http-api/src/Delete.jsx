import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./delete.css"
const Delete = () =>
    {
        const [users, setUsers] = useState([]);
      
        // Fetch users on component mount
        useEffect(() => {
          fetchUsers();
        }, []);
      
        // Function to fetch users
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/hosting');
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        };
      
        // Function to delete a user
        const deleteUser = async (id) => {
          try {
            await axios.delete(`http://localhost:3000/api/hosting/${id}`);
            alert('User deleted successfully');
            fetchUsers();  // Refresh the list after deletion
          } catch (error) {
            console.error('Error deleting user:', error.message);
            alert('Failed to delete user');
          }
        };
      
        return (
          <div>
            <h1>User List</h1>
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                 <Link to ="/update"> <button >Update user</button></Link>
  <Link to="/"> <button > add user</button></Link> 
  
                </li>
              ))}
            </ul>
          </div>
        );
      }
      

export default Delete