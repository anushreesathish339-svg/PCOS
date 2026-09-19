import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendar,
  FaVenus,
  FaRulerVertical,
  FaWeight,
  FaTint,
  FaPhone,
  FaBrain,
  FaFileMedicalAlt,
  FaRunning
} from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-promo">
          <div className="brand-logo">
            <span className="brand-icon">✦</span>
            <span>PCOS Care</span>
          </div>
          <h1>Your Journey to Better Health Starts Here</h1>
          <p className="promo-tagline">
            Join our platform to access advanced AI screening, personalized tracking, and clinical wellness recommendations.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <FaBrain />
              </div>
              <div className="feature-text">
                <h3>AI PCOS Screening</h3>
                <p>Get instant risk evaluation backed by predictive machine learning models.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaFileMedicalAlt />
              </div>
              <div className="feature-text">
                <h3>Symptom & Cycle Log</h3>
                <p>Analyze ovulation patterns, irregular periods, and physical symptoms over time.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaRunning />
              </div>
              <div className="feature-text">
                <h3>Personalized Support</h3>
                <p>Access customized diet recommendations, lifestyle guidance, and yoga plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} className="register-form-grid">
            <div className="form-group full-width">
              <label>
                <FaUser className="input-icon" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>
                <FaEnvelope className="input-icon" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock className="input-icon" /> Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock className="input-icon" /> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaCalendar className="input-icon" /> Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 24"
                value={formData.age}
                onChange={handleChange}
                min="12"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>
                <FaVenus className="input-icon" /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <FaRulerVertical className="input-icon" /> Height (cm)
              </label>
              <input
                type="number"
                name="height"
                placeholder="e.g. 165"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FaWeight className="input-icon" /> Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="e.g. 60"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FaTint className="input-icon" /> Blood Group
              </label>
              <input
                type="text"
                name="bloodGroup"
                placeholder="e.g. O+"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FaPhone className="input-icon" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="full-width mt-2">
              <button type="submit" className="register-submit-btn">
                Create Account
              </button>
            </div>
          </form>

          <p className="login-redirect-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;