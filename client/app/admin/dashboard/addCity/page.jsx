"use client"
import React, { useContext, useState } from 'react'
import LocationDropdown from '@/components/Location'
import Header from '@/components/header'
import AuthContext from '@/actions/authContext'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

const AddCity = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { AddCity } = useContext(AuthContext)

  const handleAddCity = async (state, city) => {
    setLoading(true)
    const res = await AddCity({ state, city });
    if (res.msg == 'success') {
      setTimeout(() => {
        setLoading(false)
        router.push('/admin/dashboard');
      }, 1000)
    }

  }

  return (
    <div>
     {loading && <Loader color="rgba(0,0,0,0.6)" /> }
      <Header />
      <LocationDropdown handleAddCity={handleAddCity} />
    </div>
  )
}

export default AddCity