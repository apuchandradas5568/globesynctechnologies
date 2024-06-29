import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const data = {
      fullName,
      companyName,
      email,
      phone: `+${phone}`,
    };

    if (!data.fullName || !data.email || !data.phone) {
      setErrorMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    console.log(data);

    try {
      axios
        .post("/users/register-user", data)
        .then((res) => {
          setSuccessMessage(res.data.message);
          localStorage.setItem("globe-user", JSON.stringify(res.data.user));
          navigate("/otp-verification");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl text-center font-bold mb-4">Register</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              maxLength="50"
              className="w-full px-3 py-2 border rounded"
              placeholder="Full Name"
            />
            <small className="text-gray-500">
              Characters left: {50 - fullName.length}
            </small>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Company Name (Optional)
            </label>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              maxLength="50"
              className="w-full px-3 py-2 border rounded"
              placeholder="Company Name"
            />
            <small className="text-gray-500">
              Characters left: {50 - companyName.length}
            </small>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={handlePhoneChange}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
            />
          </div>

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-2 mb-4">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 mb-4">
              {errorMessage}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full px-3 cursor-pointer py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
