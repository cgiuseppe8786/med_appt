import React, { useState } from "react";
import "./ReviewForm.css";

const GiveReviews = ({
  appointment,
  onReviewSubmitted,
}) => {
  const storageKey = `review-${appointment.id}`;

  const [showForm, setShowForm] = useState(false);

  const [reviewGiven, setReviewGiven] = useState(
    () => localStorage.getItem(storageKey) !== null
  );

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const [error, setError] = useState("");

  const handleOpenForm = () => {
    if (!reviewGiven) {
      setShowForm(true);
      setError("");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((previousData) => ({
      ...previousData,
      rating,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.review.trim() ||
      formData.rating === 0
    ) {
      setError(
        "Please fill out all fields and select a rating."
      );
      return;
    }

    const reviewData = {
      appointmentId: appointment.id,
      doctorName: appointment.doctorName,
      doctorSpeciality: appointment.doctorSpeciality,
      name: formData.name.trim(),
      review: formData.review.trim(),
      rating: formData.rating,
    };

    localStorage.setItem(
      storageKey,
      JSON.stringify(reviewData)
    );

    setReviewGiven(true);
    setShowForm(false);

    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  return (
    <>
      <button
        type="button"
        className="feedback-button"
        onClick={handleOpenForm}
        disabled={reviewGiven}
      >
        {reviewGiven ? "Submitted" : "Click Here"}
      </button>

      {showForm && (
        <div className="review-modal-overlay">
          <div className="review-form-container">

            <button
              type="button"
              className="review-close-button"
              onClick={handleCloseForm}
            >
              ×
            </button>

            <h2>Give Your Review</h2>

            <form onSubmit={handleSubmit}>

              <div className="review-form-group">
                <label>Name:</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="review-form-group">
                <label>Review:</label>

                <textarea
                  name="review"
                  rows="5"
                  value={formData.review}
                  onChange={handleChange}
                />
              </div>

              <div className="review-form-group">
                <label>Rating:</label>

                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <= formData.rating
                          ? "rating-star selected"
                          : "rating-star"
                      }
                      onClick={() => handleRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="review-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="review-submit-button"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GiveReviews;