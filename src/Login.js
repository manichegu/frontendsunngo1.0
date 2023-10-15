import React, { useState, useContext, useEffect } from 'react';
// import { Redirect } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from './App';
import './Login.css'

const Login = () => {
  useEffect(() => {
    // console.log("mobile____________");
    // const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        // Display a message when on a mobile screen
        alert("This page is not available on mobile screens. Please use a laptop or desktop computer to access it.");
        navigate('/'); // You may choose to navigate to a different route or perform another action here.
      // }
      // console.log("mobile____________");
    }})
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const [data, setData] = useState({
    // username:'',
    email: '',
    password: '',
    // confirmpassword:''
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKENDAPI}/login`, data).then((res) => {
      // console.log(res.data.token);
      setToken(res.data.token);
    });
  };

  if (token) {
    // console.log(token);
    navigate('/admin/');
  }
  else{
    navigate('/');
  }

  return (
    <section style={{   WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    overflowY: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#dde5f4',
    height: '100vh',}}>
    <div>
      {/* <center>
        <form onSubmit={submitHandler}>
          <h3>Log In</h3>
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Password"
          />
          <br />
          <button type="submit" value="Register">
            Log In
          </button>
        </form>
 </center> */}



        <div className="screen-1">
      <svg
        className="logo"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="300"
        height="300"
        viewBox="0 0 640 480"
        xmlSpace="preserve"
      >
        <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
          <circle
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(61,71,133)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
          <circle
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
          <circle
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
          <circle
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            cx="0"
            cy="0"
            r="40"
          ></circle>
        </g>
        <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
          <polygon
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            points="-50,-50 -50,50 50,50 50,-50"
          ></polygon>
        </g>
        <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
          <polygon
            style={{
              stroke: 'rgb(0,0,0)',
              strokeWidth: 0,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            points="-50,-50 -50,50 50,50 50,-50"
          ></polygon>
        </g>
      </svg>
      <div className="email">
        <label htmlFor="email">Email Address</label>
        <div className="sec-2">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            type="email"
            name="email"
            placeholder="Username@gmail.com"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <div className="sec-2">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            className="pas"
            type="password"
            name="password"
            placeholder="············"
            onChange={changeHandler}
          />
          <ion-icon className="show-hide" name="eye-outline"></ion-icon>
        </div>
      </div>
      <button className="login" type="submit" onClick={submitHandler}>
        Login
      </button>
      <div className="footer">
        {/* <span>Sign up</span> */}
        <span>Forgot Password?</span>
      </div>
    </div>
     
    </div>
    </section>
  );
};

export default Login;
