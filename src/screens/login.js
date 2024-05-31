import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style.css';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../action/userAction';
import { Col, Container, Row } from 'react-bootstrap';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/home';

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(phoneNumber, password));
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <div className="forms">
            <h2 className="title py-3">Contact Book Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className='mt-3'>Login</button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
