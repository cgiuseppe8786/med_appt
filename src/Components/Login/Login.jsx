import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");

  // Gestisce la modifica dei campi
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Rimuove l'errore quando l'utente modifica il campo
    setErrors({
      ...errors,
      [name]: "",
    });

    setFormStatus("");
  };

  // Valida i campi del form
  const validateForm = () => {
    const newErrors = {};

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
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Gestisce il login
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setFormStatus("Login details are valid.");

      // Qui verrà successivamente chiamato
      // il servizio di autenticazione.
      console.log("Login data:", formData);
    } else {
      setFormStatus("Please correct the errors in the form.");
    }
  };

  // Reset del form
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });

    setErrors({});
    setFormStatus("");
  };

  return (
    <main className="container">
      <h1 className="login-title">Login</h1>

      <p className="login-description">
        Are you a new member?{" "}
        <Link to="/signup">Sign Up Here</Link>
      </p>

      <form
        id="login-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        noValidate
      >
        {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            autoComplete="username"
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
            autoComplete="current-password"
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
            Login
          </button>

          <button
            type="reset"
            className="btn btn-danger"
          >
            Reset
          </button>
        </div>

        <p className="forgot-password">
          Forgot Password?
        </p>

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

export default Login;