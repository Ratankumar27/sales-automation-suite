import React, { useState } from "react";
import "../CSS/Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8181/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if(response.ok){
      alert("User registered successfully");
      navigate("/Login");

    } else {
      alert("Registration failed");
    }
    console.log(data);
  };

  return (
    <div className="register-page vh-100 d-flex justify-content-center align-items-center">

  <div className="card p-4" style={{width:"420px"}}>

    <h2 className="text-center text-primary mb-4">Register</h2>

    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label text-black">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-black">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-black">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your password"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-black">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>
      </div>

      <button className="btn btn-primary w-100">Sign Up</button>

      <div className="text-center mt-3 text-black">
        Already have account? <Link className="text-primary" to="/login">Login</Link>
      </div>

    </form>

  </div>

</div>
  );
}

export default Register;