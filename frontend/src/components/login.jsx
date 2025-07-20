
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './style.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Login Failed:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login Page</h1>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          
          <button type="submit">Login</button>
        </form>
        <p>No account? <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>SignUp here</Link></p>
      </div>
    </div>
  );
};

export default Login;
