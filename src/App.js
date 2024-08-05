// App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Login';
import Signup from './Signup';
import Home from './Home';
import Customer from './Customer';
import DeliveryService from './Delivery';
import DeliveryServicelist from './Selectedlist';
import Checkstatus from './Customerhandle';
import './common.css';

function App() {
  const ProtectedRoute = ({ element }) => {
    const userData = localStorage.getItem('userData');
    const isAuthenticated = !!userData;

    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/customer" element={<ProtectedRoute element={<Customer />} />} />
        <Route path="/delivery" element={<ProtectedRoute element={<DeliveryService />} />} />
        <Route path="/selectedparcels" element={<ProtectedRoute element={<DeliveryServicelist />} />} />
        <Route path="/checkstatus" element={<ProtectedRoute element={<Checkstatus />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
