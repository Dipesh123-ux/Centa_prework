"use client"
import React, { useContext,useState } from 'react'
import OTPPage from '@/components/Otp'
import AuthContext from '@/actions/authContext';
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader';

const page = () => {

    const router = useRouter()
    const { Verify, email } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    const handleVerify = async (otp) => {
        const response = await Verify({ email: email, otp: otp });
        router.push('/admin/signin');
    }


    return (
        <div>
            {loading && <Loader color="rgba(0,0,0,0.6)" />}
            <OTPPage handleVerify={handleVerify} email={email} />
        </div>
    )
}

export default page