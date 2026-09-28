import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const loadNotificationData = () => {
        const storedUsername = sessionStorage.getItem("email");

        const storedDoctorData = JSON.parse(
            localStorage.getItem("doctorData")
        );

        let storedAppointmentData = null;

        if (storedDoctorData?.name) {
            storedAppointmentData = JSON.parse(
                localStorage.getItem(storedDoctorData.name)
            );
        }

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        } else {
            setIsLoggedIn(false);
            setUsername("");
        }

        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        } else {
            setDoctorData(null);
        }

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
            setShowNotification(true);
        } else {
            setAppointmentData(null);
            setShowNotification(false);
        }
    };

    useEffect(() => {
        loadNotificationData();

        window.addEventListener(
            "appointmentChanged",
            loadNotificationData
        );

        window.addEventListener(
            "storage",
            loadNotificationData
        );

        return () => {
            window.removeEventListener(
                "appointmentChanged",
                loadNotificationData
            );

            window.removeEventListener(
                "storage",
                loadNotificationData
            );
        };
    }, []);

    const displayUsername =
        appointmentData?.name ||
        username?.split("@")[0] ||
        "";

    return (
        <>
            {children}

            {isLoggedIn &&
                showNotification &&
                appointmentData &&
                doctorData && (
                    <div className="appointment-notification">
                        <div className="appointment-notification__icon">
                            <i
                                className="fa fa-calendar-check-o"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="appointment-notification__content">
                            <h3 className="appointment-notification__title">
                                Appointment Details
                            </h3>

                            <p>
                                <strong>Doctor:</strong> {doctorData.name}
                            </p>

                            <p>
                                <strong>Speciality:</strong> {doctorData.speciality}
                            </p>

                            <p>
                                <strong>Name:</strong> {appointmentData.name}
                            </p>

                            <p>
                                <strong>Phone Number:</strong> {appointmentData.phoneNumber}
                            </p>

                            <p>
                                <strong>Date of Appointment:</strong>{" "}
                                {appointmentData.appointmentDate}
                            </p>

                            <p>
                                <strong>Time Slot:</strong> {appointmentData.timeSlot}
                            </p>
                        </div>
                    </div>
                )}
        </>
    );
};

export default Notification;