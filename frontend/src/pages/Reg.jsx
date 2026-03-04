import React, { useState } from "react";

import "./Register.css";

// Backend API URL
const API_URL = "http://localhost:5000/admin";

function Reg() {
  // State for register form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // State for messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Register submit handler
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        alert("Registration Successful! Please login.");
        // Clear form
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error connecting to server!");
      setMessageType("error");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      
      
      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Register</h1>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="form-input"
                required
              />
            </div>
            
            <button type="submit" className="register-button">
              Register
            </button>
            
            {message && (
              <div className={`register-message ${messageType}`}>
                {message}
              </div>
            )}
          </form>
          
          <p className="toggle-text">
            Already have an account?{" "}
            <a href="/login" className="toggle-link">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reg;
