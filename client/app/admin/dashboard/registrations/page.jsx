"use client"
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Header from '@/components/header';
import moment from 'moment';
import Link from 'next/link';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { getUsers, deleteRegistration } = useContext(AuthContext);


    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data.users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const formatDate = (date) => {
        return moment(date).format('MMMM Do, YYYY');
    };

    const handleDelete = async (Id) => {

        const response = await deleteRegistration(Id);
        if (response.msg == 'success') {
            fetchUsers();
        }

    };

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {users &&
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="bg-white p-4 rounded shadow-md"
                            >
                                <h2 className="text-lg font-semibold mb-2">{user?.user?.name}</h2>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">Email: </span>
                                    {user?.user?.email}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">State: </span>
                                    {user.state}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">City: </span>
                                    {user.city}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">Subject: </span>
                                    {user.subject}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">Date: </span>
                                    {formatDate(user.date)}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-bold">Slot: </span>
                                    {user?.slot}
                                </p>
                                <div className="flex justify-end">
                                    <Link
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                        href={`/admin/dashboard/registrations/${user._id}`
                                    }
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Users;

