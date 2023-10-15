import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import { store } from './App';
import './Nav.css'
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const [token,setToken]=useContext(store);
  const navigate=useNavigate();
  const handleClick = () => {
    // console.log('Button clicked');
    // // Perform desired functionality
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    sidebar.classList.toggle("open");
    menuBtnChange();
  };
  function menuBtnChange() {
    let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
    if(sidebar.classList.contains("open")){
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    }else {
      closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
    }
   }
  // const [token,setToken]=useContext(store);
  function signoutHandler(){
    const confirmLogout = window.confirm("Are you sure you want to sign out?");

    if (confirmLogout) {
      setToken(null);
      navigate('/admin');
    }
    
  }
  return (
    // <div className="whole_nav">
    <div>
    {token &&

      <div class="sidebar">
           
    <div class="logo-details">
      {/* <!-- <i class='bx bxl-c-plus-plus icon'></i> --> */}
      
        <div class="logo_name mt-4">SUN<p>The NGO</p></div>
        <i class='bx bx-menu' id="btn" onClick={handleClick} ></i>
    </div>
    <ul class="nav-list">
      {/* <!-- <li>
          <i class='bx bx-search' ></i>
         <input type="text" placeholder="Search...">
         <span class="tooltip">Search</span>
      </li> --> */}
        <li>
        <Link to='/admin/totalvolunteers'>
        <a >
        <i class="fa fa-users" aria-hidden="true"></i>
          <span class="links_name">Totalvolunteers</span>
        </a></Link>
         <span class="tooltip">Totalvolunteers</span>
      </li>
      <li>
        <Link to='/admin/dashboard'>
        <a >
        <i class="fa fa-tint" aria-hidden="true"></i>
          <span class="links_name">Dashboard</span>
        </a></Link>
         <span class="tooltip">Dashboard</span>
      </li>
      <li>
        <Link to='/admin/volunteerintrestlog'>
        <a>
        {/* <!-- <i class="fa fa-list" aria-hidden="true"></i> --> */}
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
         <span class="links_name">Volunteer Interest Log</span>
       </a>
        </Link>
       
       <span class="tooltip">Volunteer Interest Log</span>
     </li>
      <li>
      <Link to='/admin/donationrecords'>
       <a href="personal_details.html">
        <i class="fa fa-book" aria-hidden="true"></i>
         <span class="links_name">Donation Records</span>
       </a>
       </Link>
       <span class="tooltip">Donation Records</span>
     </li>
     <li>
     <Link to='/admin/carouselmanagement'>
       
       <a >
        {/* <!-- <i class="fa fa-line-chart" aria-hidden="true"></i> --> */}
        <i class="fa fa-list-alt" aria-hidden="true"></i>
         <span class="links_name">Carousel Management</span>
       </a>
       </Link>
       <span class="tooltip">Carousel Management</span>
     </li>
     <li>
      <Link to='/admin/communityinitiatives'>
        <a >
          <i class="fa fa-tasks" aria-hidden="true"></i>
       
          <span class="links_name">Community Initiatives</span>
        </a>
        </Link>
        <span class="tooltip">Community Initiatives</span>
      </li>
  
  

     <li class="profile">
         <div class="profile-details">
        
           <div class="name_job">
             <div class="name">SUN ADMIN</div>
            
           </div>
         </div>
         <i class='bx bx-log-out' id="log_out" onClick={signoutHandler}></i>
         {/* <span class="tooltip">Logout</span> */}
     </li>
    </ul>
  </div>
}
</div>
  )
  
  
}

// document.addEventListener("DOMContentLoaded", function() {
  
// });


