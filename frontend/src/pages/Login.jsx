import { useState } from "react";
import { Route,Routes, useNavigate } from "react-router-dom";
import { loginUser } from "../services/taskapi";
import './Auth.css'
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Home from "../pages/Home"
import { User } from "lucide-react";


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(formData);
      const isUserExist = await res.findOne({ email });
          if (!isUserExist) {
              return res.status(400).json({ message: 'User doesnt exist' });
              navigate('/register')
          }

      localStorage.setItem("token", res.data.token);
  

      setMessage("Login Successful!");


      navigate('/home')
    } catch (err) {
      setMessage(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
         
        {message && <p>{message}</p>}
      </form>
      <button type="button" onClick={() => navigate('/register')}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;