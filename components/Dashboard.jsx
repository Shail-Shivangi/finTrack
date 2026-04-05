import React, { useEffect, useMemo } from 'react';
import './Dashboard.css';
import RoleBasedUI from './RoleBasedUI';
import CurrencySelector from './CurrencySelector';
import { useStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

function Dashboard() {
  const { state } = useStore();
  const { transactions, currency } = state;
  const navigate = useNavigate();

  // ✅ Calculate balance trend from real transactions
  const balanceTrendData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    const monthlyTotals = {};
    let runningBalance = 0;

    transactions
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((transaction) => {
        const month = transaction.date ? transaction.date.slice(0, 7) : '2026-04';
        const amount = transaction.type === 'Income' ? transaction.amount : -transaction.amount;
        runningBalance += amount;
        monthlyTotals[month] = runningBalance;
      });

    return Object.keys(monthlyTotals)
      .sort()
      .map((month) => ({
        month,
        balance: monthlyTotals[month],
      }));
  }, [transactions]);

  // ✅ Calculate spending breakdown from real transactions
  const spendingBreakdownData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    const categoryTotals = {};
    transactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
        const category = t.category || 'Uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + (t.amount || 0);
      });

    return Object.keys(categoryTotals)
      .sort()
      .map((category) => ({
        category,
        amount: categoryTotals[category],
      }));
  }, [transactions]);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 6);

  useEffect(() => {
    console.log('Dashboard Transactions Updated:', transactions);
  }, [transactions]);

  console.log('Rendering Dashboard with Transactions:', transactions);

  return (
    <div className="dashboard">
      <h1 >💰 Financial Dashboard  <span className="subtitle">Track. Analyze. Succeed.</span></h1>
      <CurrencySelector />
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon icon-balance">💳</div>
          <h2>Total Balance</h2>
          <p>{formatCurrency(transactions.reduce((acc, t) => acc + (t.type === 'Income' ? t.amount : -t.amount), 0), currency)}</p>
        </div>
        <div className="card">
          <div className="card-icon icon-income">💹</div>
          <h2>Income</h2>
          <p>{formatCurrency(transactions.filter((t) => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0), currency)}</p>
        </div>
        <div className="card">
          <div className="card-icon icon-expense">💸</div>
          <h2>Expenses</h2>
          <p>{formatCurrency(transactions.filter((t) => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0), currency)}</p>
        </div>
        <div className="card">
          <div className="card-icon icon-transaction">📋</div>
          <h2>Total Transactions</h2>
          <p>{transactions.length}</p>
        </div>
      </div>
      <div className="visualizations">
        <div className="chart chart-clickable" onClick={() => navigate('/insights')}>
          <h3 className="chart-heading">
            <span className="chart-icon balance-chart-icon">📈</span>
            Balance Trend
          </h3>
          {balanceTrendData.length > 0 ? (
            <ul>
              {balanceTrendData.map((data, index) => (
                <li key={index}>
                  {data.month}: {formatCurrency(data.balance, currency)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-chart-data">No balance data available.</p>
          )}
          <p className="chart-click-hint">Click to view chart →</p>
        </div>
        <div className="chart chart-clickable" onClick={() => navigate('/insights')}>
          <h3 className="chart-heading">
            <span className="chart-icon expense-chart-icon">📊</span>
            Spending Breakdown
          </h3>
          {spendingBreakdownData.length > 0 ? (
            <ul>
              {spendingBreakdownData.map((data, index) => (
                <li key={index}>
                  {data.category}: {formatCurrency(data.amount, currency)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-chart-data">No expense data available.</p>
          )}
          <p className="chart-click-hint">Click to view pie chart →</p>
        </div>
      </div>
      <div className="transactions-list">
        <div className="transactions-list-header">
          <h3>Recent Transactions</h3>
          <button
            type="button"
            className="more-transactions-btn"
            onClick={() => navigate('/transactions')}
          >
            More Transactions
          </button>
        </div>
        <ul>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <li key={transaction.id} className="transaction-item">
                <span className="transaction-date">{transaction.date || '-'}</span>
                <span className="transaction-category">{transaction.category || '-'}</span>
                <span className={`transaction-type ${transaction.type === 'Income' ? 'income' : 'expense'}`}>
                  {transaction.type || '-'}
                </span>
                <span className="transaction-amount">{formatCurrency(transaction.amount || 0, currency)}</span>
              </li>
            ))
          ) : (
            <li className="no-transaction-data">No transactions available.</li>
          )}
        </ul>
      </div>
      <RoleBasedUI />
    </div>
  );
}

export default Dashboard;