import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Component/Header'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <Row className='g-0'>
        <Col xs={3}>
          <Header/>
        </Col>
        <Col xs={9} className='overflow-x-hidden'>
          <Outlet />
        </Col>
      </Row>
    </>
  )
}

export default Index;