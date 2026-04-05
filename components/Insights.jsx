import React, { useMemo, useState, useEffect } from 'react';
import { useStore } from '../store/store';
import '../styles/Insights.css';
import CurrencySelector from './CurrencySelector';
import { Line, Bar, Pie } from 'react-chartjs-2';
import TransactionEditor from './TransactionEditor';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const Insights = () => {
  const { state } = useStore();
  const { transactions, userRole, currency } = state;
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();

  // ✅ Trigger animation on load
  useEffect(() => {
    setTimeout(() => setShowChart(true), 300);
  }, []);

  if (isEditorOpen && userRole === 'Admin') {
    return <TransactionEditor onClose={() => setEditorOpen(false)} />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="insights">
        <div className="insights-header">
          <h2>Insights</h2>
          <button className="dashboard-btn" onClick={() => navigate('/')}>
            ← Dashboard
          </button>
        </div>
        <p className="no-data-message">No transactions yet. Add some transactions to see insights.</p>
      </div>
    );
  }

  const getFilteredTransactions = (months) => {
    const now = new Date('2026-04-06');
    const cutoffDate = new Date(now);
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    return transactions.filter((t) => new Date(t.date) >= cutoffDate);
  };

  // ✅ Filter by selected month OR use time range
  const filteredTransactions = selectedMonth 
    ? transactions.filter((t) => t.date && t.date.startsWith(selectedMonth))
    : getFilteredTransactions(timeRange);

  const balanceData = useMemo(() => {
    const monthlyTotals = {};
    let runningBalance = 0;

    filteredTransactions
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((t) => {
        const month = t.date ? t.date.slice(0, 7) : '2026-04';
        const amount = t.type === 'Income' ? t.amount : -t.amount;
        runningBalance += amount;
        monthlyTotals[month] = runningBalance;
      });

    const labels = Object.keys(monthlyTotals).sort();
    const data = labels.map((m) => monthlyTotals[m]);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [{
        label: 'Balance Trend',
        data: data.length ? data : [0],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52,152,219,0.2)',
        fill: true,
        tension: 0.4,
      }],
    };
  }, [filteredTransactions]);

  const spendingData = useMemo(() => {
    const categoryTotals = {};

    filteredTransactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
        const cat = t.category || 'Uncategorized';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + (t.amount || 0);
      });

    const labels = Object.keys(categoryTotals);
    const data = labels.map((c) => categoryTotals[c]);

    return {
      labels: labels.length ? labels : ['No Expenses'],
      datasets: [{
        label: 'Spending Breakdown',
        data: data.length ? data : [0],
        backgroundColor: ['#3498db','#e74c3c','#f1c40f','#2ecc71','#9b59b6'],
        borderWidth: 2,
      }],
    };
  }, [filteredTransactions]);

  const incomeExpenseData = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'Income')
      .reduce((s, t) => s + (t.amount || 0), 0);

    const expense = filteredTransactions
      .filter((t) => t.type === 'Expense')
      .reduce((s, t) => s + (t.amount || 0), 0);

    return {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Income vs Expense',
        data: [income, expense],
        backgroundColor: ['#2ecc71','#e74c3c'],
      }],
    };
  }, [filteredTransactions]);

  const categoryData = useMemo(() => {
    const categories = {};

    filteredTransactions.forEach((t) => {
      const cat = t.category || 'Uncategorized';
      categories[cat] = (categories[cat] || 0) + Math.abs(t.amount || 0);
    });

    const labels = Object.keys(categories).sort();
    const data = labels.map((c) => categories[c]);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [{
        label: 'Category Comparison',
        data: data.length ? data : [0],
        backgroundColor: ['#3498db','#e74c3c','#f1c40f','#2ecc71'],
      }],
    };
  }, [filteredTransactions]);

  // 🥧 Pie - ROUND animation
  const pieOptions = {
    responsive: true,
    animation: {
      duration: 1400,
      easing: "easeOutQuart",
      animateRotate: true,
      animateScale: false,
    },
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${formatCurrency(context.parsed, currency)}`;
          },
        },
      },
    },
  };

  // 📊 Bar - smooth + stagger animation
  const barOptions = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: "easeOutCubic",
    },
    animations: {
      y: {
        delay: (ctx) => ctx.dataIndex * 150,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${formatCurrency(context.parsed.y, currency)}`;
          },
        },
      },
    },
  };

  return (
    <div className="insights">
      <div className="insights-header">
        <h2>📊 Insights & Analytics</h2>
        <button className="dashboard-btn" onClick={() => navigate('/')}>
          ← Dashboard
        </button>
      </div>

      <CurrencySelector />

      <div className="month-selector">
        <label htmlFor="month-dropdown">📅 Select Month to View:</label>
        <select 
          id="month-dropdown" 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-dropdown"
        >
          <option value="">-- All Months --</option>
          {transactions && transactions.map((t) => {
            const month = t.date ? t.date.slice(0, 7) : '2026-04';
            return month;
          }).filter((month, index, arr) => arr.indexOf(month) === index).sort().map((month) => {
            const [year, monthNum] = month.split('-');
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthName = monthNames[parseInt(monthNum) - 1];
            return (
              <option key={month} value={month}>
                {monthName} {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="insight-item">
        <h3>📈 Balance Trend</h3>
        <Line data={balanceData} />
      </div>

      <div className="insight-item">
        <h3>🥧 Spending Breakdown</h3>
        {showChart && <Pie data={spendingData} options={pieOptions} />}
      </div>

      <div className="insight-item">
        <h3>💰 Income vs Expense</h3>
        <Bar data={incomeExpenseData} options={barOptions} />
      </div>

      <div className="insight-item">
        <h3>📋 Category Comparison</h3>
        <Bar data={categoryData} options={barOptions} />
      </div>
    </div>
  );
};

export default Insights;