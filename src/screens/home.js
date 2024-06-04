import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enum_data, listUsers } from '../action/userAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Header from '../Component/Header';
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
          <Col xs={6}>
            <h2 className="title">User List</h2>
            {loading || enumLoading ? (
              <Loader />
            ) : error ? (
              <div>{error}</div>
            ) : enumError ? (
              <div>{enumError}</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Community</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.community?.map((community, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/home/card/${community}`}>
                          {community}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;