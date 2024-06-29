import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Navbar from "../components/Navbar";

const EventRegister = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientMobile, setClientMobile] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventLocationLink, setEventLocationLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleClientMobileChange = (e) => {
    setClientMobile(e);
  };

  const handleEventDateTimeChange = (e) => {
    setEventDateTime(e.target.value);
  };

  const handleEventAddressChange = (e) => {
    setEventAddress(e.target.value);
  };

  const handleEventLocationLinkChange = (e) => {
    setEventLocationLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Form submission logic here
    const eventData = {
      eventTitle,
      eventDescription,
      clientName,
      clientMobile,
      eventDateTime,
      eventAddress,
      eventLocationLink,
    };

    axios
      .post("/events/create-event", eventData)
      .then((res) => {
        setSuccessMessage(res.data.message);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });

    console.log("Event Data:", eventData);
    // Send eventData to API or perform further actions
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white  p-6 rounded shadow-md w-full max-w-xl"
        >
          <h2 className="text-2xl text-center font-bold mb-4">
            Register for Event
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700">Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={handleEventTitleChange}
              maxLength={50}
              className="w-full px-3 py-2 border rounded"
              placeholder="Event Title (max 50 characters)"
              required
            />
            <small className="text-gray-500">
              Characters left: {50 - eventTitle.length}
            </small>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Event Description</label>
            <textarea
              value={eventDescription}
              onChange={handleEventDescriptionChange}
              maxLength={250}
              className="w-full px-3 py-2 border rounded"
              placeholder="Event Description (max 250 characters)"
              rows={4}
              required
            />
            <small className="text-gray-500">
              Characters left: {250 - eventDescription.length}
            </small>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={handleClientNameChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Client Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <PhoneInput
              country={"in"}
              value={clientMobile}
              onChange={handleClientMobileChange}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Event Date and Time</label>
            <input
              type="datetime-local"
              value={eventDateTime}
              onChange={handleEventDateTimeChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Event Address</label>
            <input
              type="text"
              value={eventAddress}
              onChange={handleEventAddressChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Event Address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Event Location Link</label>
            <input
              type="url"
              value={eventLocationLink}
              onChange={handleEventLocationLinkChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Event Location Link"
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
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegister;
