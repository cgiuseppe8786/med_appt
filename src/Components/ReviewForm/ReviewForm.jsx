import React, { useState } from "react";
import GiveReviews from "./GiveReviews";
import "./ReviewForm.css";

const ReviewForm = () => {
  const appointments = JSON.parse(
    localStorage.getItem("appointments")
  ) || [];

  const [reviewVersion, setReviewVersion] = useState(0);

  const refreshReviews = () => {
    setReviewVersion((value) => value + 1);
  };

  return (
    <div className="reviews-page">
      <div className="reviews-container">

        <h1>Reviews</h1>

        <div className="reviews-table-wrapper">
          <table className="reviews-table">

            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Provide feedback</th>
                <th>Review Given</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => {
                  const reviewKey =
                    `review-${appointment.id}`;

                  const reviewGiven =
                    localStorage.getItem(reviewKey) !== null;

                  return (
                    <tr key={`${appointment.id}-${reviewVersion}`}>
                      <td>{index + 1}</td>

                      <td>
                        {appointment.doctorName}
                      </td>

                      <td>
                        {appointment.doctorSpeciality}
                      </td>

                      <td>
                        <GiveReviews
                          appointment={appointment}
                          onReviewSubmitted={refreshReviews}
                        />
                      </td>

                      <td>
                        {reviewGiven ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="no-reviews"
                  >
                    No consultations available for review.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default ReviewForm;