import React, { useState } from "react";

const AppointmentForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");

  // Restituisce la data di domani nel formato YYYY-MM-DD
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;

    // Solo numeri e massimo 10 cifre
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
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!timeSlot) {
      setError("Please select a time slot.");
      return;
    }

    onSubmit({
      name: name.trim(),
      phoneNumber,
      appointmentDate,
      timeSlot,
    });

    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setTimeSlot("");
    setError("");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="appointment-form"
    >
      {/* NAME */}
      <div className="form-group">
        <label htmlFor="appointment-name">
          Name:
        </label>

        <input
          type="text"
          id="appointment-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      {/* PHONE */}
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

      {/* DATE */}
      <div className="form-group">
        <label htmlFor="appointment-date">
          Appointment Date:
        </label>

        <input
          type="date"
          id="appointment-date"
          value={appointmentDate}
          min={getTomorrowDate()}
          onChange={(event) =>
            setAppointmentDate(event.target.value)
          }
          required
        />
      </div>

      {/* TIME SLOT */}
      <div className="form-group">
        <label htmlFor="appointment-time">
          Time Slot:
        </label>

        <select
          id="appointment-time"
          value={timeSlot}
          onChange={(event) =>
            setTimeSlot(event.target.value)
          }
          required
        >
          <option value="">
            Select a time slot
          </option>

          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
          <option value="16:00">04:00 PM</option>
        </select>
      </div>

      {/* ERROR */}
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

export default AppointmentForm;