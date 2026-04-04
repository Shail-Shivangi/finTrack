import React from 'react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import './styles/global.css';
import './styles/Transactions.css';
import 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Transactions />
    </div>
  );
}

export default App;
