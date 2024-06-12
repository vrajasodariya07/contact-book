// import React, { useEffect } from 'react';
// import { Col, Container, Row, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { listUsers } from '../action/userAction';
// import { useParams, Link, useOutletContext } from 'react-router-dom';
// import Loader from './Loader';
// import '../Card.css'; 

// const Card = () => {
//   const { name } = useParams();
//   const dispatch = useDispatch();

//   const userList = useSelector((state) => state.userList);
//   const { loading, error, users } = userList;

//   const { search } = useOutletContext();

//   useEffect(() => {
//     dispatch(listUsers());
//   }, [dispatch]);

//   const data = users ? users.userList : [];

//   const filteredUsers = data
//     .filter(user => user.community === name && user.isActive)
//     .filter(user =>
//       (user.givenName && user.givenName.toLowerCase().includes(search.toLowerCase())) ||
//       (user.middleName && user.middleName.toLowerCase().includes(search.toLowerCase())) ||
//       (user.lastName && user.lastName.toLowerCase().includes(search.toLowerCase())) ||
//       (user.city && user.city.toLowerCase().includes(search.toLowerCase())) ||
//       (user.community && user.community.toLowerCase().includes(search.toLowerCase())) ||
//       (user.native && user.native.toLowerCase().includes(search.toLowerCase())) ||
//       (user.gender && user.gender.toLowerCase().includes(search.toLowerCase())) ||
//       (user.maritalStatus && user.maritalStatus.toLowerCase().includes(search.toLowerCase())) ||
//       (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
//       (user.phoneNumber && user.phoneNumber.toLowerCase().includes(search.toLowerCase())) ||
//       (user.occupation && user.occupation.toLowerCase().includes(search.toLowerCase()))
//     );

//   return (
//     <Container>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <Row>
//           {filteredUsers.map(user => (
//             <Col xs={12} md={6} lg={4} className='mb-4' key={user._id}>
//               <div className="profile-card">
//                 <div className="profile-header">
//                   <img src={require(`../images/demo-pic35.jpg`)} className="profile-img" alt="Profile" />
//                   <div className="profile-info">
//                     <h2 className="profile-name">{user.givenName} {user.middleName} {user.lastName}</h2>
//                     <p className="profile-occupation">{user.occupation ? user.occupation : "N/A"}</p>
//                     <p className="profile-location">{user.city}, {user.country}</p>
//                   </div>
//                 </div>
//                 <div className="profile-footer">
//                   <Link to={`/home/user/${user._id}`} className="btn btn-primary">View</Link>
//                 </div>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default Card;

import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Dropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../action/userAction';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import Loader from './Loader';
import '../Card.css'; // Create this file for custom styles

const Card = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const { search } = useOutletContext();
  const [sortOption, setSortOption] = useState('Popularity');

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const data = users ? users.userList : [];

  const filteredUsers = data
    .filter(user => user.community === name && user.isActive)
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
              <Col xs={12} className='mb-3' key={user._id}>
                <div className="profile-card">
                  <div className="profile-header">
                    <img src={require(`../images/demo-pic35.jpg`)} className="profile-img" alt="..." />
                    <div className="profile-info">
                      <h2 className="profile-name">{user.givenName} {user.middleName} {user.lastName}</h2>
                      <p className="profile-occupation">{user.occupation ? user.occupation : "N/A"}</p>
                      <p className="profile-email mb-2">{user.email ? user.email : "N/A"}</p>
                      <p className="profile-phone mb-2">{user.phoneNumber ? user.phoneNumber : "N/A"}</p>
                      <p className="profile-location">{user.city ? user.city : "N/A"}</p>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <Link to={`/home/user/${user._id}`} className="btn btn-primary">View More</Link>
                    <Button variant="outline-primary">Following</Button>
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
