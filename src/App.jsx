import React from 'react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import RoleBasedUI from './components/RoleBasedUI';
import Insights from './components/Insights';
import { StoreProvider } from './store/store';
import './styles/global.css';
import './styles/Transactions.css';
import './styles/RoleBasedUI.css';
import './styles/Insights.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Routes, Route } from 'react-router-dom';
import TransactionEditor from './components/TransactionEditor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transaction-editor/:id" element={<TransactionEditor />} />
          <Route path="/transaction-editor" element={<TransactionEditor />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
