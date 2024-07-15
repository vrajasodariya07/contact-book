import React, { useEffect, useState } from 'react';
import '../App.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { enum_data, register, getSurnames } from '../action/userAction';
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

  const surnameData = useSelector((state) => state.surnames);
  const { surnames, loading: surnameLoading } = surnameData;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

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
    dispatch(getSurnames());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error('Password and confirm password do not match');
    } else {
      const formData = {
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

      dispatch(register(formData));
    }
  };

  return (
    <>
      <Container className="register-bg">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8}>
            <div className="form-container">
              <h2 className="title py-3 text-center">Create Account</h2>
              <p className="text-center">Already have an account? <Link to="/">Sign in</Link></p>
              <div className="separator">or</div>
              <form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="givenName"
                        name="givenName"
                        placeholder="First Name"
                        value={givenName}
                        onChange={(e) => setGivenName(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        placeholder="Middle Name"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <select
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      >
                        <option value="">Select Last Name</option>
                        {!surnameLoading && surnames && surnames.length > 0 ? (
                          surnames.map((surname) => (
                            <option key={surname._id} value={surname.name}>{surname.name}</option>
                          ))
                        ) : (
                          <option value="" disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
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
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Current City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="native"
                        name="native"
                        placeholder="Native Place"
                        value={native}
                        onChange={(e) => setNative(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
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
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
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
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        placeholder="Occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        placeholder="Confirm Password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>

                <div className='d-flex justify-content-center mt-3'>
                  <button type="submit" className="submit-btn">
                    {registerLoading ? <Spinner animation="border" size="sm" /> : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RegistrationForm;