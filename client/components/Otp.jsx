import React, { useRef ,useState} from 'react';

const OTPPage = ({ handleVerify, email }) => {
  const inputRefs = useRef([]);
  const [otp,setOTP] = useState('');
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    setOTP((prevOTP) => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index] = value;
        return updatedOTP.join('');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <div className="mb-8">
          <p className="text-center mb-2">
            An email has been sent to {email}. Please verify your account.
          </p>
          {/* Add any additional styling for the message above */}
        </div>
        <div className="flex items-center justify-center mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="appearance-none border rounded mx-1 w-12 h-12 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleVerify(otp)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
