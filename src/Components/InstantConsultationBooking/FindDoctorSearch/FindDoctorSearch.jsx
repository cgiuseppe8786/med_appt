import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./FindDoctorSearch.css";

const specialities = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearchIC = () => {
  const [searchDoctor, setSearchDoctor] = useState("");
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const filteredSpecialities = specialities.filter(
    (speciality) =>
      speciality
        .toLowerCase()
        .includes(searchDoctor.toLowerCase())
  );

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setShowResults(false);

    navigate(
      `/instant-consultation?speciality=${encodeURIComponent(
        speciality
      )}`
    );
  };

  return (
    <div className="finddoctor">
      <div className="doctor-search-box">
        <i
          className="fa fa-search search-icon"
          aria-hidden="true"
        ></i>

        <input
          type="text"
          className="search-doctor-input-box"
          placeholder="Search by speciality..."
          value={searchDoctor}
          onFocus={() => setShowResults(true)}
          onChange={(event) => {
            setSearchDoctor(event.target.value);
            setShowResults(true);
          }}
          aria-label="Search doctor speciality"
        />

        {showResults && (
          <div className="search-doctor-input-results">
            {filteredSpecialities.length > 0 ? (
              filteredSpecialities.map((speciality) => (
                <button
                  type="button"
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleDoctorSelect(speciality);
                  }}
                >
                  <span className="speciality-icon">
                    <i
                      className="fa fa-user-md"
                      aria-hidden="true"
                    ></i>
                  </span>

                  <span className="speciality-name">
                    {speciality}
                  </span>

                  <span className="speciality-type">
                    SPECIALITY
                  </span>
                </button>
              ))
            ) : (
              <div className="no-speciality">
                No speciality found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearchIC;