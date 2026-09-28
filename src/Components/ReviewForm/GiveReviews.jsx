import React, { useState } from "react";
import "./ReviewForm.css";

const GiveReviews = ({
  doctorName,
  doctorSpeciality,
  onReviewSubmitted,
}) => {
  const storageKey = `review-${doctorName}`;

  const [showForm, setShowForm] = useState(false);

  // Se esiste già una recensione, il pulsante parte disabilitato
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
    if (reviewGiven) {
      return;
    }

    setShowForm(true);
    setError("");
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
      doctorName,
      doctorSpeciality,
      name: formData.name.trim(),
      review: formData.review.trim(),
      rating: formData.rating,
    };

    // Salva la recensione
    localStorage.setItem(
      storageKey,
      JSON.stringify(reviewData)
    );

    // Disabilita ulteriori recensioni
    setReviewGiven(true);

    setShowForm(false);
    setError("");

    setFormData({
      name: "",
      review: "",
      rating: 0,
    });

    // Aggiorna ReviewForm
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  return (
    <>
      {/* PULSANTE CLICK HERE */}
      <button
        type="button"
        className="feedback-button"
        onClick={handleOpenForm}
        disabled={reviewGiven}
      >
        {reviewGiven ? "Submitted" : "Click Here"}
      </button>

      {/* FORM RECENSIONE */}
      {showForm && (
        <div className="review-modal-overlay">

          <div className="review-form-container">

            <button
              type="button"
              className="review-close-button"
              onClick={handleCloseForm}
              aria-label="Close"
            >
              ×
            </button>

            <h2>Give Your Review</h2>

            <div className="review-doctor-info">
              <strong>{doctorName}</strong>
              <span>{doctorSpeciality}</span>
            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="review-form-group">
                <label htmlFor="review-name">
                  Name:
                </label>

                <input
                  type="text"
                  id="review-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* REVIEW */}
              <div className="review-form-group">
                <label htmlFor="review-text">
                  Review:
                </label>

                <textarea
                  id="review-text"
                  name="review"
                  rows="5"
                  value={formData.review}
                  onChange={handleChange}
                />
              </div>

              {/* RATING 1-5 */}
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
                      onClick={() =>
                        handleRating(star)
                      }
                      aria-label={`${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* ERRORE */}
              {error && (
                <p className="review-error">
                  {error}
                </p>
              )}

              {/* SUBMIT */}
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