import React, { useContext, useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from './App';
import { ThreeDots } from 'react-loader-spinner';
import { Image } from 'cloudinary-react';
export default function Dashboard() {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [datastatus1, setDatastatus1] = useState(false);
  const [indContent, setIndContent] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDAPI}/getblooddonars`, {
        headers: {
          'x-token': token
        }
      })
      .then((res) => {
        if (res.status === 400) {
          // Redirect to the login page
          window.location.href = '/';
        } else {
          setData(res.data);
          setDatastatus1(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'By Name') {
      
      setData([...data.sort((a, b) => (a.name < b.name ? 1 : -1))]);
    }
    else if (option === 'By Blood grp') {
      setData([...data.sort((a, b) => (a.Blood_grp> b.Blood_grp? 1 : -1))]);
      
    }
  };

  const handleClickOpen = (content) => {
    setIndContent(content);
  };

  const closePopup = () => {
    setIndContent(null);
  };

  // Function to get the items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section class="home-section p-4">
     
      {token && (
        <section >
          {datastatus1 ? (
            <section>
               {/* <h1> {process.env.REACT_APP_CLOUDNAME} </h1>
               <h1> {process.env.REACT_APP_CLOUDINARYURL} </h1> */}
              <h4 className='pb-2'>Blood Donars</h4>
              <table style={{ width: '100%' }}>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>State</th>
                  <th>District</th>
                  {/* <th>Age</th> */}
                  <th>
                    <div class="dropdown d-flex justify-content-end">
                      <button
                        class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ backgroundColor: 'black', color: 'white' }}
                      >
                        Filter
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Blood grp')}>
                            By Blood grp
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Name')}>
                            By name
                          </a>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
                {getCurrentPageItems().map((content, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td style={{ textTransform: 'capitalize' }}>{content.volunteer_name}</td>

                    <td>{content.Gender}</td>
                    <td>{content.Blood_grp}</td>
                    <td>{content.state}</td>
                    <td>{content.District}</td>
                    {/* <td>cal from dob</td> */}
                    <td>
                      <div class="row">
                        <div class="col">
                          <button type="button" class="btn btn-info zoom" onClick={() => handleClickOpen(content)}>
                            Full Details
                          </button>
                        </div>
                        <div class="col">
                    <button
  type="button"
  className="btn btn-success zoom"
  
  onClick={() => {
    window.location.href = `mailto:${content.email}`;
  }}
>
  Contact
</button>

                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div>
                {/* Pagination */}
                {/* <div>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <button style={{background:"none",border:"none"}} key={index} onClick={() => goToPage(index + 1)}>
                      {index + 1}
                    </button>
                  ))}
                </div> */}
                <div className='ps-2'>Page No:</div>
                <div style={{display:"flex"}}>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <div >
                      {currentPage === (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "#003A69", borderBlockColor: "none",color:"#fff" }} key={index} onClick={() => goToPage(index + 1)}>
    {index + 1}
  </button>
)}
 {currentPage != (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "white",borderBlockColor: "none",color:"#003A69" }} key={index} onClick={() => goToPage(index + 1)}>
   {index + 1}
  </button>
)}

                    </div>
                   
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="centered-content" style={{ backgroundColor: '#f0f4fb' }}>
              <div className="spinner-container">
                <ThreeDots height="200" width="100" color="black " ariaLabel="loading" />
              </div>
            </div>
          )}

          {/* Popup */}
          {indContent && (
            <div className="main" >
              <div className="popup" >
                <div>
                  <div class=" mt-4">
                    {/* <i
                      class="fa fa-times fa-5x"
                      aria-hidden="true"
                      onClick={closePopup}
                      style={{ color: 'gray' }}
                    ></i> */}
                    <i class="fa fa-times fa-2x bg-light rounded p-1 mb-2" aria-hidden="true" onClick={closePopup}  style={{color:"black"}}></i>
                    <div class="card">
                      <div class="card-header">
                        <div class="row">
                          <div class="text-center">
                            
                            {/* <img src="profile-image.jpg" alt="Profile Image" class="img-fluid rounded-circle"></img> */}

                            <a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${indContent.user_photo}`} target='_blank'><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={indContent.user_photo} /></a>
                          </div>
                          <div class="">
                            <h5 class="card-title">Volunteer Information</h5>
                            <table class="table table-bordered">
                              <tbody>
                                <tr>
                                  <td class="card-text-label bg-light">SUN ID</td>
                                  <td class="text-light">{indContent.studentId}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Name</td>
                                  <td class="text-light">{indContent.volunteer_name}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Email</td>
                                  <td class="text-light">{indContent.email}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Phone</td>
                                  <td class="text-light">{indContent.phone}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">State, District</td>
                                  <td class="text-light">{indContent.state}, {indContent.District}</td>
                                </tr>
                                
                                <tr>
                                  <td class="card-text-label bg-light">Address</td>
                                  <td class="text-light">{indContent.address}</td>
                                </tr>
                                <tr>
                                  {/* <td class="card-text-label bg-light">Availability</td>
                                  <td class="text-light">{indContent.availability}</td> */}
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Position</td>
                                  <td class="text-light">{indContent.position}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Blood Donar</td>
                                  <td class="text-light">Yes</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Blood Group</td>
                                  <td class="text-light">{indContent.Blood_grp}</td>
                                </tr>
                                <tr>
                                  <td class="card-text-label bg-light">Additional Information</td>
                                  {/* <td class="text-light">{indContent.additionalInfo}</td> */}
                                  <td class="text-light">{indContent.additionalInfo !== '' ? indContent.additionalInfo: '-'}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
