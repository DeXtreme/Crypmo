import { Routes,Route,HashRouter as Router } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
