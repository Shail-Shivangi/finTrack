import React from 'react';
import './Dashboard.css';

const mockData = {
  totalBalance: 10000,
  income: 5000,
  expenses: 3000,
  balanceTrend: [
    { month: 'January', balance: 8000 },
    { month: 'February', balance: 9000 },
    { month: 'March', balance: 10000 },
  ],
  spendingBreakdown: [
    { category: 'Food', amount: 2000 },
    { category: 'Transport', amount: 1000 },
    { category: 'Entertainment', amount: 500 },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
      <div className="summary-cards">
        <div className="card">
          <h2>Total Balance</h2>
          <p>${mockData.totalBalance}</p>
        </div>
        <div className="card">
          <h2>Income</h2>
          <p>${mockData.income}</p>
        </div>
        <div className="card">
          <h2>Expenses</h2>
          <p>${mockData.expenses}</p>
        </div>
      </div>
      <div className="visualizations">
        <div className="chart">
          <h3>Balance Trend</h3>
          <ul>
            {mockData.balanceTrend.map((data, index) => (
              <li key={index}>{data.month}: ${data.balance}</li>
            ))}
          </ul>
        </div>
        <div className="chart">
          <h3>Spending Breakdown</h3>
          <ul>
            {mockData.spendingBreakdown.map((data, index) => (
              <li key={index}>{data.category}: ${data.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;