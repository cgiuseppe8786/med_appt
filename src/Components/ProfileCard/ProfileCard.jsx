import React, { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: sessionStorage.getItem("name") || "",
    email: sessionStorage.getItem("email") || "",
    phone: sessionStorage.getItem("phone") || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    sessionStorage.setItem("name", profile.name);
    sessionStorage.setItem("email", profile.email);
    sessionStorage.setItem("phone", profile.phone);

    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          <i
            className="fa fa-user"
            aria-hidden="true"
          />
        </div>

        <h2>Your Profile</h2>

        {!isEditing ? (
          <>
            <div className="profile-info">
              <div className="profile-info-row">
                <span>Name</span>
                <strong>
                  {profile.name || "Not available"}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>
                  {profile.email || "Not available"}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Phone Number</span>
                <strong>
                  {profile.phone || "Not available"}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="profile-update-button"
              onClick={() => setIsEditing(true)}
            >
              Update Profile
            </button>
          </>
        ) : (
          <div className="profile-edit-form">

            <div className="profile-form-group">
              <label htmlFor="profile-name">
                Name
              </label>

              <input
                id="profile-name"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="profile-email">
                Email
              </label>

              <input
                id="profile-email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="profile-phone">
                Phone Number
              </label>

              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-save-button"
                onClick={handleUpdate}
              >
                Save
              </button>

              <button
                type="button"
                className="profile-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileCard;