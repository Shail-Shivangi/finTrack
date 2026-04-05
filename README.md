# 💰 Fintrack - Financial Dashboard Application

A modern, feature-rich financial tracking application built with React that helps users track income, expenses, and manage their finances with beautiful visualizations and multi-currency support.

---

## 🎯 Project Overview

Fintrack is a comprehensive financial dashboard application that allows users to:
- Track income and expenses with detailed transactions
- View financial analytics through multiple chart types
- Manage finances in 10 different currencies
- Control access with role-based permissions (Admin/Viewer)
- Filter and analyze financial data by time periods
- Get a quick overview with summary cards and recent transactions

---

## ✨ Key Features

### 📊 Dashboard
- **Financial Overview**: Display total balance, income, expenses, and transaction count
- **Summary Cards**: Four interactive cards with emoji icons and color-coded styling:
  - 💳 Total Balance (Blue themed)
  - 💹 Total Income (Green themed)
  - 💸 Total Expenses (Red themed)
  - 📋 Transaction Count (Purple themed)
- **Clickable Charts**: Navigate to detailed analytics by clicking chart sections
- **Recent Transactions**: Shows 6 latest transactions at a glance
- **Currency Selector**: Switch between 10 currencies globally

### 📈 Analytics & Insights
- **Balance Trend Chart**: Line chart showing balance changes over time
- **Spending Breakdown Chart**: Pie chart visualizing expenses by category
- **Income vs Expense Chart**: Bar chart comparing income and expenses
- **Category Comparison Chart**: Bar chart showing spending across different categories
- **Month Filtering**: Dropdown to select specific months for analysis
- **Dynamic Data**: Charts update automatically based on selected month and currency

### 💳 Transaction Management
- **Complete CRUD Operations**: Create, read, update, and delete transactions
- **Transaction Filtering**: Filter by category or transaction type (Income/Expense)
- **Sorting**: Sort transactions by amount (ascending/descending)
- **Search**: Quick search by category name
- **Admin Controls**: Edit and delete buttons for administrators
- **Dashboard Navigation**: All users can access dashboard

### 🌍 Multi-Currency Support
Supports 10 major currencies with real-time formatting:
- **USD** - US Dollar
- **EUR** - Euro
- **GBP** - British Pound
- **INR** - Indian Rupee
- **JPY** - Japanese Yen
- **CAD** - Canadian Dollar
- **AUD** - Australian Dollar
- **CHF** - Swiss Franc
- **CNY** - Chinese Yuan
- **SGD** - Singapore Dollar

Currency selection is persistent across all pages via localStorage.

### 🔐 Role-Based Access Control
- **Admin Role**: Full access to create, edit, and delete transactions
- **Viewer Role**: Read-only access to view transactions and analytics
- **Mode Selection**: Simple interface to switch between roles
- **Persistent Storage**: Selected role is saved in localStorage

---

## 🛠️ Technology Stack

### Frontend Framework & Build
- **React 18.2**: Modern UI library with hooks
- **Vite**: Fast build tool with HMR (Hot Module Reloading)
- **React Router v6**: Client-side routing and navigation

### State Management & Data
- **Context API + useReducer**: Global state management pattern
- **localStorage**: Persistent data storage with validation
- **Data Sanitization**: Input validation and safe data handling

### Visualization & Charts
- **Chart.js 4.5**: Charting library for data visualization
- **react-chartjs-2**: React wrapper for Chart.js
- **Supported Charts**: Line, Pie, Bar charts with animations

### Styling & UI
- **CSS Modules**: Component-scoped styling
- **Global CSS**: Theme consistency across app
- **Gradient Backgrounds**: Modern purple-to-cyan gradients
- **Keyframe Animations**: Smooth transitions and entrance effects
- **Responsive Design**: Mobile-first approach

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with summary cards
│   ├── Dashboard.css          # Dashboard styling and animations
│   ├── Insights.jsx           # Analytics page with charts
│   ├── Insights.css           # Analytics styling
│   ├── Transactions.jsx       # Transaction list and management
│   ├── Transactions.css       # Transactions table styling
│   ├── EditTransaction.jsx    # Transaction editor (Admin only)
│   ├── RoleBasedUI.jsx        # Role selection interface
│   ├── CurrencySelector.jsx   # Global currency dropdown
│   └── CurrencySelector.css   # Currency selector styling
├── store/
│   └── store.jsx              # Global Redux-like store with Context API
├── utils/
│   └── currencyFormatter.js   # Currency formatting utilities
├── styles/
│   └── (Global stylesheets)
├── App.jsx                    # Main app component with routing
├── App.css                    # App-level styling
├── index.css                  # Global styles
└── main.jsx                   # React entry point
```

---

## 📋 Component Descriptions

### Dashboard Component
**Purpose**: Main landing page with financial overview  
**Features**:
- Animated gradient title: "💰 Financial Dashboard: Track. Analyze. Succeed."
- 4 Summary cards showing key financial metrics
- 2 Clickable chart sections (Balance Trend & Spending Breakdown)
- Recent transactions list (6 latest)
- Role-based UI component
- Currency selector
- All amounts formatted with selected currency

**Key Props**: None (reads from global store)  
**Dependencies**: CurrencySelector, formatCurrency, Router

### Insights Component
**Purpose**: Advanced analytics with multiple chart types  
**Features**:
- Month dropdown selector with formatted month names
- Dynamic chart updates based on selected month
- 4 different chart types (Line, Pie, Bar)
- Currency formatting in tooltips
- Responsive grid layout
- Animated chart entrance effects

**Charts Included**:
1. **Balance Trend**: Line chart showing balance progression
2. **Spending Breakdown**: Pie chart of expenses by category
3. **Income vs Expense**: Bar chart comparing totals
4. **Category Comparison**: Bar chart of category spending

### Transactions Component
**Purpose**: Full transaction list with management  
**Features**:
- Search by category
- Filter by transaction type (All/Income/Expense)
- Sort by amount (ascending/descending)
- Admin edit/delete buttons
- Dashboard navigation button for all users
- Currency formatted amounts
- Responsive table layout

### RoleBasedUI Component
**Purpose**: Role selection and mode switching  
**Features**:
- Role dropdown (Admin/Viewer)
- Color-coded mode messaging
- Permission-based feature access
- localStorage persistence
- Simple, clean interface (no modal popup)

### CurrencySelector Component
**Purpose**: Global currency selection dropdown  
**Features**:
- 10 currency options
- Connected to global store
- Consistent formatting across app
- Smooth transitions
- Orange accent styling

### Store (Global State Management)
**State Properties**:
- `transactions`: Array of transaction objects
- `currency`: Currently selected currency (default: USD)
- `role`: User role (Admin/Viewer)

**Actions**:
- `ADD_TRANSACTION`: Create new transaction
- `EDIT_TRANSACTION`: Update existing transaction
- `DELETE_TRANSACTION`: Remove transaction
- `SET_CURRENCY`: Change global currency
- `SET_ROLE`: Switch user role

**Data Persistence**: All state saved to localStorage with validation

---

## 🎨 Design & Styling Features

### Color Scheme
- **Primary Gradient**: #667eea → #764ba2 → #00b4d8 (Purple to Cyan)
- **Summary Cards**:
  - Balance: Blue (#3498db)
  - Income: Green (#2ecc71)
  - Expense: Red (#e74c3c)
  - Transaction: Purple (#9b59b6)
- **Text**: Professional gray (#2c3e50, #7f8c8d)
- **Background**: Clean white (#ffffff, #f9f9f9)

### Animations
- **slideInDown**: Title entrance (0.7s)
- **bounceIn**: Icon load animation (0.6s)
- **Scale Hover**: Icon hover effect (1.15x)
- **Shimmer**: Chart hover shimmer effect
- **Chart Animations**: 1200-1400ms staggered entrance

### Icons & Visual Elements
- **Summary Card Icons**: 3em, colored backgrounds, border-radius 16px
- **Chart Icons**: 2.5em, colored backgrounds, border-radius 14px
- **Emoji Icons**: Professional emoji for visual interest
- **Box Shadows**: Layered shadows for depth and elevation

---

## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd fintrack-app

# Install dependencies
npm install
```

### Development Server
```bash
# Start the development server with HMR
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 📊 How to Use

### 1. First Time Setup
- You'll see the **RoleBasedUI** component on first visit
- Select your role: **Admin** (full access) or **Viewer** (read-only)
- Your choice is saved in localStorage

### 2. Dashboard Overview
- View 4 summary cards showing your financial snapshot
- See recent transactions at a glance
- Click on "Balance Trend" or "Spending Breakdown" to analyze details
- Use the currency dropdown to view amounts in different currencies

### 3. Add Transactions (Admin Only)
- Click "Add New Transaction" (visible only to Admins)
- Fill in amount, category, type (Income/Expense), and date
- Transactions are immediately saved to localStorage

### 4. View Analytics
- Navigate to **Insights** page
- Select a month from the dropdown
- View 4 different charts with filtered data
- All amounts display in your selected currency
- Hover over charts for detailed tooltips

### 5. Manage Transactions
- Go to **Transactions** page
- Search by category or filter by type
- Sort by amount for quick analysis
- Admin users can edit or delete transactions
- All users can navigate back to dashboard

### 6. Switch Currencies
- Use the $$ **Currency Selector** dropdown on any page
- Selection is persistent across all pages
- All charts and amounts update automatically

---

## 💾 Data Storage

All data is stored in browser's **localStorage** with the following keys:
- `fintrack_transactions`: Array of transaction objects
- `fintrack_currency`: Selected currency code
- `fintrack_role`: Selected user role

Data persists across browser sessions and is never sent to external servers.

---

## 🔄 Transaction Object Structure

```javascript
{
  id: 'unique-id',
  amount: 1500,
  category: 'Salary',
  description: 'Monthly salary',
  type: 'income',  // 'income' or 'expense'
  date: '2026-04-06',
  createdAt: 1712400000000
}
```

---

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

All components adapt gracefully to different screen sizes with flexible grid layouts and responsive font sizes.

---

## 🐛 Known Features & Limitations

### Supported Features
✅ Multi-currency formatting (10 currencies)  
✅ Role-based access control  
✅ Complete transaction CRUD  
✅ Multiple chart types and visualizations  
✅ Month-based filtering  
✅ Search and sort functionality  
✅ localStorage persistence  
✅ Responsive design  
✅ Smooth animations  
✅ Emoji-enhanced UI  

### Current Scope
- Client-side only (no backend server)
- localStorage data limited to browser capacity
- No user authentication system
- No export/import functionality
- No budget planning features

---

## 🔮 Future Enhancement Ideas

- Backend API integration for data persistence
- User authentication and cloud sync
- Budget planning and alerts
- Recurring transaction templates
- Export data to CSV/PDF
- Mobile app with React Native
- Dark mode toggle
- Transaction categories customization
- Expense forecasting with AI
- Receipt image upload

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for financial empowerment and modern web development.
GitHub: https://github.com/Shail-Shivangi/finTrack

