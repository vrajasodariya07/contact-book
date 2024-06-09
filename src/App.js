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

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = Cookie.get('userInfo');
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []); // Run only once on component mount

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
                path="/login"
                element={userInfo ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
              />
              <Route
                path="/"
                element={userInfo ? <Navigate to="/home" /> : <RegistrationForm />}
              />
              <Route path="/home" element={userInfo ? <Index /> : <Navigate to="/login" />} >
                <Route path="" element={<HomePage />} />
                <Route path="card/:name" element={<Card />} />
                <Route path="user/:id" element={<UserDetail />} />
                <Route path="profile" element={userInfo ? <Profile /> : <Navigate to="/login" />} />
                <Route path="request" element={<Request />} />
              </Route>

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter >
  );
}

export default App;
