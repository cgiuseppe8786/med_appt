import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");

    if (!authtoken) {
      navigate("/login");
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  // Recupera i dati dell'utente dal database
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const authtoken =
        sessionStorage.getItem("auth-token");

      const email =
        sessionStorage.getItem("email");

      const response = await fetch(
        `${API_URL}/api/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            Email: email,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch user profile"
        );
      }

      const user = await response.json();

      setUserDetails(user);

      setUpdatedDetails({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load profile information."
      );
    } finally {
      setLoading(false);
    }
  };

  // Attiva modalità modifica
  const handleEdit = () => {
    setUpdatedDetails({
      name: userDetails.name || "",
      email: userDetails.email || "",
      phone: userDetails.phone || "",
    });

    setEditMode(true);
  };

  // Modifica campi
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUpdatedDetails((previousDetails) => ({
      ...previousDetails,
      [name]: value,
    }));
  };

  // Annulla modifica
  const handleCancel = () => {
    setUpdatedDetails({
      name: userDetails.name || "",
      email: userDetails.email || "",
      phone: userDetails.phone || "",
    });

    setEditMode(false);
  };

  // Salva modifiche nel database
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const authtoken =
        sessionStorage.getItem("auth-token");

      const email =
        sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = {
        name: updatedDetails.name.trim(),
        email: updatedDetails.email,
        phone: updatedDetails.phone.trim(),
      };

      const response = await fetch(
        `${API_URL}/api/auth/user`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
            Email: email,
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update profile"
        );
      }

      const updatedUser = await response.json();

      const finalUser = {
        ...updatedDetails,
        ...updatedUser,
      };

      setUserDetails(finalUser);
      setUpdatedDetails(finalUser);

      // Aggiorna anche i dati usati dalla Navbar
      sessionStorage.setItem(
        "name",
        finalUser.name
      );

      sessionStorage.setItem(
        "phone",
        finalUser.phone
      );

      setEditMode(false);

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to update profile."
      );
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          <i
            className="fa fa-user"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}

        {editMode ? (
          <>
            <h2>Edit Profile</h2>

            <form
              className="profile-edit-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div className="profile-form-group">
                <label htmlFor="profile-email">
                  Email
                </label>

                <input
                  id="profile-email"
                  type="email"
                  name="email"
                  value={updatedDetails.email}
                  disabled
                />
              </div>

              {/* NAME */}
              <div className="profile-form-group">
                <label htmlFor="profile-name">
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="profile-form-group">
                <label htmlFor="profile-phone">
                  Phone
                </label>

                <input
                  id="profile-phone"
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="profile-actions">

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  Save
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            </form>
          </>
        ) : (
          <>
            <h2>
              Welcome, {userDetails.name}
            </h2>

            <div className="profile-info">

              <div className="profile-info-row">
                <span>Name</span>
                <strong>
                  {userDetails.name}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>
                  {userDetails.email}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>Phone</span>
                <strong>
                  {userDetails.phone}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="profile-update-button"
              onClick={handleEdit}
            >
              Edit
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default ProfileCard;