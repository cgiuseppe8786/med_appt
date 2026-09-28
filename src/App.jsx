// Importa i moduli necessari dalla libreria React
import React from 'react';

// Importa i componenti per il routing dalla libreria react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa il componente Navbar personalizzato
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page'
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";
// Componente funzione per l'app principale
function App() {

    // Renderizza il componente principale App
    return (
        <div className="App">
            {/* Imposta BrowserRouter per il routing */}
            <BrowserRouter>
                {/* Visualizza il componente Navbar */}
                <Navbar />

                {/* Imposta le Routes per le diverse pagine */}
                <Notification>
                    <Routes>
                        <Route path="/" element={<Landing_Page />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/instant-consultation" element={<InstantConsultation />} />
                        <Route path="/search/doctors" element={<BookingConsultation />} />
                        <Route path="/reviews" element={<ReviewForm />} />
                        <Route path="/profile" element={<ProfileCard />} />
                        <Route path="/reports" element={<ReportsLayout />} />
                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}

// Esporta il componente App come esportazione predefinita
export default App;
