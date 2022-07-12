import { useEffect, useState } from 'react';
import '../Styles/LoginScreen.css';
import logo from '../../../assets/icons/128x128.png';
import { Link } from 'react-router-dom';

const LoginScreen = (props) => {

  return (
    <div className="screen">
      <img className="logo" src={logo} alt="1nil" />
      <div className="textbox-wrapper">
        <input
          className="textbox"
          placeholder="Username"
          type="text"
          // value={search}
          // onChange={searchChange}
        />
        <input
          className="textbox"
          placeholder="Password"
          type="password"
          // value={search}
          // onChange={searchChange}
        />
        <div className="btn-wrapper">
          <Link to="/dashboard">
            <button className="btn login-btn">LOGIN</button>
          </Link>
          <button className="btn signup-btn">SIGNUP</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
