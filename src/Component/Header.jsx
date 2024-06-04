import React from 'react';
import '../Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../action/userAction';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaTasks, FaBell, FaEnvelopeOpenText, FaInbox } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

const Header = ({ setSearch }) => {
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex" style={{ height: '100vh'}}>
                        <div className="sidebar bg-dark text-light p-3 d-flex flex-column" >
                            <div className="profile-section d-flex flex-column align-items-center mb-4">
                                <img src="path/to/profile-picture.jpg" alt="Profile" className="rounded-circle mb-2" style={{ width: '100px', height: '100px' }} />
                                <h4 className="mb-0">Admin</h4>
                                <span className="badge bg-success mt-1">Online</span>
                            </div>
                            <Form className="search-bar mb-3">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="mb-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="outline-light" block>Search</Button>
                            </Form>
                            <nav className="nav flex-column flex-grow-1">
                                <Link className='nav-link text-light d-flex align-items-center mb-2 active-link' to="/home">
                                    <FaHome className="me-2" />Home
                                </Link>
                                <Link className='nav-link text-light d-flex align-items-center mb-2 ' to="/">
                                    <FaTasks className="me-2" />Register <span className="badge bg-primary ms-auto">32</span>
                                </Link>
                                <Link className='nav-link text-light d-flex align-items-center mb-2' to="/home/request">
                                    <FaBell className="me-2" />Request <span className="badge bg-secondary ms-auto">4</span>
                                </Link>
                                <Link className='nav-link text-light d-flex align-items-center mb-2' to="/home/profile">
                                    <FaEnvelopeOpenText className="me-2" />Profile <span className="badge bg-secondary ms-auto">9</span>
                                </Link>

                                {userInfo ? (
                                    <Link to="#" onClick={logoutHandler} className="nav-link text-light d-flex align-items-center mb-2">
                                        <FaSignOutAlt className="me-2" />Logout
                                    </Link>
                                ) : (
                                    <Link to="/login" className="nav-link text-light d-flex align-items-center mb-2">
                                        <FaSignInAlt className="me-2" />Sign In
                                    </Link>
                                )}
                            </nav>
                        </div>
                        <div className="flex-grow-1 bg-body-tertiary p-3">
                            {/* Main content goes here */}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Header;
