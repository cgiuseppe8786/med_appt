import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";

import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({
    name,
    speciality,
    experience,
    ratings,
    profilePic
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

    const renderStars = () => {
        const rating = Number(ratings);

        if (!Number.isNaN(rating)) {
            return Array.from(
                { length: Math.min(5, Math.round(rating)) },
                (_, index) => (
                    <i
                        key={index}
                        className="fa fa-star"
                        aria-hidden="true"
                    />
                )
            );
        }

        return ratings;
    };

    return (
        <div className="doctor-card-container">
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

                    <div className="doctor-card-detail-consultationfees">
                        {renderStars()}
                    </div>
                </div>
            </div>

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

                        <div className="appointment-doctor">
                            <div className="appointment-doctor-icon">
                                <div className="appointment-doctor-icon">
                                    {profilePic ? (
                                        <img
                                            src={profilePic}
                                            alt={`Dr. ${name}`}
                                            className="doctor-profile-picture"
                                        />
                                    ) : (
                                        <i
                                            className="fa fa-user-md"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
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
                                    {renderStars()}
                                </span>
                            </div>
                        </div>

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