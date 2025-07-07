import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', role: '', password: '' });

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    axios.get('http://localhost:5228/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  const createUser = () => {
    axios.post('http://localhost:5228/api/user', newUser)
      .then(() => {
        setNewUser({ name: '', email: '', role: '', password: '' });
        refreshUsers();
      })
      .catch(error => console.error(error));
  };

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setUpdatedUser(user);
  };

  const updateUser = () => {
    axios.put(`http://localhost:5228/api/user/${editingUserId}`, updatedUser)
      .then(() => {
        setEditingUserId(null);
        setUpdatedUser({ name: '', email: '', role: '', password: '' });
        refreshUsers();
      })
      .catch(error => console.error(error));
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setUpdatedUser({ name: '', email: '', role: '', password: '' });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5228/api/user/${id}`)
      .then(() => refreshUsers())
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4 text-center">Admin Dashboard – Manage Users</h2>

      <div className="card p-3 mb-4">
        <h4>Add New User</h4>
        <div className="row g-2">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="email" className="form-control" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div className="col-md-2">
            <select className="form-select" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="col-md-2">
            <input type="password" className="form-control" placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={createUser}>Add User</button>
          </div>
        </div>
      </div>

      <h4 className="mb-3">All Users</h4>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            editingUserId === user.id ? (
              <tr key={user.id}>
                <td><input className="form-control" value={updatedUser.name} onChange={e => setUpdatedUser({ ...updatedUser, name: e.target.value })} /></td>
                <td><input className="form-control" value={updatedUser.email} onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })} /></td>
                <td>
                  <select className="form-select" value={updatedUser.role} onChange={e => setUpdatedUser({ ...updatedUser, role: e.target.value })}>
                    <option value="Admin">Admin</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Student">Student</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-success me-2" onClick={updateUser}>Save</button>
                  <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => startEdit(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
