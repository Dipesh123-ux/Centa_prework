"use client"
import React, { useContext } from 'react'
import AuthContext from '@/actions/authContext'
import Link from 'next/link';
import Header from '@/components/header';
const HomePage = () => {
    return (
        <>
            <div className=" h-screen">
               <Header />
                <div className="flex items-center justify-center h-3/4" >
                    <div className="flex flex-col items-center space-y-4">
                        <Link href='/admin/dashboard/registrations' className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64">
                            View Registrations
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="/admin/dashboard/addCity" className="bg-green-500 text-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-32">
                                Add City
                            </Link>
                            <Link href='/admin/dashboard/addSubject' className="bg-red-500 text-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32">
                                Add Subject
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
