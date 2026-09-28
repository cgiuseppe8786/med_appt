import React, { useState } from "react";
import GiveReviews from "./GiveReviews";
import "./ReviewForm.css";

const ReviewForm = () => {
  const doctorData = JSON.parse(
    localStorage.getItem("doctorData")
  );

  const reviewStorageKey = doctorData?.name
    ? `review-${doctorData.name}`
    : null;

  const [reviewGiven, setReviewGiven] = useState(
    reviewStorageKey
      ? localStorage.getItem(reviewStorageKey) !== null
      : false
  );

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

              {doctorData ? (
                <tr>

                  <td>1</td>

                  <td>
                    {doctorData.name}
                  </td>

                  <td>
                    {doctorData.speciality}
                  </td>

                  <td>
                    <GiveReviews
                      doctorName={doctorData.name}
                      doctorSpeciality={
                        doctorData.speciality
                      }
                      onReviewSubmitted={() =>
                        setReviewGiven(true)
                      }
                    />
                  </td>

                  <td>
                    {reviewGiven ? "Yes" : "No"}
                  </td>

                </tr>
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="no-reviews"
                  >
                    No consultation available for review.
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