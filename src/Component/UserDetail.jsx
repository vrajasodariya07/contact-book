import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsUser } from '../action/userAction'; // You'll need to create this action
import { Container, Row, Col, Image } from 'react-bootstrap';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user } = userDetail;
    console.log(userDetail);

    useEffect(() => {
        dispatch(detailsUser(id));
    }, [dispatch, id]);

    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <Row className="my-4">
                    <Col md={6}>
                        <Image src={require('../images/demo-pic35.jpg')} fluid rounded />
                    </Col>
                    <Col md={6}>
                        <h1>{user.givenName} {user.middleName} {user.lastName}</h1>
                        <p><strong>Occupation:</strong> {user.occupation}</p>
                        <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
                        <p><strong>Native:</strong> {user.native}</p>
                        <p><strong>Current City:</strong> {user.currentCity}</p>
                        <p><strong>Community:</strong> {user.community}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {/* Add more user details as needed */}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default UserDetail;
