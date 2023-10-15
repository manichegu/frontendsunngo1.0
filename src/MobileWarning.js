import React from 'react';
import { Link } from 'react-router-dom';
// import logo from './pictures/SUNLOGO55NBG.png'; // Replace with the actual path to your logo image.

function MobileWarning() {
  const warningStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px', // Adjust the padding as needed
    textAlign: 'center', // Center-align text
  };

  const logoStyle = {
    width: '100px', // Adjust the logo size as needed
    marginBottom: '20px', // Add spacing below the logo
  };

  return (
    <div className="mobile-warning" style={warningStyle}>
                
      <img src="./pictures/SUNNGOBGremoved.png" alt="Your Logo" style={logoStyle} />
      <p>This page is not supported on mobile devices.</p>
      <p>Please use a laptop or desktop computer to access it.</p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className='rounded p-2 px-3' style={{ backgroundColor: "#003A69", color: "#fff" }}>Go to Home</button>
      </Link>
    </div>
  );
}

export default MobileWarning;
