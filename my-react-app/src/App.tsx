import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/MainPage/HomePage.tsx";
import LoginPage from "./component/LoginPage/Login.tsx"; 
import RegisterPage from "./component/RegisterPage/Register.tsx"
import UsersPage from "./component/UsersPage/User.tsx"; 

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