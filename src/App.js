import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage'; 
import MainPage from './pages/MainPage';
import GeneratorPage from './pages/GeneratorPage';
import SpecialColorPage from './pages/SpecialColorPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dailyColor, setDailyColor] = useState("0066FF");

  
  useEffect(() => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setDailyColor(randomColor.toUpperCase());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/" element={<MainPage dailyColor={dailyColor} />} />
        <Route path="/colors/:hex" element={<SpecialColorPage />} />
        <Route path="/welcome" element={isAuthenticated ? <WelcomePage /> : <Navigate to="/login" />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/colors/:colorHex" element={<SpecialColorPage />} />
      </Routes>
    </Router>
  );
}

export default App;