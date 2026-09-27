import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FindDoctorSearch from "../InstantConsultationBooking/FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "../InstantConsultationBooking/DoctorCard/DoctorCard";

import "./BookingConsultation.css";

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const speciality = searchParams.get("speciality");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.npoint.io/9a5543d36f1460da2f63"
        );

        if (!response.ok) {
          throw new Error("Unable to load doctors");
        }

        const data = await response.json();

        setDoctors(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    if (!speciality) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        doctor.speciality.toLowerCase() ===
        speciality.toLowerCase()
    );

    setFilteredDoctors(filtered);
  }, [speciality, doctors]);

  return (
    <main className="booking-consultation">

      {/* HERO */}
      <section className="booking-consultation-hero">

        <span className="booking-consultation-eyebrow">
          Appointments
        </span>

        <h1>Book a Doctor Appointment</h1>

        <p>
          Choose a speciality, find a doctor and schedule
          your appointment for a future date and time.
        </p>

        <FindDoctorSearch />

      </section>

      {/* RESULTS */}
      <section className="booking-consultation-results">

        {loading && (
          <div className="booking-message">
            Loading doctors...
          </div>
        )}

        {error && (
          <div className="booking-error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="booking-results-header">

              <div>
                <h2>
                  {speciality
                    ? `${speciality} Doctors`
                    : "Available Doctors"}
                </h2>

                <p>
                  Select a doctor to schedule your appointment.
                </p>
              </div>

              <span className="booking-doctor-count">
                {filteredDoctors.length}{" "}
                {filteredDoctors.length === 1
                  ? "doctor"
                  : "doctors"}
              </span>

            </div>

            {filteredDoctors.length > 0 ? (
              <div className="booking-doctors-grid">

                {filteredDoctors.map((doctor, index) => (
                  <DoctorCard
                    key={`${doctor.name}-${index}`}
                    name={doctor.name}
                    speciality={doctor.speciality}
                    experience={doctor.experience}
                    ratings={doctor.ratings}
                  />
                ))}

              </div>
            ) : (
              <div className="booking-empty">
                <h3>No doctors found</h3>

                <p>
                  Select another speciality.
                </p>
              </div>
            )}
          </>
        )}

      </section>
    </main>
  );
};

export default BookingConsultation;