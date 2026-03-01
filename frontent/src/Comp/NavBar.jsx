import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './style.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

useEffect(() => {
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (loginStatus && user) {
      setIsLoggedIn(true);
      setUsername(user.name);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  checkLoginStatus();

  // Listen for storage changes
  window.addEventListener("storage", checkLoginStatus);

  return () => {
    window.removeEventListener("storage", checkLoginStatus);
  };
}, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };
  return (
    <div className='navbar'>
      <div className='citisolve'>
        <span className='spanLogo'>🏛️  </span>
        <Link to='/'><button className='citisolveBtn'>Citisolve</button></Link>
      </div>
      {isLoggedIn && (
        <div className='ComplaintBtns'>
          <Link to="/complaint"><button className='complaint'>Submit Complaint</button></Link>
          <Link to="/mycomplaint"><button className='mycom'> My Complaints </button></Link>
        </div>
      )}
      <div className='button'>
        {isLoggedIn ? (
          <>
            <span className='spanWelCome'>Welcome, {username}</span>
            <button className='logout' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'><button className='login'>Login</button></Link>
            <Link to='/register'><button className='register'>Register</button></Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
