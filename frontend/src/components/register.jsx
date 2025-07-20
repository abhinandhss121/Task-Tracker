
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError("");
    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Register</h1>
        {error && <div style={{ color: "red" }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <span 
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
