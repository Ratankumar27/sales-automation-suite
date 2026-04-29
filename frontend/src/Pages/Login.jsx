import React, { useState } from "react";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8181/api/auth/login",
        {
          username: userName,
          password: password
        },
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      // SAVE LOGIN DATA
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful");

      // ROLE BASED PAGE OPEN
      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">

          <h3 className="text-center mb-4 text-primary">Login</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label text-black">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-black">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center mb-3">
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <div className="text-center mt-3 text-black">
              New user?{" "}
              <Link className="text-primary" to="/register">
                Sign up here
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;