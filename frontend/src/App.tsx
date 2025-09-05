import LandingPage from './pages/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/contextProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/dashboard/Home';
import ExpensePage from './pages/dashboard/ExpensePage';
import IncomePage from './pages/dashboard/IncomePage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path='/' element={<LandingPage />} />
            
            {/* Auth */}
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            
            {/* Dashboard & Protected Pages */}
            <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/expense' element={<ProtectedRoute><ExpensePage /></ProtectedRoute>} />
            <Route path='/income' element={<ProtectedRoute><IncomePage /></ProtectedRoute>} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App
