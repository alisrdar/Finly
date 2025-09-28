# 💰 Finly - Personal Finance Management System

A modern, full-stack financial management application built with the MERN stack, designed to help users track expenses, manage income, and gain insights into their financial health through interactive dashboards and analytics.

![Finly Dashboard](./frontend/public/heroImage.png)

## 🚀 Features

### 📊 **Dashboard & Analytics**
- **Real-time Financial Overview**: Interactive pie charts showing total balance, income, and expenses
- **Time-based Analytics**: Filter data by last 7 days, 30 days, 60 days, 90 days, 6 months, 1 year, 5 years, or all time
- **Visual Charts**: Bar charts, line charts, and pie charts using Recharts for expense/income trends
- **Recent Transactions**: Quick view of latest financial activities

### 💳 **Expense Management**
- **Comprehensive Tracking**: Record expenses with categories, payment methods, notes, and locations
- **Payment Methods**: Support for Cash, Credit Card, Debit Card, UPI, Easypaisa, and other methods
- **Visual Analytics**: Line charts and bar charts for expense trends
- **Category-based Insights**: Top expense categories and spending patterns

### 💰 **Income Tracking**
- **Income Sources**: Track various income streams with categories and custom icons
- **Trend Analysis**: Bar charts showing income patterns over time
- **Comparative Analytics**: Compare income vs expenses across different time periods

### 👤 **User Management**
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Profile Management**: Upload and manage profile pictures via Cloudinary
- **Personal Dashboard**: Customized experience for each user

### 📱 **Modern UI/UX**
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Theme switching capabilities
- **Interactive Components**: Smooth animations and hover effects
- **Emoji Integration**: Custom emoji picker for categorizing transactions

## 🛠 Tech Stack

### **Frontend**
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router Dom** for navigation
- **React Hook Form** for form management
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Moment.js** for date handling

### **Backend**
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Cloudinary** for image storage
- **Multer** for file uploads
- **CORS** for cross-origin requests

### **Development Tools**
- **ESLint** for code linting
- **Nodemon** for development server
- **tsx** for TypeScript execution
- **Git** for version control

## 📁 Project Structure

```
Finly/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── dbCon.ts              # Database connection
│   │   ├── controllers/
│   │   │   ├── authController.ts     # Authentication logic
│   │   │   ├── dashboardController.ts # Dashboard data aggregation
│   │   │   ├── expenseController.ts  # Expense CRUD operations
│   │   │   ├── incomeController.ts   # Income CRUD operations
│   │   │   └── uploadController.ts   # File upload handling
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts     # JWT authentication
│   │   │   ├── errorHandler.ts      # Global error handling
│   │   │   └── multer.ts            # File upload configuration
│   │   ├── models/
│   │   │   ├── Expense.ts           # Expense schema
│   │   │   ├── Income.ts            # Income schema
│   │   │   └── User.ts              # User schema
│   │   ├── routes/
│   │   │   ├── auth.ts              # Authentication routes
│   │   │   ├── dashboardRoutes.ts   # Dashboard routes
│   │   │   ├── expense.ts           # Expense routes
│   │   │   └── income.ts            # Income routes
│   │   ├── utils/
│   │   │   ├── cloudinary.ts        # Cloudinary configuration
│   │   │   └── generateToken.ts     # JWT token generation
│   │   └── index.ts                 # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/              # Reusable chart components
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── expense/             # Expense management components
│   │   │   ├── income/              # Income management components
│   │   │   ├── cards/               # Card components
│   │   │   └── ui/                  # UI utility components
│   │   ├── context/
│   │   │   ├── authContext.ts       # Authentication context
│   │   │   ├── contextProvider.tsx  # Context provider
│   │   │   └── themeContext.ts      # Theme context
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Authentication hook
│   │   │   └── useTheme.ts          # Theme hook
│   │   ├── pages/
│   │   │   ├── auth/                # Authentication pages
│   │   │   ├── dashboard/           # Dashboard pages
│   │   │   └── LandingPage.tsx      # Landing page
│   │   ├── services/
│   │   │   └── api.ts               # API service layer
│   │   ├── utils/
│   │   │   ├── api.ts               # Axios configuration
│   │   │   ├── apiPaths.ts          # API endpoints
│   │   │   ├── helper.ts            # Utility functions
│   │   │   └── data.ts              # Static data
│   │   └── types/
│   │       └── index.ts             # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alisrdar/Finly.git
cd Finly
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Environment Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finly
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/finly

JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the `frontend` directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Database Setup

1. **Local MongoDB**: Ensure MongoDB is running locally
2. **MongoDB Atlas**: Use the connection string in your `.env` file

The application will automatically create the necessary collections on first run.

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

3. **Build for Production**
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/getUser` - Get current user (protected)
- `POST /api/v1/auth/upload-image` - Upload profile image (protected)

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard analytics (protected)

### Income Management
- `GET /api/v1/income` - Get all income (protected)
- `POST /api/v1/income` - Create income (protected)
- `PUT /api/v1/income/:id` - Update income (protected)
- `DELETE /api/v1/income/:id` - Delete income (protected)

### Expense Management
- `GET /api/v1/expense` - Get all expenses (protected)
- `POST /api/v1/expense` - Create expense (protected)
- `PUT /api/v1/expense/:id` - Update expense (protected)
- `DELETE /api/v1/expense/:id` - Delete expense (protected)

## 🎨 Key Features Deep Dive

### Dashboard Analytics
The dashboard provides comprehensive financial insights through:
- **Aggregated Statistics**: Total balance, income, and expenses
- **Time-based Filtering**: Multiple time range options for data analysis
- **Visual Charts**: Interactive charts for better data comprehension
- **Recent Activity**: Quick access to latest transactions

### Data Visualization
- **Bar Charts**: For income trends and category-wise analysis
- **Line Charts**: For expense tracking over time
- **Pie Charts**: For financial overview and category distribution
- **Interactive Elements**: Hover effects, legends, and tooltips

### Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Adaptive Layouts**: Dynamic grid systems and flexible components
- **Touch-Friendly Interface**: Optimized for mobile interactions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Protected Routes**: Middleware-based route protection
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin resource sharing

## 🎯 Future Enhancements

- [ ] **Budget Planning**: Set and track monthly/yearly budgets
- [ ] **Goal Setting**: Financial goal tracking with progress indicators
- [ ] **Export Features**: Export data to CSV/PDF formats
- [ ] **Recurring Transactions**: Automated recurring income/expense tracking
- [ ] **Multi-Currency Support**: Support for different currencies
- [ ] **Mobile App**: React Native mobile application
- [ ] **Bank Integration**: Connect with bank accounts for automatic transaction import
- [ ] **Advanced Analytics**: AI-powered spending insights and recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ali Sardar**
- GitHub: [@alisrdar](https://github.com/alisrdar)

## 🙏 Acknowledgments

- **Recharts** for beautiful chart components
- **Tailwind CSS** for the utility-first CSS framework
- **Cloudinary** for image management services
- **MongoDB** for the flexible database solution
- **React Community** for the amazing ecosystem

---

⭐ If you found this project helpful, please give it a star!
