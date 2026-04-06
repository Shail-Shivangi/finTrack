import React, { useMemo, useState } from 'react';
import { useStore } from '../store/store';
import '../styles/Transactions.css';
import CurrencySelector from './CurrencySelector';
import { useNavigate } from 'react-router-dom';
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { formatCurrency } from '../utils/currencyFormatter';

function Transactions() {
  const { state, dispatch } = useStore();
  const { transactions, filters, userRole, currency } = state;
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { search: e.target.value },
    });
  };

  const handleTypeFilterChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { type: e.target.value },
    });
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredTransactions = useMemo(() => {
    const searchTerm = (filters?.search || '').toLowerCase().trim();
    const typeFilter = filters?.type || 'all';
    
    const filtered = transactions.filter((transaction) => {
      const matchesCategory = String(transaction?.category || '').toLowerCase().includes(searchTerm);
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      return matchesCategory && matchesType;
    });

    return filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? Number(a?.amount || 0) - Number(b?.amount || 0)
        : Number(b?.amount || 0) - Number(a?.amount || 0)
    );
  }, [transactions, filters, sortOrder]);

  const isAdmin = userRole === 'Admin';

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <button
          type="button"
          className="dashboard-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>
      <CurrencySelector />
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by category"
          value={filters?.search || ''}
          onChange={handleFilterChange}
        />
        <select
          value={filters?.type || 'all'}
          onChange={handleTypeFilterChange}
          className="type-filter"
        >
          <option value="all">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button onClick={handleSort}>
          {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />} Sort by Amount
        </button>
        {isAdmin && (
          <button onClick={() => navigate('/transaction-editor')}>Add Transaction</button>
        )}
      </div>
      {filteredTransactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date || '-'}</td>
                <td>{formatCurrency(transaction.amount || 0, currency)}</td>
                <td>{transaction.category || '-'}</td>
                <td>{transaction.type || '-'}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => navigate(`/transaction-editor/${transaction.id}`)}>
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })
                      }
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No transactions found.</p>
      )}
    </div>
  );
}

export default Transactions;