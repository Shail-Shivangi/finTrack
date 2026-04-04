import React from 'react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import RoleBasedUI from './components/RoleBasedUI';
import './styles/global.css';
import './styles/Transactions.css';
import './styles/RoleBasedUI.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Transactions />
      <RoleBasedUI />
    </div>
  );
}

export default App;
