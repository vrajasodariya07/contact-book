import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Header from '../Component/Header';
import { Outlet } from 'react-router-dom';

const Index = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Row className='g-0'>
        <Col md={3} xl={2}>
          <Header setSearch={setSearch} />
        </Col>
        <Col md={9} xl={10} className='overflow-x-hidden'>
          <Outlet context={{ search }} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
