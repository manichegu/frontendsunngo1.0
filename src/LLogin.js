import React, { useState, useContext,useEffect } from 'react';
// import { Redirect } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from './App';
import './LLogin.css'
import { colors } from '@material-ui/core';
import MobileWarning from './MobileWarning';
const Login = () => {
  
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
      if(res.data=="User does not exist!!")
      {
        // console.log("User does not exist!!");
        alert("User does not exist!!");
        // setData({ ...data,email:""});
        // setData({ ...data,password:""});
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        navigate("/admin")
      }
      else if(res.data=="incorrect password!!"){
        // console.log("incorrect password!!");
        alert("Incorrect password!! Please Try Again");
        // setData({ ...data,email:""});
        // setData({ ...data,password:""});
        // document.getElementById("email").value="";
        document.getElementById("password").value="";
        navigate("/admin")
      }
      else{
        alert("Successfull Login");
        // console.log(res.data.token);
        setToken(res.data.token);
      }
      
    });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add an event listener to check screen size when the component mounts
    window.addEventListener('resize', checkScreenSize);

    // Call checkScreenSize when the component initially mounts
    checkScreenSize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (token) {
    // console.log(token);
    navigate('/admin/dashboard');
  }

  return (
    <div>
      {isMobile ? (
        <MobileWarning />
      ) : (
      <center>
        {/* <form onSubmit={submitHandler}>
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
        </form> */}


        <div class="adminlogin" style={{color:"#fff"}}>
        <h3 class="w-100 text-center  mb-2">Admin Login</h3>
       
        <form method="post" className="fs-4 p-2" onSubmit={submitHandler}>
 
  <div className="user-box">
    <input id="email" name="email" type="text"  onChange={changeHandler} required />
    <label>Email</label>
  </div>
  <div className="user-box fs-5">
    <input id="password" name="password" type="password"  onChange={changeHandler} required />
    <label>Password</label>
  </div>
  <div className="w-100 text-center">
    <button type="submit" href="#" className="border-0 fs-5 px-4 py-2 zoom rounded" style={{backgroundColor:"#fff", color:"#003A69"}} >
      Submit
    </button>
  </div>
 
</form>

      </div>


 </center>
 )}
    </div>
  );
};

export default Login;
