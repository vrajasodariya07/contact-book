import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, updateUser } from '../action/userAction'; // Import updateUser action
import Header from '../Component/Header';
import Loader from '../Component/Loader';
import Button from 'react-bootstrap/Button';

const Request = () => {
    const dispatch = useDispatch();

    // Get user list from Redux store
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    // Dispatch action to fetch user list on component mount
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    // Filter inactive users (isActive: false)
    const inactiveUsers = users?.userList?.filter(user => !user.isActive);

    // Handle approve action
    const handleApprove = (request) => {
        const updatedRequest = { ...request, isActive: true };
        console.log(updatedRequest);
        dispatch(updateUser(updatedRequest));
    };

    // Handle decline action
    const handleDecline = (request) => {
        const updatedRequest = { ...request, isActive: false };
        dispatch(updateUser(updatedRequest));
    };

    return (
        <>
            <Header />
            <section>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <div className="container">
                        <h2>Registration Requests</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Given Name</th>
                                    <th>Last Name</th>
                                    <th>Middle Name</th>
                                    <th>Occupation</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Native Place</th>
                                    <th>Current Place</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inactiveUsers?.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.givenName}</td>
                                        <td>{request.lastName}</td>
                                        <td>{request.middleName}</td>
                                        <td>{request.occupation}</td>
                                        <td>{request.email}</td>
                                        <td>{request.phoneNumber}</td>
                                        <td>{request.native}</td>
                                        <td>{request.city}</td>
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
                )}
            </section>
        </>
    );
};

export default Request;