import Login from "./pages/Login";
import Home from "./pages/home";
import Register from "./pages/register";
import { useState,useEffect } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext.jsx';



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  // Check on initial load
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Listen for storage changes (in case token is removed from another tab)
  useEffect(() => {
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };



  
  return (
    <div className="app-shell">
      <Router>
           <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={isLoggedIn?<Home/>:<Login/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        </AuthProvider>
      </Router>
      
    </div>
  );
}
