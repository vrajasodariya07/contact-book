import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, updateUser } from '../action/userAction';
import Loader from '../Component/Loader';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Request = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // Get user list from Redux store
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    // Dispatch action to fetch user list on component mount
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    // Filter inactive users (isActive: false)
    const inactiveUsers = users?.userList?.filter(user => !user.isActive);
    console.log(inactiveUsers);

    // Pagination
    const itemsPerPage = 6;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentInactiveUsers = inactiveUsers?.slice(firstIndex, lastIndex);

    // Handle approve action
    const handleApprove = (request) => {
        const updatedRequest = { ...request, isActive: true };
        dispatch(updateUser(updatedRequest)).then(() => {
            dispatch(listUsers()); 
        });
    };

    // Handle decline action
    const handleDecline = (request) => {
        const updatedRequest = { ...request, isActive: false };
        dispatch(updateUser(updatedRequest)).then(() => {
            dispatch(listUsers()); 
        });
    };

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <section className=''>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <>
                        <Row>
                            <Col>
                                <h2 className="mb-4 text-center">Registration Requests</h2>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col xs={11}>
                                <div className='table-responsive'>
                                    <table className="table table-striped border rounded">
                                        <thead>
                                            <tr>
                                                <th>Given Name</th>
                                                <th>Middle Name</th>
                                                <th>Last Name</th>
                                                <th>Occupation</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Native Place</th>
                                                <th>Community</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentInactiveUsers?.map((request) => (
                                                <tr key={request._id}>
                                                    <td>{request.givenName}</td>
                                                    <td>{request.middleName}</td>
                                                    <td>{request.lastName}</td>
                                                    <td>{request.occupation}</td>
                                                    <td>{request.email}</td>
                                                    <td>{request.phoneNumber}</td>
                                                    <td>{request.native}</td>
                                                    <td>{request.community}</td>
                                                    <td>
                                                        {/* Approve button */}
                                                        <Button variant="success" onClick={() => handleApprove(request)}>Approve</Button>
                                                        {/* Decline button */}
                                                        <Button variant="danger" onClick={() => handleDecline(request)}>Decline</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <ul className="pagination justify-content-center">
                                    {[...Array(Math.ceil(inactiveUsers?.length / itemsPerPage)).keys()].map(number => (
                                        <li key={number} className="page-item">
                                            <a onClick={() => paginate(number + 1)} className="page-link">
                                                {number + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </>
                )}
            </section>
        </>
    );
};

export default Request;