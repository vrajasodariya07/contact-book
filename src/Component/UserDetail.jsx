import React, { useEffect, useState } from 'react';
import '../userDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsUser, enum_data, listUsers, updateUser } from '../action/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { Container, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import Loader from './Loader';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, users } = userDetail;

    const userList = useSelector((state) => state.userList);
    const { users: loggedInUser } = userList;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const userEnum = useSelector((state) => state.userEnum);
    const { data: enumData, loading: enumLoading, error: enumError } = userEnum;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(detailsUser(id));
        } else {
            if (!users || users._id !== id) {
                dispatch(detailsUser(id));
                dispatch(listUsers());
                dispatch(enum_data());
            } else {
                setFormData({
                    givenName: users.givenName || '',
                    middleName: users.middleName || '',
                    lastName: users.lastName || '',
                    email: users.email || '',
                    phoneNumber: users.phoneNumber || '',
                    community: users.community || '',
                    city: users.city || '',
                    native: users.native || '',
                    gender: users.gender || '',
                    maritalStatus: users.maritalStatus || '',
                    birthDate: users.birthDate || '',
                    occupation: users.occupation || ''
                });
            }
        }
    }, [dispatch, id, successUpdate, users]);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, formData));
        setShowModal(false);
    };

    return (
        <>
            <Container className="user-detail-container">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <>
                        <Row className="my-4">
                            <Col md={6} className="user-detail-image">
                                <Image src={require('../images/demo-pic35.jpg')} fluid rounded />
                            </Col>
                            <Col md={6} className="user-detail-info">
                                <h1 className="user-detail-header">
                                    {users?.givenName} {users?.middleName} {users?.lastName}
                                </h1>
                                <p>
                                    <strong>Email:</strong> {users?.email || 'N/A'}
                                </p>
                                <p>
                                    <strong>Number:</strong> {users?.phoneNumber || 'N/A'}
                                </p>
                                <p>
                                    <strong>Community:</strong> {users?.community || 'N/A'}
                                </p>
                                <p>
                                    <strong>Current City:</strong> {users?.city || 'N/A'}
                                </p>
                                <p>
                                    <strong>Native:</strong> {users?.native || 'N/A'}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {users?.gender || 'N/A'}
                                </p>
                                <p>
                                    <strong>Marital Status:</strong> {users?.maritalStatus || 'N/A'}
                                </p>
                                <p>
                                    <strong>Date Of Birth:</strong> {users?.birthDate || 'N/A'}
                                </p>
                                <p>
                                    <strong>Occupation:</strong> {users?.occupation || 'N/A'}
                                </p>
                                {loggedInUser && loggedInUser.loggedInUser && loggedInUser.loggedInUser.isAdmin && (
                                    <Button variant="primary" onClick={handleEditClick}>Edit</Button>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </Container>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGivenName">
                                    <Form.Label>Given Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="givenName"
                                        value={formData.givenName}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCommunity">
                                    <Form.Label>Community</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="community"
                                        value={formData.community}
                                        onChange={handleFormChange}
                                    >
                                        {enumLoading ? (
                                            <option>Loading...</option>
                                        ) : enumError ? (
                                            <option>Error loading communities</option>
                                        ) : (
                                            enumData?.community.map((community, index) => (
                                                <option key={index} value={community}>
                                                    {community}
                                                </option>
                                            ))
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formCity">
                                    <Form.Label>Current City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNative">
                                    <Form.Label>Native</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="native"
                                        value={formData.native}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formMaritalStatus">
                                    <Form.Label>Marital Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        onChange={handleFormChange}
                                    >
                                        {enumLoading ? (
                                            <option>Loading...</option>
                                        ) : enumError ? (
                                            <option>Error loading marital statuses</option>
                                        ) : (
                                            enumData?.maritalStatus.map((status, index) => (
                                                <option key={index} value={status}>
                                                    {status}
                                                </option>
                                            ))
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formBirthDate">
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formOccupation">
                                    <Form.Label>Occupation</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserDetail;