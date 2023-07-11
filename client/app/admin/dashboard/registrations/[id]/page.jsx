"use client"
import AuthContext from '@/actions/authContext'
import Header from '@/components/header'
import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

const Home = ({ params }) => {

    const id = params.id;

    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const { getStates, getCities, getSubjects, getDates, getSlots, user, addData, getRegistration, editRegistration } = useContext(AuthContext)

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Fetch initial data from the backend
        fetchStates();
        fetchSubjects();
        fetchDetails();

    }, []);

    const fetchDetails = async () => {
        const response = await getRegistration(id);
        setSelectedState(response.user.state);
        await fetchCities(response.user.state)
        setSelectedCity(response.user.city);
        setSelectedSubject(response.user.subject)
        await fetchDates(response.user.subject)
        setSelectedDate(new Date(response.user.date));
        await fetchTimeSlots(response.user.subject, response.user.date)
        setSelectedTime(response?.user?.slot);

    }

    const fetchStates = async () => {
        try {
            const response = await getStates();
            console.log(response.states, "states");
            setStates(response.states);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchCities = async (state) => {
        try {
            const response = await getCities(state)
            console.log(response, "cities");
            setCities(response.cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
            console.log(response, "subjects")
            setSubjects(response.subjects);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchDates = async (subject) => {
        try {
            const response = await getDates(subject);
            console.log(response, "dates");
            setDates(response.dates);
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    };

    const fetchTimeSlots = async (subject, date) => {
        try {
            const response = await getSlots({ subject: subject, date });
            console.log(response, "time");
            setTimeSlots(response.slots);
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };

    const handleStateChange = (event) => {
        const selectedStateId = event.target.value;
        setSelectedState(selectedStateId);
        setSelectedCity('');
        setCities([]);
        fetchCities(selectedStateId);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setSelectedDate(null);
        setDates([]);
        fetchDates(event.target.value);
    };

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        setTimeSlots([]);
        await fetchTimeSlots(selectedSubject, date);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await editRegistration(id, {
            state: selectedState,
            subject: selectedSubject,
            city: selectedCity,
            date: selectedDate,
            slot: selectedTime
        })
        if (response.msg == 'success') {
            setTimeout(() => {
              setLoading(false)
              router.push('/admin/dashboard/registrations');
            }, 1000)
          }

    }

    return (
        <div className=" bg-gray-100">

            <Header />

            <div className="flex justify-center items-center h-screen">

                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-700">
                                State
                            </label>
                            <select
                                id="state"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                value={selectedState}
                                onChange={handleStateChange}
                                required
                            >
                                <option value="">Select a state</option>
                                {states && states?.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
                                City
                            </label>
                            <select
                                id="city"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                value={selectedCity}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Select a city</option>
                                {cities && cities?.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <select
                                id="subject"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                required
                            >
                                <option value="">Select a subject</option>
                                {subjects?.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="datepicker" className="block mb-2 text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <DatePicker
                                id="datepicker"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                required
                                highlightDates={dates.map(date => {
                                    const nextDay = new Date(date);
                                    nextDay.setDate(nextDay.getDate() + 1);
                                    return nextDay;
                                })}
                            />

                        </div>

                        <div className="mb-6">
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">
                                Time Slot
                            </label>
                            <select
                                id="time"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                required
                            >
                                <option value="">Select a time slot</option>
                                {timeSlots?.map((timeSlot, index) => (
                                    <option key={index} value={timeSlot}>
                                        {timeSlot}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                            >
                            Update
                        </button>
                    </form>
                            {loading && <Loader color="rgba(0,0,0,0.6)" />}
                </div>
            </div>
        </div>
    );
}

export default Home;