import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Verifica se l'utente è autenticato
  const isLoggedIn = !!sessionStorage.getItem("auth-token");

  // Apertura/chiusura menu mobile
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // Chiude il menu dopo aver selezionato una voce
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Logout dell'utente
  const handleLogout = () => {
    // Rimuove i dati dell'utente dalla sessione
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");

    // Chiude il menu mobile
    setIsOpen(false);

    // Torna alla pagina di login
    navigate("/login");

    // Aggiorna la pagina per aggiornare la Navbar
    window.location.reload();
  };

  return (
    <nav aria-label="Main navigation">

      {/* LOGO */}
      <div className="nav__logo">
        <Link to="/" onClick={closeMenu}>
          StayHealthy

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 1000 1000"
            aria-hidden="true"
          >
            {/* Testa */}
            <path
              d="
                M499.8,10
                c91.7,0,166,74.3,166,166
                s-74.3,166-166,166
                s-166-74.3-166-166
                S408.1,10,499.8,10Z
              "
            />

            {/* Colletto */}
            <path
              d="
                M499.8,522.8
                c71.2,0,129.1-58.7,129.1-129.1
                H370.6
                C370.6,464.1,428.6,522.8,499.8,522.8Z
              "
            />

            {/* Busto con stetoscopio */}
            <path
              d="
                M693.2,395
                c-0.7,94.9-70.3,173.7-160.8,188.9
                v155.9
                c0,80.3-60.7,150.8-140.8,155.3
                c-83,4.7-152.7-58.9-157.6-139.7
                c-22-12.8-35.6-38.5-30.3-66.7
                c4.7-25.1,25.5-45.6,50.8-49.9
                c39.7-6.7,74.1,23.7,74.1,62.1
                c0,23-12.3,43-30.7,54.1
                c4.7,45.4,45.1,80.4,92.6,76
                c44.6-4,77.2-44,77.2-90.8
                V583.9
                C377.2,568.7,307.6,489.9,306.9,395
                C184,425,100,535,100,670
                V990
                H900
                V670
                C900,535,816.1,425,693.2,395Z
              "
            />
          </svg>
        </Link>

        <span>.</span>
      </div>

      {/* MENU MOBILE */}
      <button
        className="nav__icon"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-controls="navigation-links"
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        <i
          className={`fa ${
            isOpen ? "fa-times" : "fa-bars"
          }`}
          aria-hidden="true"
        ></i>
      </button>

      {/* LINK NAVIGAZIONE */}
      <ul
        className={`nav__links ${isOpen ? "active" : ""}`}
        id="navigation-links"
      >
        <li className="link">
          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>

        <li className="link">
          <Link
            to="/appointments"
            onClick={closeMenu}
          >
            Appointments
          </Link>
        </li>

        {/* UTENTE NON AUTENTICATO */}
        {!isLoggedIn && (
          <>
            <li className="link">
              <Link
                className="btn1"
                to="/signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </li>

            <li className="link">
              <Link
                className="btn1"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
          </>
        )}

        {/* UTENTE AUTENTICATO */}
        {isLoggedIn && (
          <li className="link">
            <button
              type="button"
              className="btn1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;