import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Client() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/hosting") // Replace with your server's URL
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
           <Link to ='/post'><button>Add User</button></Link> 
           <Link to ='/update'><button>Update</button></Link>   
         <Link to ='/Delete' > <button>Delete</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Client;