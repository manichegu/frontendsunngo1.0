import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Dashboard from './Dashboard';
import VolunteerIntrestlog from './VolunteerIntrestlog';
import DonationRecords from './DonationRecords';
import CarouselManagement from './CarouselManagement';
import CommunityInitiaves from './CommunityInitiaves';
import PopUp from './popup';
import Nav from './Nav';
import Login from './Login';
import LLogin from './LLogin';
import Home from './Home';
import DonationPage from './DonationPage'
import VolunteerApplication from './VolunteerApplication';
import Totalvolunteers from './Totalvolunteers';
export const store = React.createContext();
// import './script';
// import Writeblog from './Writeblog'
export default function App() {
  const [token,setToken]=useState(null);
  // useEffect(() => {
  //   if (window.location.pathname === '/') {
  //     setToken(null); // Reset token to null only when at the login page
  //     console.log("-----------"+token+"-------------");
  //   }
  // }, [window.location.pathname]);


  useEffect(() => {
    const disableBackNavigation = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };
  
    window.addEventListener("popstate", disableBackNavigation);
  
    return () => {
      window.removeEventListener("popstate", disableBackNavigation);
    };
  }, []);
  return (
    <div>
       <store.Provider value={[token,setToken]}>
       <Router>
      <Nav/>
      <Routes>
        
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/volunteerintrestlog"   element={<VolunteerIntrestlog/>}/>
        <Route path="/admin/donationrecords"   element={<DonationRecords/>}/>
        <Route path="/admin/carouselmanagement"   element={<CarouselManagement/>}/>
        <Route path="/admin/communityinitiatives"   element={<CommunityInitiaves/>}/>
        <Route path="/admin/popup"   element={<PopUp/>}/>
        {/* <Route path="/"   element={<Login/>}/> */}
        <Route path="/admin"   element={<LLogin/>}/>
        <Route path="/"   element={<Home/>}/>
        <Route path="/volunteerapplication"   element={<VolunteerApplication/>}/>
        <Route path="/donationpage"   element={<DonationPage/>}/>
        <Route path="admin/totalvolunteers"   element={<Totalvolunteers/>}/>
        
      </Routes>
      </Router>
      </store.Provider>
    </div>
  )
}

