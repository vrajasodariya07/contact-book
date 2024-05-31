import './App.css';
import RegistrationForm from './screens/RegistrationForm';
import Login from './screens/login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationForm />} />
      </Routes>

    </>
  );
}

export default App;
