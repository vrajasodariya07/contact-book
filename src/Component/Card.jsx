import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../action/userAction';
import { useParams, Link } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

const Card = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    
    const [search, setSearch] = useState('');

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    const data = users ? users.userList : [];

    const filteredUsers = data
        .filter(user => user.community === name)
        .filter(user => 
            (user.givenName && user.givenName.toLowerCase().includes(search.toLowerCase())) ||
            (user.occupation && user.occupation.toLowerCase().includes(search.toLowerCase()))
        );

    return (
        <>
            <Header setSearch={setSearch} />
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <Row>
                        {filteredUsers.map(user => (
                            <Col xs={3} className='mb-2' key={user._id}>
                                <div className="card" style={{ width: "100%" }}>
                                    <img src={require(`../images/demo-pic35.jpg`)} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{user.givenName}</h5>
                                        <p className="card-text">{user.occupation}</p>
                                        <Link to={`/user/${user._id}`} className="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default Card;