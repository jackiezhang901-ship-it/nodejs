import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./MainPage/HomePage.jsx";
import LoginPage from "./LoginPage/Login.jsx"; 
import RegisterPage from "./RegisterPage/Register.jsx"
import UsersPage from "./UsersPage/UserPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;