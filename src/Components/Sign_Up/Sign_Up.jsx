import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./Sign_Up.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();

  // Gestione modifica campi
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Il telefono può contenere solamente numeri
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setShowerr("");
    setFormStatus("");
  };

  // Validazione frontend
  const validateForm = () => {
    const newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    } else if (
      !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(formData.name.trim())
    ) {
      newErrors.name =
        "Name can only contain letters.";
    }

    // PHONE
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // PASSWORD
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Registrazione utente
  const register = async (event) => {
    event.preventDefault();

    setShowerr("");
    setFormStatus("");

    // Prima controlliamo il form
    if (!validateForm()) {
      setFormStatus(
        "Please correct the errors in the form."
      );
      return;
    }

    try {
      // Chiamata API al backend
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone,
          }),
        }
      );

      const json = await response.json();

      // Registrazione avvenuta con successo
      if (json.authtoken) {
        sessionStorage.setItem(
          "auth-token",
          json.authtoken
        );

        sessionStorage.setItem(
          "name",
          formData.name
        );

        sessionStorage.setItem(
          "phone",
          formData.phone
        );

        sessionStorage.setItem(
          "email",
          formData.email
        );

        // Navigazione alla Home
        navigate("/");

        // Aggiorna la Navbar
        window.location.reload();
      } else {
        // Errori restituiti dal backend
        if (json.errors && json.errors.length > 0) {
          setShowerr(
            json.errors.map((error) => error.msg).join(" ")
          );
        } else {
          setShowerr(
            json.error || "Registration failed."
          );
        }
      }
    } catch (error) {
      console.error("Registration error:", error);

      setShowerr(
        "Unable to connect to the server."
      );
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
    });

    setErrors({});
    setShowerr("");
    setFormStatus("");
  };

  return (
    <main className="container">
      <h1 className="signup-title">
        Sign Up
      </h1>

      <p className="signup-description">
        Already a member?{" "}
        <Link to="/login">Login</Link>
      </p>

      <form
        method="POST"
        onSubmit={register}
        onReset={handleReset}
        noValidate
      >
        {/* NAME */}
        <div className="form-group">
          <label htmlFor="name">
            Name
          </label>

          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="error-message">
              {errors.name}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div className="form-group">
          <label htmlFor="phone">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            placeholder="Enter your 10-digit phone number"
            autoComplete="tel"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <p className="error-message">
              {errors.phone}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error-message">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="error-message">
              {errors.password}
            </p>
          )}
        </div>

        {/* ERRORI BACKEND */}
        {showerr && (
          <div className="err">
            {showerr}
          </div>
        )}

        <div className="btn-group">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>

          <button
            type="reset"
            className="btn btn-danger"
          >
            Reset
          </button>
        </div>

        <p
          className="form-status"
          role="status"
        >
          {formStatus}
        </p>
      </form>
    </main>
  );
}

export default SignUp;