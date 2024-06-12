import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enum_data, listUsers } from '../action/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css'; // Ensure you have custom CSS here
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../Component/Loader';

const HomePage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userEnum = useSelector((state) => state.userEnum);
  const { data, loading: enumLoading, error: enumError } = userEnum;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(enum_data());
  }, [dispatch]);

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <h2 className="title">User List</h2>
            {loading || enumLoading ? (
              <Loader />
            ) : error ? (
              <div>{error}</div>
            ) : enumError ? (
              <div>{enumError}</div>
            ) : (
              <Row>
                {data?.community?.map((community, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
                    <Card className={`custom-card custom-gradient-${index % 4}`}>
                      <Card.Body>
                        {/* <Card.Title>Community {index + 1}</Card.Title> */}
                        <Card.Text>
                          <Link to={`/home/card/${community}`} className="text-white">
                            {community}
                          </Link>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;