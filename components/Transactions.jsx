import React, { useState } from 'react';
import '../styles/Transactions.css';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

const mockTransactions = [
  { id: 1, date: '2026-04-01', amount: 50, category: 'Food', type: 'Expense' },
  { id: 2, date: '2026-04-02', amount: 200, category: 'Salary', type: 'Income' },
  { id: 3, date: '2026-04-03', amount: 30, category: 'Transport', type: 'Expense' },
  { id: 4, date: '2026-04-04', amount: 100, category: 'Freelance', type: 'Income' },
];

function Transactions() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setTransactions(sortedTransactions);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={handleSort}>
          {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />} Sort by Amount
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;