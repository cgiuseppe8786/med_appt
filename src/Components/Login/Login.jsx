import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Da collegare al servizio di autenticazione.
    setFormStatus("Demo only: login is not connected yet.");
  };

  const handleReset = () => {
    setFormStatus("");
  };

  return (
    <main className="container">
      <h1>Login</h1>

      <p className="login-description">
        Are you a new member?{" "}
        <a href="../Sign_Up/Sign_Up.html">Sign Up Here</a>
      </p>

      <form
        id="login-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            autoComplete="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <button type="reset" className="btn btn-danger">
            Reset
          </button>
        </div>

        <p className="forgot-password">Forgot Password?</p>

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