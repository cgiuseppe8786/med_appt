import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./Login.css";

function Login() {
  // Dati del form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Errori di validazione frontend
  const [errors, setErrors] = useState({});

  // Errori restituiti dal backend
  const [showerr, setShowerr] = useState("");

  // Messaggio generale del form
  const [formStatus, setFormStatus] = useState("");

  // Hook per la navigazione
  const navigate = useNavigate();

  // Se l'utente è già autenticato,
  // viene reindirizzato automaticamente alla Home
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Gestione modifica campi
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Rimuove l'errore relativo al campo modificato
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

    // Validazione email
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

    // Validazione password
    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Gestione Login
  const login = async (event) => {
    event.preventDefault();

    setShowerr("");
    setFormStatus("");

    // Controlla prima i dati inseriti
    if (!validateForm()) {
      setFormStatus(
        "Please correct the errors in the form."
      );
      return;
    }

    try {
      // Chiamata API al backend
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      // Legge la risposta JSON del backend
      const json = await response.json();

      // LOGIN CORRETTO
      if (response.ok && json.authtoken) {
        // Salva il token JWT nella sessione
        sessionStorage.setItem(
          "auth-token",
          json.authtoken
        );

        // Salva l'email nella sessione
        sessionStorage.setItem(
          "email",
          formData.email.trim()
        );

        // Naviga alla Home
        navigate("/");

        // Ricarica l'app per aggiornare la Navbar
        window.location.reload();
      } else {
        // Gestione errori restituiti dal backend
        if (json.errors && json.errors.length > 0) {
          setShowerr(
            json.errors
              .map((error) => error.msg)
              .join(" ")
          );
        } else {
          setShowerr(
            json.error ||
              "Invalid email or password."
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      setShowerr(
        "Unable to connect to the server."
      );
    }
  };

  // Reset del form
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });

    setErrors({});
    setShowerr("");
    setFormStatus("");
  };

  return (
    <main className="container">
      <h1 className="login-title">
        Login
      </h1>

      <p className="login-description">
        Are you a new member?{" "}
        <Link to="/signup">
          Sign Up Here
        </Link>
      </p>

      <form
        method="POST"
        onSubmit={login}
        onReset={handleReset}
        noValidate
      >
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
          <label htmlFor="password">
            Password
          </label>

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

        {/* ERRORI RESTITUITI DAL BACKEND */}
        {showerr && (
          <div
            className="err"
            style={{ color: "red" }}
          >
            {showerr}
          </div>
        )}

        {/* PULSANTI */}
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