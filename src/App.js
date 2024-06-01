// import './App.css';
// import RegistrationForm from './screens/RegistrationForm';

// function App() {
//   return (
//     <>
//       <RegistrationForm />
//     </>
//   );
// }

// export default App;
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import RegistrationForm from './screens/RegistrationForm';
import Login from './screens/login';
import HomePage from './screens/home';
import Card from './Component/Card';
import UserDetail from './Component/UserDetail';
import Profile from './screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="main">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RegistrationForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/card/:name" element={<Card />} /> 
              <Route path="/user/:id" element={<UserDetail />} /> 
              <Route path="/profile" element={<Profile />} /> 
            </Routes>
          </div>
        </div>

      </div>


    </BrowserRouter>
  );
}

export default App;
