import React, { useState } from "react";
import "./login.css";

// Backend API URL
const API_URL = "http://localhost:5000/admin";

function Log() {
  // State for form visibility (login or register)
  const [isLogin, setIsLogin] = useState(true);
  
  // State for login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // State for register form
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // State for messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle login input change
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Handle register input change
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  // Login submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        alert("Login Successful!");
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

  // Register submit handler
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        alert("Registration Successful! Please login.");
        setIsLogin(true);
        setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
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
      
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">
            {isLogin ? "Login" : "Register"}
          </h1>

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
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
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Login
              </button>
              
              {message && (
                <div className={`login-message ${messageType}`}>
                  {message}
                </div>
              )}
              
              <p className="toggle-text">
                Don't have an account?{" "}
                <span className="toggle-link" onClick={() => { setIsLogin(false); setMessage(""); }}>
                  Register here
                </span>
              </p>
            </form>
          )}

          {/* Register Form */}
          {!isLogin && (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
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
                  value={registerData.email}
                  onChange={handleRegisterChange}
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
                  value={registerData.password}
                  onChange={handleRegisterChange}
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
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm password"
                  className="form-input"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Register
              </button>
              
              {message && (
                <div className={`login-message ${messageType}`}>
                  {message}
                </div>
              )}
              
              <p className="toggle-text">
                Already have an account?{" "}
                <span className="toggle-link" onClick={() => { setIsLogin(true); setMessage(""); }}>
                  Login here
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Log;