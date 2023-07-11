"use client"
import React, { useState, useContext } from 'react';
import AuthContext from '@/actions/authContext';
import { useRouter } from 'next/navigation'
import SignUpPage from '@/components/signup';
import Loader from '@/components/Loader';

const SignUp = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { SignUpUser } = useContext(AuthContext);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SignUpUser(values);

            if (response.msg === 'success') {
                setTimeout(() => {
                    setLoading(false)
                    router.push('/user/verify');
                }, 1000)

            } else {
                setError(response.msg);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };


    return (
        <>
            <SignUpPage handleSubmit={handleSubmit} error={error} values={values} setValues={setValues} />
        </>
    );
};

export default SignUp;

