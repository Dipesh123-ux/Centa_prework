"use client"
import React, { useContext,useState } from 'react'
import OTPPage from '@/components/Otp'
import AuthContext from '@/actions/authContext';
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const page = () => {

    const router = useRouter()
    const { VerifyUser, email } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    const handleVerify = async (otp) => {
        const response = await VerifyUser({ email: email, otp: otp });
        if (response.msg === 'success') {
            setTimeout(() => {
                setLoading(false)
                router.push('/user/signin');
            }, 1000)

        }
    }


    return (
        <div>
            {loading && <Loader color="rgba(0,0,0,0.6)" />}
            <OTPPage handleVerify={handleVerify} email={email} />
        </div>
    )
}

export default page