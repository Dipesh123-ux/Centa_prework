"use client"
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { getAllStates, getCitiesOfState, City } from 'country-state-city';

const LocationDropdown = ({handleAddCity}) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('')

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setCity(selectedCity);
      };

    const stateCodeMapping = {
        'Andaman and Nicobar Islands': 'AN',
        'Andhra Pradesh': 'AP',
        'Arunachal Pradesh': 'AR',
        'Assam': 'AS',
        'Bihar': 'BR',
        'Chandigarh': 'CH',
        'Chhattisgarh': 'CT',
        'Dadra and Nagar Haveli and Daman and Diu': 'DN',
        'Delhi': 'DL',
        'Goa': 'GA',
        'Gujarat': 'GJ',
        'Haryana': 'HR',
        'Himachal Pradesh': 'HP',
        'Jammu and Kashmir': 'JK',
        'Jharkhand': 'JH',
        'Karnataka': 'KA',
        'Kerala': 'KL',
        'Ladakh': 'LA',
        'Lakshadweep': 'LD',
        'Madhya Pradesh': 'MP',
        'Maharashtra': 'MH',
        'Manipur': 'MN',
        'Meghalaya': 'ML',
        'Mizoram': 'MZ',
        'Nagaland': 'NL',
        'Odisha': 'OR',
        'Puducherry': 'PY',
        'Punjab': 'PB',
        'Rajasthan': 'RJ',
        'Sikkim': 'SK',
        'Tamil Nadu': 'TN',
        'Telangana': 'TG',
        'Tripura': 'TR',
        'Uttar Pradesh': 'UP',
        'Uttarakhand': 'UT',
        'West Bengal': 'WB',
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        const stateCode = stateCodeMapping[state]
        setCities(City.getCitiesOfState('IN', stateCode));
    };

    return (
        <div className="flex flex-col items-center mt-32">
          <h2 className="text-2xl font-bold mb-4">Location Dropdown</h2>
          <div className="w-64 mb-4">
            <label htmlFor="state">Select State:</label>
            <RegionDropdown
              id="state"
              country={'India'}
              value={selectedState}
              onChange={handleStateChange}
              className="border border-gray-400 rounded p-2 w-full"
            />
          </div>
          <div className="w-64 mb-4">
            <label htmlFor="city">Select City:</label>
            <select
              id="city"
              value={city}
              onChange={handleCityChange}
              className="border border-gray-400 rounded p-2 w-full"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name} >
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={()=>handleAddCity(selectedState,city)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add City
          </button>
        </div>
      );
    };

export default LocationDropdown;
