import React, { useState } from "react";

const AppointmentFormIC = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    onSubmit({
      name: name.trim(),
      phoneNumber,
    });

    setError("");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="appointment-form"
    >
      <div className="form-group">
        <label htmlFor="appointment-name">
          Name:
        </label>

        <input
          type="text"
          id="appointment-name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointment-phone">
          Phone Number:
        </label>

        <input
          type="tel"
          id="appointment-phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength="10"
          required
        />
      </div>

      {error && (
        <p className="appointment-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="appointment-submit"
      >
        Book Now
      </button>
    </form>
  );
};

export default AppointmentFormIC;