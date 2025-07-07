import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, role, password };

    axios.post('http://localhost:5228/api/user', newUser)
      .then(response => {
        console.log('User created:', response.data);
        alert('User created successfully!');
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error creating user!', error);
        alert('Error creating user');
      });
  };

  return (
    <div className="card p-4 mb-4">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Name:</label>
          <input type="text" className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-2">
          <label>Email:</label>
          <input type="email" className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-2">
  <label>Role:</label>
  <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
    <option value="">Select Role</option>
    <option value="Instructor">Instructor</option>
    <option value="Student">Student</option>
  </select>
</div>

        <div className="mb-2">
          <label>Password:</label>
          <input type="password" className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary mt-2">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
