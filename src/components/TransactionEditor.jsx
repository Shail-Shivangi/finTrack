import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TransactionEditor.css';

const TransactionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { transactions, userRole } = state;
  const isAdmin = userRole === 'Admin';

  const [formData, setFormData] = useState({
    date: '',
    type: 'Income',
    category: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('Transaction ID:', id);
    console.log('User Role:', userRole);

    if (id) {
      const transaction = transactions.find((t) => t.id === Number(id));
      if (transaction) {
        setFormData({
          date: transaction.date,
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount,
        });
      } else {
        setError('Transaction not found.');
      }
    }
  }, [id, transactions, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isAdmin) {
      setError('Only Admin can add or edit transactions.');
      return;
    }

    if (!formData.date || !formData.category || !formData.amount) {
      setError('All fields are required.');
      return;
    }

    if (id) {
      // Edit transaction
      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: { id: Number(id), ...formData },
      });
      setSuccessMessage('Transaction updated successfully!');
    } else {
      // Add new transaction
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: formData,
      });
      setSuccessMessage('Transaction added successfully!');
    }

    setTimeout(() => {
      setSuccessMessage('');
      navigate('/transactions');
    }, 2000);
  };

  const handleDelete = () => {
    if (!isAdmin) {
      setError('Only Admin can delete transactions.');
      return;
    }

    dispatch({ type: 'DELETE_TRANSACTION', payload: Number(id) });
    setSuccessMessage('Transaction editing ...');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/transactions');
    }, 2000);
  };

  const goToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="transaction-editor" >
      <div className="editor-header">
        <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <button type="button" className="dashboard-btn" onClick={goToDashboard}>
          Back to Dashboard
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Add Transaction
          </button>
          
          {isAdmin && (
            <button type="button" onClick={handleDelete} className="delete-button">
              Edit Transaction
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionEditor;