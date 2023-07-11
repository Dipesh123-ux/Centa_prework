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

    const { SignUpAdmin } = useContext(AuthContext);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SignUpAdmin(values);

            if (response.msg === 'success') {
                setTimeout(() => {
                    setLoading(false)
                    router.push('/admin/verify')
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
            {loading && <Loader color="rgba(0,0,0,0.6)" />}
            <SignUpPage handleSubmit={handleSubmit} error={error} values={values} setValues={setValues} />
        </>
    );
};

export default SignUp;

