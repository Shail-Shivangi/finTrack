// Currency symbols and formatting
const CURRENCY_MAP = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
};

export const formatCurrency = (amount, currency = 'USD') => {
  const currencyInfo = CURRENCY_MAP[currency] || CURRENCY_MAP['USD'];
  const symbol = currencyInfo.symbol;
  
  // Format amount with 2 decimal places
  const formatted = Number(amount || 0).toFixed(2);
  
  return `${symbol}${formatted}`;
};

export const getCurrencyList = () => {
  return Object.keys(CURRENCY_MAP).map((code) => ({
    code,
    name: CURRENCY_MAP[code].name,
    symbol: CURRENCY_MAP[code].symbol,
  }));
};

export const getCurrencySymbol = (currency = 'USD') => {
  return CURRENCY_MAP[currency]?.symbol || '$';
};
