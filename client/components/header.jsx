"use client"
import React, { useContext } from 'react'
import AuthContext from '@/actions/authContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const header = () => {
    // Mock user data
    const { user, logout } = useContext(AuthContext);
    const router = useRouter()

    const handleLogout = async () => {
        await logout();
        router.push('/')
    };
    return (
        <div>
            <header className="p-4 bg-gray-200 flex justify-between">
                <Link href={user?.isAdmin ? '/admin/dashboard' : '/user/dashboard'} className='text-xl font-bold'>{user?.name}'s Dashboard</Link>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>
        </div>
    )
}

export default header