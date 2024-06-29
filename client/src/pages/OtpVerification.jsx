import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()


  const handleOtpChange = (e) => {
    const { value } = e.target;
    // Ensure the input is only numbers and has a maximum length of 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    // Call the API to verify the OTP

    axios.post('/users/otp-verify', { otp })
    .then(res => {
      console.log(res);
      window.alert(res.data.message);
      if(res.status === 200) {
        navigate("/event-register");
      }
      setLoading(false)
    })
    .catch(error => {
      setErrorMessage(error.response.data.message);
      setLoading(false)
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="6-digit OTP"
            maxLength="6"
          />
        </div>
 

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">
            {errorMessage}
          </div>
        )}
        
        <button disabled={loading} type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Verify</button>
      </form>
    </div>
  );
};

export default OtpVerification;
