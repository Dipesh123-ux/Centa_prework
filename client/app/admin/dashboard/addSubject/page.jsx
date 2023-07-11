"use client"
import React, { useState, useContext } from 'react';
import AuthContext from '@/actions/authContext';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Header from '@/components/header';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation'

export default function Home() {
    const [subject, setSubject] = useState('');
    const [date, setSelectedDate] = useState(new Date());
    const [time, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { AddSubject } = useContext(AuthContext);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const response = await AddSubject({ subject, date, time });
        if (response.msg == "success") {
            setTimeout(() => {
                setLoading(false)
                router.push('/admin/dashboard');
            }, 1000)
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />
            <div className='items-center justify-center h-screen flex' >
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Add Subject</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 border p-2 focus:ring-indigo-500"
                                value={subject}
                                onChange={(event) => setSubject(event.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="datepicker" className="block mb-2 text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <DatePicker
                                id="datepicker"
                                selected={date}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">
                                Time
                            </label>
                            <select
                                id="time"
                                className="w-full border p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={time}
                                onChange={handleTimeChange}
                                required
                            >
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                            </select>
                        </div>
                        {loading && <Loader color="rgba(0,0,0,0.6)" />}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
