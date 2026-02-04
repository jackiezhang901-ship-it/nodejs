import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Main Page/HomePage.jsx";
import LoginPage from "./LoginPage/Login.jsx"; 
import RegisterPage from "./RegisterPage/Register.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;