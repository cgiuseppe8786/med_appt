import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCard.css";

import AppointmentFormIC from "../AppointmentForm/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({
    name,
    speciality,
    experience,
    ratings,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [appointment, setAppointment] = useState(null);

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData,
        };

        setAppointment(newAppointment);
    };

    const handleCancel = () => {
        setAppointment(null);
    };

    return (
        <div className="doctor-card-container">

            {/* DETTAGLI DOTTORE */}
            <div className="doctor-card-details-container">

                <div className="doctor-card-profile-image-container">
                    <i
                        className="fa fa-user-md"
                        aria-hidden="true"
                    />
                </div>

                <div className="doctor-card-details">

                    <div className="doctor-card-detail-name">
                        {name}
                    </div>

                    <div className="doctor-card-detail-speciality">
                        {speciality}
                    </div>

                    <div className="doctor-card-detail-experience">
                        {experience} years experience
                    </div>

                    <div className="doctor-card-detail-rating">
                        <strong>Ratings:</strong>
                        <span className="rating-stars">
                            {ratings}
                        </span>
                    </div>

                </div>
            </div>

            {/* PRENOTAZIONE */}
            <div className="doctor-card-options-container">
                <button
                    type="button"
                    className="book-appointment-btn"
                    onClick={() => setShowModal(true)}
                >
                    <span>Book Appointment</span>
                    <small>No Booking Fee</small>
                </button>
            </div>

            {/* POPUP APPUNTAMENTO */}
            <Popup
                modal
                open={showModal}
                onClose={() => setShowModal(false)}
                className="appointment-popup"
            >
                {(close) => (
                    <div className="appointment-modal">

                        <button
                            type="button"
                            className="modal-close"
                            onClick={close}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        {/* DATI DOTTORE NEL POPUP */}
                        <div className="appointment-doctor">

                            <div className="appointment-doctor-icon">
                                <i
                                    className="fa fa-user-md"
                                    aria-hidden="true"
                                />
                            </div>

                            <h2>{name}</h2>

                            <div className="appointment-speciality">
                                {speciality}
                            </div>

                            <div className="appointment-experience">
                                {experience} years experience
                            </div>

                            <div className="appointment-rating">
                                <strong>Ratings:</strong>
                                <span className="rating-stars">
                                    {ratings}
                                </span>
                            </div>

                        </div>
                        {/* FORM / APPUNTAMENTO PRENOTATO */}
                        {!appointment ? (
                            <AppointmentFormIC
                                doctorName={name}
                                doctorSpeciality={speciality}
                                onSubmit={handleFormSubmit}
                            />
                        ) : (
                            <div className="appointment-booked">

                                <h3>Appointment Booked!</h3>

                                <div className="appointment-booked-info">
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {appointment.name}
                                    </p>

                                    <p>
                                        <strong>Phone Number:</strong>{" "}
                                        {appointment.phoneNumber}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="cancel-appointment-btn"
                                    onClick={handleCancel}
                                >
                                    Cancel Appointment
                                </button>

                            </div>
                        )}

                    </div>
                )}
            </Popup>

        </div>
    );
};

export default DoctorCardIC;