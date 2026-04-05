import React from 'react';
import { useStore } from '../store/store';
import { getCurrencyList } from '../utils/currencyFormatter';
import './CurrencySelector.css';

const CurrencySelector = () => {
  const { state, dispatch } = useStore();
  const { currency } = state;

  const handleCurrencyChange = (e) => {
    dispatch({ type: 'SET_CURRENCY', payload: e.target.value });
  };

  return (
    <div className="currency-selector">
      <label htmlFor="currency-select">💱 Currency:</label>
      <select 
        id="currency-select"
        value={currency}
        onChange={handleCurrencyChange}
        className="currency-select"
      >
        {getCurrencyList().map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.code} - {curr.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
