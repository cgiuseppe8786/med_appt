import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./InstantConsultation.css";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearch";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const speciality = searchParams.get("speciality");

  useEffect(() => {
    const getDoctorsDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.npoint.io/9a5543d36f1460da2f63"
        );

        if (!response.ok) {
          throw new Error("Unable to load doctors.");
        }

        const data = await response.json();

        setDoctors(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getDoctorsDetails();
  }, []);

  useEffect(() => {
    if (!speciality) {
      setFilteredDoctors([]);
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
    <main className="instant-consultation">
      <section className="instant-consultation__hero">
        <span className="instant-consultation__eyebrow">
          Instant Consultation
        </span>

        <h1>Find a doctor and consult instantly</h1>

        <p>
          Select a speciality and find an available doctor
          for your consultation.
        </p>

        <FindDoctorSearchIC />
      </section>

      <section className="instant-consultation__results">
        {loading && (
          <p className="consultation-message">
            Loading doctors...
          </p>
        )}

        {error && (
          <p className="consultation-message consultation-error">
            {error}
          </p>
        )}

        {!loading && !error && !speciality && (
          <div className="consultation-empty">
            <i
              className="fa fa-user-md"
              aria-hidden="true"
            ></i>

            <h2>Choose a speciality</h2>

            <p>
              Search for a medical speciality above to see
              the available doctors.
            </p>
          </div>
        )}

        {!loading && !error && speciality && (
          <>
            <div className="results-heading">
              <div>
                <span className="results-label">
                  Search results
                </span>

                <h2>{speciality}</h2>

                <p>
                  Book an appointment with an available
                  doctor.
                </p>
              </div>

              <span className="results-count">
                {filteredDoctors.length}{" "}
                {filteredDoctors.length === 1
                  ? "doctor"
                  : "doctors"}
              </span>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="doctor-results-grid">
                {filteredDoctors.map((doctor, index) => (
                  <DoctorCardIC
                    {...doctor}
                    key={`${doctor.name}-${index}`}
                  />
                ))}
              </div>
            ) : (
              <div className="consultation-empty">
                <h2>No doctors found</h2>

                <p>
                  Try selecting another speciality.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default InstantConsultation;