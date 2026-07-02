import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/taskapi";
import "./Auth.css"
import { NavigationOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const res = await registerUser(formData);

      setMessage(res.data.message || "Registration Successful!");


     
   
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
     navigate('/register')
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        {message && <p>{message}</p>}
        <button type="button" onClick={() => navigate('/login')}>
        Login
      </button>
      </form>
      
    </div>
  );
};

export default Register;