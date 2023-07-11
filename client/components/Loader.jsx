"use client"
import React from 'react'
import { Puff } from 'react-loader-spinner'

const Loader = ({color}) => {
    return (
        <div className="loader-container absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Puff
                height={45}
                width={45}
                radius={1}
                color={color}
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader