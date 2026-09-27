// Importa i moduli necessari dalla libreria React
import React from 'react';

// Importa i componenti per il routing dalla libreria react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa il componente Navbar personalizzato
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/LandingPage'
// Componente funzione per l'app principale
function App() {

  // Renderizza il componente principale App
  return (
    <div className="App">
        {/* Imposta BrowserRouter per il routing */}
        <BrowserRouter>
          {/* Visualizza il componente Navbar */}
          <Navbar/>

          {/* Imposta le Routes per le diverse pagine */}
          <Routes>
          <Route path="/" element={<Landing_Page/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Esporta il componente App come esportazione predefinita
export default App;
