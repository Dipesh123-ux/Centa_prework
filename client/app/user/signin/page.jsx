"use client"
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import AuthContext from '@/actions/authContext';
import { useRouter } from 'next/navigation'
import SignInPage from '@/components/signin';
import Loader from '@/components/Loader';

const SignIn = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { loginUser } = useContext(AuthContext)
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('');

    useEffect(() => {

        if (error) {
            setError('');
        }

    }, [values.password])

    const handleLogin = async () => {
        try {
            const res = await loginUser(values);
            if (res.msg === 'success') {
                setTimeout(() => {
                    setLoading(false)
                    router.push('/user/dashboard');
                }, 1000)

            }
            else {
                setError(res.msg)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <SignInPage handleLogin={handleLogin}  error={error} values={values} setValues={setValues} url={'/user/signup'}/>
    );
};


export default SignIn;
