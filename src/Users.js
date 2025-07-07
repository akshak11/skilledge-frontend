import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5228/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Fetch error:", error));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5228/api/user/${id}`)
      .then(() => {
        alert("User deleted successfully!");
        fetchUsers();
      })
      .catch(error => console.error("Delete error:", error));
  };

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setUpdatedName('');
    setUpdatedEmail('');
  };

  const updateUser = (id) => {
    const updatedUser = {
      ...users.find(u => u.id === id),
      name: updatedName,
      email: updatedEmail
    };

    axios.put(`http://localhost:5228/api/user/${id}`, updatedUser)
      .then(() => {
        alert("User updated successfully!");
        setEditingUserId(null);
        fetchUsers();
      })
      .catch(error => console.error("Update error:", error));
  };

 return (
  <div className="card p-4">
    <h2 className="mb-3">Users List</h2>
    <ul className="list-group">
      {users.map(user => (
        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
          {editingUserId === user.id ? (
            <div className="w-100">
              <input
                type="text"
                className="form-control mb-2"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <button className="btn btn-success btn-sm me-2" onClick={() => updateUser(user.id)}>Save</button>
              <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <div>
                <strong>{user.name}</strong> – {user.email}
              </div>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

}

export default Users;
