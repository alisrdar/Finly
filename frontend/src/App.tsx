import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Expense from './pages/dashboard/Expense'
import Home from './pages/dashboard/Home'
import Income from './pages/dashboard/Income'

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />}/>
          <Route path='/login' element= {<Login />}/>
          <Route path='/signUp' element= {<SignUp />}/>
          <Route path='/dashboard' element= {<Home />}/>
          <Route path='/expense' element= {<Expense/>}/>
          <Route path='/income' element= {<Income/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App


const Root = () => {
  // Checking if token exists in Local storage
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    isAuthenticated ? (
      <Navigate to={'/dashboard'}/>
    ) : (
      <Navigate to={'/login'}/>
    )
  )
}