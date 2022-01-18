import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Register } from './pages/Register/Register';
import { LogIn } from './pages/LogIn/LogIn';
import { Verify } from './pages/Verify/Verify';
import './App.css';

function App() {
  //TODO: handle 404
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<LogIn />} />
        <Route path="verify/:verify_id" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;
