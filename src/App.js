import LoginForm from './Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import Customer from './Customer';
import DeliveryService from './Delivery';
import './common.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/delivery" element={<DeliveryService />} />
      </Routes>
    </Router>


  );
}

export default App;
