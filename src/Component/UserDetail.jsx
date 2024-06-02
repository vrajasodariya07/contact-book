import React, { useEffect } from 'react';
import '../userDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsUser } from '../action/userAction'; // Make sure this action is created
import { Container, Row, Col, Image } from 'react-bootstrap';
import Header from './Header';
import Loader from './Loader';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, users } = userDetail;

    useEffect(() => {
        dispatch(detailsUser(id));
    }, [dispatch, id]);

    return (
        <>
            <Header/>
            <Container className="user-detail-container">
                {loading ? (
                   <Loader/>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <Row className="my-4">
                        <Col md={6} className="user-detail-image">
                            <Image src={require('../images/demo-pic35.jpg')} fluid rounded />
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
                            {/* Add more user details as needed */}
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default UserDetail;
