import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  //TODO: handle 404
  return (
    <>
      <Alert />
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="register" element={<Register/>} />
          <Route path="login" element={<LogIn />} />
          <Route path="verify/:verify_id" element={<Verify />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
