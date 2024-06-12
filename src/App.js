import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RegistrationForm from './screens/RegistrationForm';
import Login from './screens/login';
import HomePage from './screens/home';
import Card from './Component/Card';
import UserDetail from './Component/UserDetail';
import Profile from './screens/Profile';
import Request from './screens/Request';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import Index from './screens/Index';
import { isTokenExpired, logout } from './auth';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = Cookie.get('userInfo');
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired() && window.location.pathname!="/register" && window.location.pathname!="/") {
        alert('Session has expired. Please log in again.');
        logout();
        Cookie.remove('userInfo');
        setUserInfo(null);
        window.location.href = '/'; // Redirect to login page
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (userData) => {
    setUserInfo(userData);
    Cookie.set('userInfo', JSON.stringify(userData));
  };

  return (
    <BrowserRouter>
      <div>
        <div className="main">
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={userInfo ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
              />
              <Route
                path="/register"
                element={userInfo ? <Navigate to="/home" /> : <RegistrationForm />}
              />
              <Route path="/home" element={userInfo ? <Index /> : <Navigate to="/" />} >
                <Route path="" element={<HomePage />} />
                <Route path="card/:name" element={<Card />} />
                <Route path="user/:id" element={<UserDetail />} />
                <Route path="profile" element={userInfo ? <Profile /> : <Navigate to="/" />} />
                <Route path="request" element={<Request />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;