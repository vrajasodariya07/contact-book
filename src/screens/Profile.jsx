import React, { useState, useEffect } from 'react';
import '../userDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, enum_data, updateProfile, updateProfileImage } from '../action/userAction';
import { Container, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import Loader from '../Component/Loader';

const Profile = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        maritalStatus: '',
        city: '',
        occupation: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetail = useSelector((state) => state.userDetail);
    const { loading: loadingDetail, error, users } = userDetail;

    const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userProfileUpdate;

    const userProfileImageUpdate = useSelector((state) => state.userProfileImageUpdate) || {};
    const { loading: loadingImageUpdate, error: errorImageUpdate, success: successImageUpdate } = userProfileImageUpdate;

    const userEnum = useSelector((state) => state.userEnum);
    const { data, loading: enumLoading, error: enumError } = userEnum;

    useEffect(() => {
        dispatch(enum_data());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            dispatch(detailsUser(userInfo._id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (successUpdate || successImageUpdate) {
            dispatch(detailsUser(userInfo._id));
        }
    }, [dispatch, successUpdate, successImageUpdate, userInfo]);

    useEffect(() => {
        if (users) {
            setFormData({
                maritalStatus: users.maritalStatus || '',
                city: users.city || '',
                occupation: users.occupation || ''
            });
            setProfileImageUrl(users.profileImage || '');
        }
    }, [users]);

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleSave = () => {
        if (profileImage) {
            dispatch(updateProfileImage(userInfo._id, profileImage));
        }

        const updatedUser = {
            ...users,
            maritalStatus: formData.maritalStatus,
            city: formData.city,
            occupation: formData.occupation
        };
        dispatch(updateProfile(updatedUser));
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    return (
        <>
            <Container className="user-detail-container">
                {loadingDetail ? (
                    <Loader />
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <Row className="my-4">
                        <Col md={6} className="user-detail-image">
                            <Image
                                src={profileImageUrl || require('../images/demo-pic35.jpg')}
                                fluid
                                rounded
                            />
                        </Col>
                        <Col md={6} className="user-detail-info">
                            <h1 className="user-detail-header">
                                {users?.givenName} {users?.middleName} {users?.lastName}
                            </h1>
                            <p><strong>Email:</strong> {users?.email || 'N/A'}</p>
                            <p><strong>Number:</strong> {users?.phoneNumber || 'N/A'}</p>
                            <p><strong>Community:</strong> {users?.community || 'N/A'}</p>
                            <p><strong>Current City:</strong> {users?.city || 'N/A'}</p>
                            <p><strong>Native:</strong> {users?.native || 'N/A'}</p>
                            <p><strong>Gender:</strong> {users?.gender || 'N/A'}</p>
                            <p><strong>Marital Status:</strong> {users?.maritalStatus || 'N/A'}</p>
                            <p><strong>Date Of Birth:</strong> {users?.birthDate || 'N/A'}</p>
                            <p><strong>Occupation:</strong> {users?.occupation || 'N/A'}</p>
                            <Button variant="primary" onClick={handleEdit}>Edit</Button>
                        </Col>
                    </Row>
                )}

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formMaritalStatus">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Marital Status</option>
                                    {enumLoading ? (
                                        <option value="" disabled>Loading...</option>
                                    ) : enumError ? (
                                        <option value="" disabled>Error Loading Data</option>
                                    ) : (
                                        data?.maritalStatus?.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formOccupation">
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formProfileImage">
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profileImage"
                                    onChange={handleImageUpload}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default Profile;