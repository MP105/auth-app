import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';


function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  // User Name Get
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);

    // Live Time
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    handleSuccess('User Logged Out');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="home-container">

      {/* Navbar */}
      <div className="navbar">
        <h2>MERN Dashboard</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="home-card">

        <h1>
          Welcome, <span>{loggedInUser}</span>
        </h1>

        <p className="subtitle">
          Your Login Authentication System is Working Successfully 🚀
        </p>

        {/* Time */}
        <div className="time-box">
          <h3>Current Time</h3>
          <p>{time}</p>
        </div>

        {/* Features */}
        <div className="features">

          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>JWT Authentication Connected</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Performance</h3>
            <p>React + Node.js Working Smoothly</p>
          </div>

          <div className="feature-card">
            <h3>📦 MongoDB</h3>
            <p>Database Connected Successfully</p>
          </div>

        </div>

      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;