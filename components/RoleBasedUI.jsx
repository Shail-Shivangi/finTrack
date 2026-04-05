import React, { useState } from 'react';
import '../styles/RoleBasedUI.css';

const RoleBasedUI = () => {
  const [role, setRole] = useState('Guest');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const renderContent = () => {
    switch (role) {
      case 'Admin':
        return <div className="role-content">Welcome, Admin! You have full access to the system.</div>;
      case 'User':
        return <div className="role-content">Welcome, User! You can view and manage your transactions.</div>;
      case 'Guest':
        return <div className="role-content">Welcome, Guest! Please sign in to access more features.</div>;
      default:
        return <div className="role-content">Invalid role selected.</div>;
    }
  };

  return (
    <div className="role-based-ui">
      <h2>Role-Based UI Simulation</h2>
      <div className="role-selector">
        <label htmlFor="role">Select Role:</label>
        <select id="role" value={role} onChange={handleRoleChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
      {renderContent()}
    </div>
  );
};

export default RoleBasedUI;