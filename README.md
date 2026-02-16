# Quotra Backend API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Environment Variables](#environment-variables)
5. [Database Models](#database-models)
6. [Controllers](#controllers)
7. [Routes](#routes)
8. [Middlewares](#middlewares)
9. [Utilities](#utilities)
10. [API Endpoints](#api-endpoints)
11. [Authentication Flow](#authentication-flow)
12. [Business Logic](#business-logic)
13. [Frontend Requirements](#frontend-requirements)
14. [Admin Panel Logic](#admin-panel-logic)
15. [User Dashboard Logic](#user-dashboard-logic)
16. [Error Handling](#error-handling)
17. [Security Considerations](#security-considerations)

## Introduction

Quotra is a comprehensive financial platform backend built with Node.js and Express.js. It provides a full-featured API for a crypto trading and investment platform with loan management, deposit/withdrawal systems, and administrative controls. The platform supports user registration, authentication, asset trading, loan applications, transaction management, and activity logging.

The backend serves both a user-facing dashboard and an admin panel, handling all CRUD operations, financial transactions, and business logic for the platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware
- **Logging**: Morgan (development)
- **Email Service**: Brevo (Sendinblue) API
- **Validation**: Express-async-handler for async error handling

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation Steps

1. **Clone the repository and navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend root directory with the following variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   BREVO_API_KEY=your_brevo_api_key
   BREVO_OTP_TEMPLATE_ID=your_template_id
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run server
   # or for production
   npm start
   ```

The server will start on the specified PORT (default 5000) and connect to MongoDB Atlas.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGO_URI | MongoDB connection string | Yes |
| PORT | Server port (default: 5000) | No |
| JWT_SECRET | Secret key for JWT token generation | Yes |
| BREVO_API_KEY | API key for Brevo email service | Yes |
| BREVO_OTP_TEMPLATE_ID | Template ID for OTP emails | Yes |
| NODE_ENV | Environment (development/production) | No |

## Database Models

### User Model
**File**: `models/User.js`

The User model represents platform users with authentication and profile information.

**Schema Fields**:
- `username`: String, required, unique
- `email`: String, required, unique
- `password`: String, required (auto-hashed)
- `role`: String, enum: ['user', 'admin'], default: 'user'
- `balance`: Number, default: 0
- `profilePictureUrl`: String, default: ''
- `fullName`: String, default: ''
- `phone`: String, default: ''
- `withdrawalAccount`: String, default: ''
- `profileImageUrl`: String, default: ''
- `last_login`: Date, default: null
- `totalIncome`: Number, default: 0
- `totalBalance`: Number, default: 0
- `accountStatus`: String, default: 'pending_verification'
- `otp`: String, default: ''
- `otpExpires`: Date, default: null
- `createdAt`: Date, default: Date.now

**Methods**:
- `matchPassword(enteredPassword)`: Compares entered password with hashed password

**Pre-save Hook**: Automatically hashes password using bcrypt before saving.

### Asset Model
**File**: `models/Asset.js`

Represents tradable assets/investment products.

**Schema Fields**:
- `name`: String, required
- `symbol`: String, required, unique
- `priceRange`: String, required
- `features`: Array of objects with `text` and `included` boolean
- `profitPotential`: Number, required
- `tradeDurationDays`: Number, default: null
- `buttonText`: String, default: ''
- `isPopular`: Boolean, default: false
- `period`: String, default: ''
- `tradeTime`: String, default: ''
- `createdAt`: Date, default: Date.now

### AssetOrder Model
**File**: `models/AssetOrder.js`

Records user orders for assets.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `assetId`: ObjectId ref to Asset, required
- `orderId`: String, required
- `orderDate`: Date, default: Date.now
- `status`: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'
- `priceAtOrder`: Number, required
- `invitedByUserId`: ObjectId ref to User, default: null
- `editorDiscountApplied`: Boolean, default: false
- `createdAt`: Date, default: Date.now

### Transaction Model
**File**: `models/Transaction.js`

General transaction records.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `type`: String, required
- `amount`: Number, required
- `status`: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending'
- `description`: String, default: ''
- `transactionDate`: Date, default: Date.now
- `createdAt`: Date, default: Date.now

### DepositRequest Model
**File**: `models/DepositRequest.js`

Handles user deposit requests.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `username`: String, required
- `crypto`: String, required
- `blockchain`: String, required
- `walletAddress`: String, required
- `paymentMethod`: String, required
- `amount`: Number, required
- `transactionId`: String, default: 'N/A'
- `requestDate`: Date, default: Date.now
- `status`: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending'

### WithdrawalRequest Model
**File**: `models/WithdrawalRequest.js`

Handles user withdrawal requests.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `username`: String, required
- `amount`: Number, required
- `walletAddress`: String, required
- `requestDate`: Date, default: Date.now
- `status`: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending'

### LoanType Model
**File**: `models/LoanType.js`

Defines different loan products.

**Schema Fields**:
- `name`: String, required, unique
- `interestRate`: String, required
- `term`: String, required
- `amountRange`: String, required
- `quota`: String, required
- `descriptionPoints`: Array of objects with `text` and `included` boolean
- `applicationFee`: Number, required
- `buttonText`: String, default: ''
- `buttonLink`: String, default: ''
- `createdAt`: Date, default: Date.now

### LoanOrder Model
**File**: `models/LoanOrder.js`

Records user loan applications.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `createdAt`: Date, default: Date.now

### Bonus Model
**File**: `models/Bonus.js`

Tracks bonuses awarded to users.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `username`: String, required
- `amount`: Number, required
- `reason`: String, default: ''
- `dateAdded`: Date, default: Date.now
- `createdAt`: Date, default: Date.now

### Activity Model
**File**: `models/Activity.js`

Logs user activities for security and analytics.

**Schema Fields**:
- `userId`: ObjectId ref to User, required
- `activityType`: String, required
- `details`: Object with ipAddress, city, country, regionName, status
- `timestamp`: Date, default: Date.now
- `createdAt`: Date, default: Date.now

### AdminSettings Model
**File**: `models/AdminSettings.js`

Global admin configuration, primarily for crypto wallet addresses.

**Schema Fields**:
- `id`: String, required, unique, default: 'globalAdminSettings'
- `bitcoin`: Object with blockchain and walletAddress
- `ethereum`: Object with blockchain and walletAddress
- `usdt`: Object with blockchain and walletAddress
- `createdAt`: Date, default: Date.now
- `updatedAt`: Date, default: Date.now

## Controllers

### User Controller
**File**: `controllers/userController.js`

Handles user authentication and profile management.

**Functions**:
- `authUser`: Authenticates user login, returns JWT token
- `registerUser`: Creates new user account, auto-logs in
- `getUserProfile`: Returns current user's profile data
- `updateUserProfile`: Updates user profile information
- `getUserById`: Admin function to get user by ID
- `updateUser`: Admin function to update user data
- `getUsers`: Admin function to get all users

**Key Logic**:
- Password hashing with bcrypt (10 salt rounds)
- JWT token generation with 30-day expiration
- Role-based access control (user/admin)
- Profile image URL handling

### Asset Controller
**File**: `controllers/assetController.js`

Manages investment assets/products.

**Functions**:
- `getAssets`: Public - Get all assets
- `getAllAssetsAdmin`: Admin - Get all assets for admin panel
- `getAssetById`: Get single asset by ID
- `createAsset`: Admin - Create new asset
- `updateAsset`: Admin - Update existing asset
- `deleteAsset`: Admin - Delete asset

**Key Logic**:
- Flexible asset creation with dynamic field handling
- Admin-only CRUD operations
- Public read access for frontend display

### AssetOrder Controller
**File**: `controllers/assetOrderController.js`

Handles asset trading orders.

**Functions**:
- `createAssetOrder`: Create new asset order
- `getMyAssetOrders`: Get user's orders
- `getAssetOrders`: Admin - Get all orders
- `getAssetOrderById`: Get specific order
- `updateAssetOrderStatus`: Admin - Update order status

**Key Logic**:
- Balance validation before order creation
- Automatic balance deduction on order creation
- Referral system with invitedByUserId
- Status management (pending/approved/rejected)

### Transaction Controller
**File**: `controllers/transactionController.js`

Manages general transactions.

**Functions**:
- `getTransactions`: Admin - Get all transactions
- `getMyTransactions`: Get user's transactions
- `getTransactionById`: Get specific transaction
- `createTransaction`: Create new transaction
- `updateTransactionStatus`: Admin - Update transaction status

**Key Logic**:
- Automatic balance updates on transaction completion
- Deposit/withdrawal balance adjustments
- Unique reference generation for transactions
- Status-based balance modifications

### DepositRequest Controller
**File**: `controllers/depositRequestController.js`

Manages deposit requests.

**Functions**:
- `createDepositRequest`: Create deposit request
- `getMyDepositRequests`: Get user's requests
- `getDepositRequests`: Admin - Get all requests
- `getDepositRequestById`: Get specific request
- `updateDepositRequestStatus`: Admin - Update request status

**Key Logic**:
- Transaction ID tracking for confirmations
- Status management for admin approval workflow

### WithdrawalRequest Controller
**File**: `controllers/withdrawalRequestController.js`

Manages withdrawal requests.

**Functions**:
- `createWithdrawalRequest`: Create withdrawal request
- `getMyWithdrawalRequests`: Get user's requests
- `getWithdrawalRequests`: Admin - Get all requests
- `getWithdrawalRequestById`: Get specific request
- `updateWithdrawalRequestStatus`: Admin - Update request status

**Key Logic**:
- Balance validation before request creation
- Automatic balance deduction on request creation
- Refund logic on rejection (balance restoration)
- Wallet address validation

### LoanType Controller
**File**: `controllers/loanTypeController.js`

Manages loan product types.

**Functions**:
- `getLoanTypes`: Public - Get all loan types
- `getLoanTypeById`: Get specific loan type
- `createLoanType`: Admin - Create loan type
- `updateLoanType`: Admin - Update loan type
- `deleteLoanType`: Admin - Delete loan type

### LoanOrder Controller
**File**: `controllers/loanOrderController.js`

Handles loan applications.

**Functions**:
- `createLoanOrder`: Create loan application
- `getMyLoanOrders`: Get user's loan orders
- `getLoanOrders`: Admin - Get all loan orders
- `getLoanOrderById`: Get specific loan order
- `updateLoanOrderStatus`: Admin - Update loan order status

**Key Logic**:
- Monthly payment calculation using loan formula
- Total repayment calculation
- Automatic balance credit on approval
- Interest rate and term validation

### Bonus Controller
**File**: `controllers/bonusController.js`

Manages user bonuses.

**Functions**:
- `getMyBonuses`: Get user's bonuses
- `getBonuses`: Admin - Get all bonuses
- `createBonus`: Admin - Create bonus
- `updateBonusStatus`: Admin - Update bonus status

**Key Logic**:
- Automatic balance credit when bonus is marked as 'credited'
- Reason tracking for bonus awards

### Activity Controller
**File**: `controllers/activityController.js`

Manages user activity logging.

**Functions**:
- `getMyActivities`: Get user's activities
- `getActivities`: Admin - Get all activities
- `createActivity`: Log new activity
- `getAllActivities`: Admin - Get all activities (duplicate)

**Key Logic**:
- IP geolocation data storage
- Activity type categorization
- Timestamp tracking

### AdminSettings Controller
**File**: `controllers/adminSettingsController.js`

Manages global admin settings.

**Functions**:
- `getAdminSettings`: Get admin settings
- `updateAdminSettings`: Update admin settings

**Key Logic**:
- Singleton pattern with 'globalAdminSettings' ID
- Upsert functionality for first-time setup
- Crypto wallet address management

## Routes

All routes are organized in separate files in the `routes/` directory and mounted in `server.js`.

### User Routes (`routes/userRoutes.js`)
- `POST /api/users/login` - User login
- `POST /api/users` - User registration
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/all` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (protected)

### Asset Routes (`routes/assetRoutes.js`)
- `GET /api/assets` - Get all assets (public)
- `GET /api/assets/all` - Get all assets (admin)
- `GET /api/assets/:id` - Get asset by ID (public)
- `POST /api/assets` - Create asset (admin)
- `PUT /api/assets/:id` - Update asset (admin)
- `DELETE /api/assets/:id` - Delete asset (admin)

### AssetOrder Routes (`routes/assetOrderRoutes.js`)
- `POST /api/assetOrders` - Create asset order (protected)
- `GET /api/assetOrders/myorders` - Get user's orders (protected)
- `GET /api/assetOrders/all` - Get all orders (admin)
- `GET /api/assetOrders/:id` - Get order by ID (protected)
- `PUT /api/assetOrders/:id/status` - Update order status (admin)

### Transaction Routes (`routes/transactionRoutes.js`)
- `GET /api/transactions` - Get user's transactions (protected)
- `POST /api/transactions` - Create transaction (protected)
- `GET /api/transactions/all` - Get all transactions (admin)
- `GET /api/transactions/:id` - Get transaction by ID (protected)
- `PUT /api/transactions/:id/status` - Update transaction status (admin)

### DepositRequest Routes (`routes/depositRequestRoutes.js`)
- `POST /api/depositRequests` - Create deposit request (protected)
- `GET /api/depositRequests/myrequests` - Get user's requests (protected)
- `GET /api/depositRequests/all` - Get all requests (admin)
- `GET /api/depositRequests/:id` - Get request by ID (protected)
- `PUT /api/depositRequests/:id/status` - Update request status (admin)

### WithdrawalRequest Routes (`routes/withdrawalRequestRoutes.js`)
- `POST /api/withdrawalRequests` - Create withdrawal request (protected)
- `GET /api/withdrawalRequests/myrequests` - Get user's requests (protected)
- `GET /api/withdrawalRequests/all` - Get all requests (admin)
- `GET /api/withdrawalRequests/:id` - Get request by ID (protected)
- `PUT /api/withdrawalRequests/:id/status` - Update request status (admin)

### LoanType Routes (`routes/loanTypeRoutes.js`)
- `GET /api/loanTypes` - Get all loan types (public)
- `GET /api/loanTypes/:id` - Get loan type by ID (public)
- `POST /api/loanTypes` - Create loan type (admin)
- `PUT /api/loanTypes/:id` - Update loan type (admin)
- `DELETE /api/loanTypes/:id` - Delete loan type (admin)

### LoanOrder Routes (`routes/loanOrderRoutes.js`)
- `POST /api/loanOrders` - Create loan order (protected)
- `GET /api/loanOrders/myorders` - Get user's loan orders (protected)
- `GET /api/loanOrders/all` - Get all loan orders (admin)
- `GET /api/loanOrders/:id` - Get loan order by ID (protected)
- `PUT /api/loanOrders/:id/status` - Update loan order status (admin)

### Bonus Routes (`routes/bonusRoutes.js`)
- `GET /api/bonuses/myboni` - Get user's bonuses (protected)
- `GET /api/bonuses/all` - Get all bonuses (admin)
- `POST /api/bonuses` - Create bonus (admin)
- `PUT /api/bonuses/:id/status` - Update bonus status (admin)

### Activity Routes (`routes/activityRoutes.js`)
- `POST /api/activities` - Create activity (protected)
- `GET /api/activities` - Get all activities (admin)
- `GET /api/activities/myactivities` - Get user's activities (protected)
- `GET /api/activities/all` - Get all activities (admin)

### AdminSettings Routes (`routes/adminSettingsRoutes.js`)
- `GET /api/adminSettings/view` - Get admin settings (protected)
- `GET /api/adminSettings/edit` - Get admin settings for editing (protected)
- `PUT /api/adminSettings/edit` - Update admin settings (protected)

## Middlewares

### Authentication Middleware (`middlewares/auth.js`)

**protect**: JWT authentication middleware
- Extracts Bearer token from Authorization header
- Verifies token with JWT_SECRET
- Attaches user object to req.user
- Handles token verification errors

**admin**: Role-based access control
- Checks if req.user.role is 'admin' (case/whitespace insensitive)
- Returns 403 Forbidden if not admin

## Utilities

### Error Handler (`utils/errorHandler.js`)
Global error handling middleware that formats error responses consistently.

### Token Generator (`utils/generateToken.js`)
Generates JWT tokens with user ID and role, expires in 30 days.

## API Endpoints

### Authentication Endpoints

#### POST /api/users/login
**Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### POST /api/users
**Body**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```
**Response**: Same as login response

### Asset Endpoints

#### GET /api/assets
**Response**: Array of all assets

#### POST /api/assets (Admin)
**Body**: Asset object with all required fields
**Response**: Created asset object

### Transaction Endpoints

#### POST /api/transactions
**Body**:
```json
{
  "amount": 100.00,
  "type": "deposit",
  "description": "Deposit via bank transfer"
}
```
**Response**: Created transaction object

#### PUT /api/transactions/:id/status (Admin)
**Body**:
```json
{
  "status": "confirmed"
}
```
**Response**: Updated transaction object

### Deposit/Withdrawal Endpoints

#### POST /api/depositRequests
**Body**:
```json
{
  "amount": 500.00,
  "method": "bank_transfer",
  "crypto": "BTC",
  "blockchain": "Bitcoin",
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

#### POST /api/withdrawalRequests
**Body**:
```json
{
  "amount": 200.00,
  "method": "crypto",
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

### Loan Endpoints

#### GET /api/loanTypes
**Response**: Array of all loan types

#### POST /api/loanOrders
**Body**:
```json
{
  "loanTypeId": "loan_type_id",
  "amount": 1000.00,
  "duration": 12
}
```

### Admin Endpoints

#### GET /api/users/all (Admin)
**Response**: Array of all users

#### PUT /api/adminSettings/edit (Admin)
**Body**:
```json
{
  "bitcoin": {
    "walletAddress": "new_bitcoin_address"
  }
}
```

## Authentication Flow

1. **Registration**: User provides username, email, password
2. **Password Hashing**: Password automatically hashed with bcrypt
3. **JWT Generation**: Token created with user ID and role
4. **Login Response**: Returns token and user data
5. **Protected Routes**: Subsequent requests include `Authorization: Bearer <token>`
6. **Token Verification**: Middleware validates token and attaches user to request
7. **Role Checking**: Admin routes check user.role === 'admin'

## Business Logic

### Balance Management
- **Deposits**: Admin approval required, balance credited on confirmation
- **Withdrawals**: Balance deducted immediately, refunded on rejection
- **Loans**: Balance credited on approval
- **Investments**: Balance deducted on order creation
- **Bonuses**: Balance credited when bonus status set to 'credited'

### Order Processing
- **Asset Orders**: Pending → Approved/Rejected by admin
- **Loan Orders**: Calculated payments, approved loans credit balance
- **Deposit Requests**: Manual approval with transaction ID tracking
- **Withdrawal Requests**: Immediate deduction, manual processing

### Activity Logging
- Login activities logged with IP geolocation
- All user actions can be logged via activity endpoints
- Admin can view all user activities

## Frontend Requirements

The frontend should be a modern React application that consumes this API. Based on the current implementation, here are the detailed requirements:

### Tech Stack Requirements
- React 18+ with hooks
- React Router for navigation
- Axios or Fetch for API calls
- State management (Context API or Redux)
- tailwindcss
- Chart.js for data visualization
- Toast notifications for user feedback
- Form validation library

### Core Pages and Components

#### 1. Landing Page (Home)
**Route**: `/`
**Components Needed**:
- Navigation bar with login/signup links
- Hero section with call-to-action
- Features/services section
- Pricing plans display
- Testimonials carousel
- Partners/logos section
- Footer with links

**API Calls**:
- GET /api/assets (for featured assets)
- GET /api/loanTypes (for loan products)

#### 2. Authentication Pages
**Routes**: `/login`, `/verify-otp`

**Login Page Features**:
- Email/password form
- Toggle between login and signup
- Social login options (Google)
- Forgot password link
- Redirect to dashboard/admin based on role
- Activity logging on successful login

**Signup Page Features**:
- Username, email, password, confirm password
- Password strength validation
- Terms acceptance
- OTP verification flow

**OTP Verification**:
- 6-digit OTP input
- Resend OTP functionality
- Timer for OTP expiration
- Success/error feedback

#### 3. User Dashboard
**Route**: `/dashboard`
**Layout**: Sidebar navigation + main content area

**Navigation Structure**:
- Main Dashboard
- Profile
- Transactions
- Investments
- Pricing
- Deposit
- Withdraw
- Activity
- Loan Types
- Settings

**Main Dashboard Features**:
- Balance display cards
- Recent transactions
- Investment portfolio
- Quick actions (deposit, withdraw, invest)
- Charts for portfolio performance
- Account status indicators

**Profile Page**:
- User information display
- Profile picture upload
- Editable fields (name, phone, etc.)
- Password change functionality
- Account verification status

**Transactions Page**:
- Transaction history table
- Filtering by type/status
- Pagination
- Export functionality
- Transaction details modal

**Investments Page**:
- Current investments display
- Investment cards with progress
- Profit/loss calculations
- Investment history

**Deposit Page**:
- Crypto selection (BTC, ETH, USDT)
- Wallet address display (from admin settings)
- Amount input with validation
- Payment instructions
- Transaction ID input for confirmation
- Deposit history

**Withdrawal Page**:
- Balance check
- Amount input with limits
- Wallet address input
- Password confirmation
- Withdrawal history
- Processing status display

**Loan Types Page**:
- Loan products grid
- Detailed loan information
- Application forms
- Payment calculators
- Application status tracking

#### 4. Admin Panel
**Route**: `/admin`
**Layout**: Similar dashboard layout with admin-specific navigation

**Admin Navigation**:
- Overview/Dashboard
- Users management
- Orders (Asset orders)
- Pricing management
- Loan types management
- Loan orders
- Transactions
- Deposits
- Withdrawals
- Settings

**Admin Overview**:
- Statistics cards (total users, transactions, etc.)
- Recent activities
- System status
- Revenue charts

**Users Management**:
- User list with search/filter
- User details modal
- Role management (promote/demote)
- User actions (bonus, balance adjustment)
- User status management

**Orders Management**:
- Pending orders list
- Order approval/rejection
- Order details view
- Bulk actions

**Financial Management**:
- Transaction monitoring
- Deposit/withdrawal approvals
- Balance adjustments
- Bonus management

**Settings Page**:
- Crypto wallet addresses configuration
- System parameters
- Email templates
- API keys management

### State Management Requirements

#### Global State
- User authentication state
- User profile data
- Toast notifications
- Loading states
- Modal states

#### Component State
- Form data and validation
- Table pagination and filtering
- Modal open/close states
- File upload progress

### API Integration Patterns

#### Authentication
```javascript
// Login
const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  localStorage.setItem('token', response.data.access_token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  // Dispatch auth state update
};

// Protected API calls
const apiCall = async () => {
  const token = localStorage.getItem('token');
  return await api.get('/protected-endpoint', {
    headers: { Authorization: `Bearer ${token}` }
  });
};
```

#### Data Fetching
```javascript
// Dashboard data
const fetchDashboardData = async () => {
  const [user, transactions, investments] = await Promise.all([
    api.get('/users/profile'),
    api.get('/transactions/mytransactions'),
    api.get('/assetOrders/myorders')
  ]);
  // Update state with fetched data
};
```

#### Real-time Updates
- Polling for transaction status updates
- WebSocket connection for live price data (if implemented)
- Periodic balance updates

### UI/UX Requirements

#### Design System
- Consistent color scheme (primary: blue, can be changed to red)
- Typography hierarchy
- Spacing and layout grid
- Component library for reusability
- Responsive design for mobile/tablet/desktop

#### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Success confirmations for actions
- Form validation with inline feedback
- Progressive disclosure for complex forms
- Accessibility considerations (ARIA labels, keyboard navigation)

#### Security Considerations
- Token storage and automatic refresh
- Secure form handling
- Input sanitization
- XSS protection
- CSRF protection if using forms

### Performance Requirements
- Code splitting for route-based loading
- Image optimization and lazy loading
- API response caching
- Debounced search inputs
- Virtual scrolling for large lists

### Testing Requirements
- Unit tests for utility functions
- Integration tests for API calls
- E2E tests for critical user flows
- Component testing with React Testing Library

## Admin Panel Logic

The admin panel provides comprehensive management capabilities:

### User Management
- View all users with pagination
- Search and filter users
- View detailed user information
- Change user roles (user ↔ admin)
- Adjust user balances manually
- View user activity logs
- Deactivate/reactivate accounts

### Financial Oversight
- Approve/reject deposit requests
- Process withdrawal requests
- Monitor all transactions
- Manage bonus distributions
- View financial reports and analytics

### Content Management
- Create/edit/delete investment assets
- Manage loan products and terms
- Update pricing plans
- Configure system settings

### System Administration
- View system-wide statistics
- Monitor user activities
- Manage crypto wallet addresses
- Configure email templates and API keys

## User Dashboard Logic

### Account Management
- Profile completion and verification
- Password security management
- Account settings customization
- Multi-device session management

### Financial Operations
- Secure deposit processes with multiple crypto options
- Withdrawal requests with balance validation
- Investment portfolio management
- Loan application and management
- Transaction history and reporting

### Investment Features
- Browse available investment products
- Real-time portfolio tracking
- Profit/loss calculations
- Investment performance analytics
- Automated notifications for investment updates

### Security and Privacy
- Two-factor authentication setup
- Login activity monitoring
- Secure password change processes
- Privacy settings management

## Error Handling

The backend uses consistent error response format:
```json
{
  "message": "Error description",
  "stack": "Error stack (development only)"
}
```

Frontend should handle:
- Network errors (connection issues)
- Authentication errors (token expiry)
- Validation errors (form inputs)
- Server errors (500 status codes)
- Business logic errors (insufficient balance, etc.)

## Security Considerations

### Authentication Security
- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based access control
- Secure password policies

### API Security
- CORS configuration
- Input validation and sanitization
- Rate limiting (recommended)
- HTTPS enforcement (production)

### Data Protection
- Sensitive data encryption
- Secure MongoDB connection
- Environment variable usage
- Audit logging

### Frontend Security
- Token storage in localStorage (consider httpOnly cookies for production)
- XSS prevention
- CSRF protection
- Secure API communication

This comprehensive documentation provides everything needed to understand, maintain, and rebuild the Quotra backend API and design a new frontend application.
# quotra-backend
