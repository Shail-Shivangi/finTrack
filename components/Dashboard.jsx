import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
      <div className="summary-cards">
        <div className="card">
          <h2>Total Balance</h2>
          <p>$10,000</p>
        </div>
        <div className="card">
          <h2>Income</h2>
          <p>$5,000</p>
        </div>
        <div className="card">
          <h2>Expenses</h2>
          <p>$3,000</p>
        </div>
      </div>
      <div className="visualizations">
        <div className="chart">
          <h3>Balance Trend</h3>
          <p>[Time-based Visualization]</p>
        </div>
        <div className="chart">
          <h3>Spending Breakdown</h3>
          <p>[Categorical Visualization]</p>
        </div>
      </div>
      <div className="insights">
        <h3>Insights</h3>
        <ul>
          <li>Highest Spending Category: Food</li>
          <li>Monthly Comparison: +10% Income Growth</li>
          <li>Observation: Expenses reduced by 5%</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;