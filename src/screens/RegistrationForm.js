import React, { useEffect, useState } from 'react';
import '../style.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { enum_data, register } from '../action/userAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [community, setCommunity] = useState('');
  const [city, setCity] = useState('');
  const [native, setNative] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: registerLoading, userInfo, error: registerError } = userRegister;

  const userEnum = useSelector((state) => state.userEnum);
  const { data, loading: enumLoading } = userEnum;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/login';

  useEffect(() => {
    if (userInfo) {
      toast.success('Registration successful!');
      navigate(redirect);
    }
    if (registerError) {
      toast.error(registerError);
    }
  }, [userInfo, navigate, redirect, registerError]);

  useEffect(() => {
    dispatch(enum_data());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error('Password and confirm password do not match');
    } else {
      const data = {
        email,
        password,
        givenName,
        middleName,
        lastName,
        community,
        city, 
        native,
        gender,
        birthDate,
        maritalStatus,
        phoneNumber,
        occupation,
      };
      dispatch(register(data));
    }
  };

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={6}>
            <div className="forms">
              <h2 className="title py-3">Contact Book Registration</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor="givenName">First Name:</label>
                <input
                  type="text"
                  id="givenName"
                  name="givenName"
                  value={givenName}
                  onChange={(e) => setGivenName(e.target.value)}
                  required
                />

                <label htmlFor="middleName">Middle Name:</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label htmlFor="community">Community:</label>
                <select
                  id="community"
                  name="community"
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  required
                >
                  <option value="">Select Community</option>
                  {!enumLoading && data && data.community && data.community.length > 0 ? (
                    data.community.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))
                  ) : (
                    <option value="" disabled>Loading...</option>
                  )}
                </select>

                <label htmlFor="currentcity">Current City:</label> 
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

                <label htmlFor="native">Native Place:</label>
                <input
                  type="text"
                  id="native"
                  name="native"
                  value={native}
                  onChange={(e) => setNative(e.target.value)}
                  required
                />

                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  {!enumLoading && data && data.gender && data.gender.length > 0 ? (
                    data.gender.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))
                  ) : (
                    <option value="" disabled>Loading...</option>
                  )}
                </select>

                <label htmlFor="birthDate">Birth Date:</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />

                <label htmlFor="maritalStatus">Marital Status:</label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  {!enumLoading && data && data.maritalStatus && data.maritalStatus.length > 0 ? (
                    data.maritalStatus.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))
                  ) : (
                    <option value="" disabled>Loading...</option>
                  )}
                </select>

                <label htmlFor="occupation">Occupation:</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

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

                <label htmlFor="rePassword">Confirm Password:</label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />

                <button type="submit" className='mt-3' disabled={registerLoading}>
                  {registerLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
                </button>
              </form>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={6}>
            <div className='mt-3'>
              Already have an account?{' '}
              <Link to="/login">Sign-In</Link>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;