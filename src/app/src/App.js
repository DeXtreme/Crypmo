import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Register } from './pages/Register/Register';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
