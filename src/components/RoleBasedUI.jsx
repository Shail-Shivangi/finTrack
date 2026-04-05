import React, { useState } from 'react';
import { useStore } from '../store/store';
import '../styles/RoleBasedUI.css';
import { useNavigate } from 'react-router-dom';

const RoleBasedUI = () => {
  const { state, dispatch } = useStore();
  const { userRole } = state;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    dispatch({ type: 'SET_ROLE', payload: selectedRole });
    
    if (selectedRole === 'Admin') {
      setMessage('Admin mode enabled.');
    } else {
      setMessage('Viewer mode enabled.');
    }
  };

  const openTransactionEditor = () => {
    if (userRole === 'Admin') {
      navigate('/transaction-editor');
      return;
    }
    setMessage('Only Admin can add or edit transactions.');
  };

  const renderContent = () => {
    switch (userRole) {
      case 'Admin':
        return (
          <div className="role-content">
            <p>Welcome, Admin! You can create, edit, and delete transactions.</p>
            <button onClick={openTransactionEditor}>Open Transaction Editor</button>
          </div>
        );
      case 'Viewer':
        return <div className="role-content">Welcome, Viewer! You can view transactions only.</div>;
      default:
        return <div className="role-content no-data">No role selected. Please choose a role.</div>;
    }
  };

  return (
    <div className="role-based-ui">
      <h2>Role-Based UI Simulation</h2>
      <div className="role-selector">
        <label htmlFor="role">Select Role:</label>
        <select id="role" value={userRole} onChange={handleRoleChange}>
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
      {message && <p className={`message ${userRole === 'Admin' ? 'admin-message' : 'viewer-message'}`}>{message}</p>}
      {renderContent()}
    </div>
  );
};

export default RoleBasedUI;