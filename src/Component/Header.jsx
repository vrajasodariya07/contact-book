import React, { useState } from 'react';
import '../Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../action/userAction';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaHome, FaSignOutAlt, FaSignInAlt, FaBell, FaEnvelopeOpenText } from 'react-icons/fa';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ setSearch }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const logoutHandler = () => {
    dispatch(logout());
    handleClose(); // Close offcanvas when logging out
  };

  return (
    <>
      <Row className='d-none d-md-block'>
        <Col>
          <div className="d-flex" style={{ height: '100vh' }}>
            <div className="sidebar bg-dark text-light p-3 d-flex flex-column w-100">
              <div className="profile-section d-flex flex-column align-items-center mb-4">
                <img src={require(`../images/demo-pic35.jpg`)} alt="Profile" className="rounded-circle mb-2" style={{ width: '100px', height: '100px' }} />
                <h4 className="mb-0">Admin</h4>
                <span className="badge bg-success mt-1">Online</span>
              </div>
              <Form className="search-bar mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="mb-2"
                  aria-label="Search"
                  onChange={(e) => { console.log(e.target.value); setSearch(e.target.value); }}
                />
                <Button variant="outline-light" block>Search</Button>
              </Form>
              <nav className="nav flex-column flex-grow-1">
                <Link className='nav-link text-light d-flex align-items-center mb-2 active-link' to="/home">
                  <FaHome className="me-2" />Home
                </Link>
                {users && users?.loggedInUser?.isAdmin && (
                  <Link className='nav-link text-light d-flex align-items-center mb-2' to="/home/request">
                    <FaBell className="me-2" />Request <span className="badge bg-primary ms-auto">32</span>
                  </Link>
                )}
                <Link className='nav-link text-light d-flex align-items-center mb-2' to="/home/profile">
                  <FaEnvelopeOpenText className="me-2" />Profile <span className="badge bg-secondary ms-auto">9</span>
                </Link>
                {users ? (
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
          </div>
        </Col>
      </Row>
      <Row className='d-block d-md-none'>
        <Col>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/home">Admin</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
            </Container>
          </Navbar>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Link className='nav-link text-dark d-flex align-items-center mb-2' to="/home" onClick={handleClose}>
                  <FaHome className="me-2" />Home
                </Link>
                {users && users?.loggedInUser?.isAdmin && (
                  <Link className='nav-link text-dark d-flex align-items-center mb-2' to="/home/request" onClick={handleClose}>
                    <FaBell className="me-2" />Request <span className="badge bg-primary ms-auto">32</span>
                  </Link>
                )}
                <Link className='nav-link text-dark d-flex align-items-center mb-2' to="/home/profile" onClick={handleClose}>
                  <FaEnvelopeOpenText className="me-2" />Profile <span className="badge bg-secondary ms-auto">9</span>
                </Link>
                {users ? (
                  <Link to="#" onClick={logoutHandler} className="nav-link text-dark d-flex align-items-center mb-2">
                    <FaSignOutAlt className="me-2" />Logout
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link text-dark d-flex align-items-center mb-2" onClick={handleClose}>
                    <FaSignInAlt className="me-2" />Sign In
                  </Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default Header;