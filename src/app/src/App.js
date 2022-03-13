import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';

import Home from './pages/Home';

import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Verify from './pages/Verify';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import Exchange from './pages/Exchange';
import Market from './pages/Exchange/Market';
import Pair from './pages/Exchange/Pair';

import './App.css';

function App() {
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
          <Route path="exchange" element={<Exchange />}>
            <Route path="" element={<Market />} />
            <Route path="markets" element={<Market />} />
            <Route path=":ticker" element={<Pair />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
