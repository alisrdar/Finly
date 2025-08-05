import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Expense from './pages/dashboard/Expense'
import Home from './pages/dashboard/Home'
import Income from './pages/dashboard/Income'

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />}/>
            <Route path='/login' element= {<Login />}/>
            <Route path='/signUp' element= {<SignUp />}/>
            <Route path='/dashboard' element= {<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path='/expense' element= {<ProtectedRoute><Expense/></ProtectedRoute>}/>
            <Route path='/income' element= {<ProtectedRoute><Income/></ProtectedRoute>}/>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  )
}

export default App

const Root = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}