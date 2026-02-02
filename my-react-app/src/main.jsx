import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./Main/index.css";
import App from "./Main/HomePage.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
