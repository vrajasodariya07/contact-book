import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../action/userAction';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import Loader from './Loader';

const Card = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const { search } = useOutletContext();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const data = users ? users.userList : [];

  const filteredUsers = data
    .filter(user => user.community === name && user.isActive) // Add the isActive filter here
    .filter(user =>
      (user.givenName && user.givenName.toLowerCase().includes(search.toLowerCase())) ||
      (user.middleName && user.middleName.toLowerCase().includes(search.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(search.toLowerCase())) ||
      (user.city && user.city.toLowerCase().includes(search.toLowerCase())) ||
      (user.community && user.community.toLowerCase().includes(search.toLowerCase())) ||
      (user.native && user.native.toLowerCase().includes(search.toLowerCase())) ||
      (user.gender && user.gender.toLowerCase().includes(search.toLowerCase())) ||
      (user.maritalStatus && user.maritalStatus.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
      (user.phoneNumber && user.phoneNumber.toLowerCase().includes(search.toLowerCase())) ||
      (user.occupation && user.occupation.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {filteredUsers.map(user => (
              <Col xs={4} className='mb-3' key={user._id}>
                <div className="card" style={{ width: "100%" }}>
                  <img src={require(`../images/demo-pic35.jpg`)} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{user.givenName}</h5>
                    <p className="card-text">{user.occupation ? user.occupation : "N/A"}</p>
                    <Link to={`/home/user/${user._id}`} className="btn btn-primary">View More</Link>
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