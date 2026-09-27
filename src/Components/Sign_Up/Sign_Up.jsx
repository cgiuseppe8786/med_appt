import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  // Gestisce la modifica dei campi
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Per il telefono accettiamo solamente numeri
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Rimuove l'errore del campo quando l'utente lo modifica
    setErrors({
      ...errors,
      [name]: "",
    });

    setFormStatus("");
  };

  // Valida tutti i campi
  const validateForm = () => {
    const newErrors = {};

    // Validazione nome
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters.";
    }

    // Validazione telefono
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    // Validazione email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validazione password
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

  // Gestisce l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setFormStatus("Registration details are valid.");

      // Qui verrà successivamente chiamato
      // il servizio di registrazione.
      console.log("Registration data:", formData);
    } else {
      setFormStatus("Please correct the errors in the form.");
    }
  };

  // Reset del form
  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
    });

    setErrors({});
    setFormStatus("");
  };

  return (
    <main className="container">
    <h1 className="signup-title">Sign Up</h1>

      <p className="signup-description">
        Already a member?{" "}
        <Link to="/login">Login</Link>
      </p>

      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>

        {/* NAME */}
        <div className="form-group">
          <label htmlFor="name">Name</label>

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
          <label htmlFor="phone">Phone</label>

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
          <label htmlFor="email">Email</label>

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
          <label htmlFor="password">Password</label>

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
          id="form-status"
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