import React from 'react';
import Users from './Users';
import AddUser from './AddUser';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">SkillEdge User Management</h1>
      <AddUser />
      <Users />
    </div>
  );
}

export default App;
