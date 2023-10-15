import React from 'react'
import {useContext,useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import {store} from './App'
import {ThreeDots} from 'react-loader-spinner';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';
import * as XLSX from 'xlsx';
import {Image} from 'cloudinary-react';

// const studentData = [
//   {
//     id: 1,
//     name: "Neeraj",
//     email: "neeraj@gmail.com",
//     year: 2015,
//     fee: 167000,
//   },
//   {
//     id: 2,
//     name: "Vikas",
//     email: "vikas@gmail.com",
//     year: 2013,
//     fee: 785462,
//   },
//   {
//     id: 3,
//     name: "Rahul",
//     email: "rahul@gmail.com",
//     year: 2020,
//     fee: 784596,
//   }
// ];



export default function DonationRecords() {
  const [token,setToken]=useContext(store);
  const [data,setData]=useState([]);
  const [datastatus,setDatastatus]=useState(false);
  const [indContent,setIndContent]=useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const [denieddata,setDenieddata]=useState([]);
  // const [selectedOption, setSelectedOption] = useState('Select');
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKENDAPI}/donationrecords`,{
      headers:{
        'x-token':token
    }
    }).then(res=>{setData(res.data);setDatastatus(true);
      // console.log(res.data)
    }).catch((err)=>console.log(err));
})



const columns = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Transaction Id", field: "transactionId" },
  { title: "Payment Method", field: "paymentMethod" },
  { title: "Amount", field: "amount" , type: "currency"},
  { title: "Ph No", field: "phoneNumber", type: "numeric" },
  { title: "Comment", field: "additionalInformation" },
  { title: "Date of Payment", field: "date" },
];
const getCurrentPageItems = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // return data.slice(startIndex, endIndex);
  const sortedData = data.slice().sort((a, b) => {
    if (selectedOption === 'By Name') {
      return a.name.localeCompare(b.name);
    } else if (selectedOption === 'By Amount') {
      return a.amount - b.amount;
    }else{
      if (a.verifystatus === false && b.verifystatus === true) {
        return -1;
      } else if (a.verifystatus === true && b.verifystatus === false) {
        return 1;
      }
    }
    
    // Add additional sorting criteria here if needed
  });

  // Return the sorted and sliced portion of the data
  return sortedData.slice(startIndex, endIndex);
};

// Function to handle page navigation
const goToPage = (page) => {
  setCurrentPage(page);
};

const downloadPdf = () => {
  const doc = new jsPDF();
  doc.text("Donations", 20, 10);
  doc.autoTable({
    theme: "grid",
    columns: columns.map(col => ({ ...col, dataKey: col.field })),
    body: data
  });
  doc.save('table.pdf');
};

const theme = createTheme({
  direction: 'ltr', // Specify the direction property explicitly
});


const downloadExcel = () => {
  const newData =data.map(row => {
    const newRow = {};
    columns.forEach(col => {
      newRow[col.title] = row[col.field];
    });
    return newRow;
  });

  const workSheet = XLSX.utils.json_to_sheet(newData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Donations");

  // Buffer
  let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

  // Binary string
  let binaryString = XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

  // Download
  XLSX.writeFile(workBook, "DonationData.xlsx");
};

const Verifiedstatus=(e)=>{
  // console.log(email);
  // setReqStatus(0);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/verifydonationrecords`,{id:e.target.value},{
    headers:{
      'x-token':token
  }
  }).then(
      res=>{
        setData(res.data);
      // setReqStatus(1)
      }

    )
}



const [popup,setPop]=useState(false)
const handleClickOpen=(content)=>{
    setPop(!popup)
    // console.log(content);
    setIndContent(content);
}
const closePopup=()=>{
    setPop(false)
}

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  // console.log(option);
  if(option=="By Area"){
    // console.log("area");
    data.sort((a,b)=>a.name>b.name ? 1:-1);
  }
  // data.sort((a,b)=>a.name>b.name ? 1:-1)
};
  return (
    <section>
      { token &&
    <section class="home-section p-4">
    
        {datastatus?
        <>
   
        <section >
      <h4 className='mb-2'>Donation Records</h4>

              <table style={{width:"100%"}}>
                
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Ph No</th>
                  <th>Payment Screen Shot</th>
                  <th>Comment</th>
                      
                  <th>
                <div class="dropdown d-flex justify-content-end">
                    <button class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"black", color:"white"}}>
                      Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Amount')}>By Amount</a></li>
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Name')}>By Name</a></li>
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By VerifyStatus')}>By VerifyStatus</a></li>

                    </ul>
                  </div>
                  
                  
            </th>
                </tr>
                {/* {selectedOption=="By Area"?true:false && */}
                {getCurrentPageItems().map(content => (
                <tr>
                
                  <td>{content.name}</td>
                  <td>{content.amount}</td>
                  <td>{content.phoneNumber}</td>
                  {/* {content.qrCodeScan} */}
                  <td><a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${content.qrCodeScan}`} target='_blank'><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.qrCodeScan} /></a></td>
                  {/* <td><Image style={{width: "100px"}} cloudName=${process.env.REACT_APP_CLOUDNAME} publicId={content.qrCodeScan} /></td> */}
                  {/* <td>{content.additionalInformation}</td> */}
                  <td >{content.additionalInformation !== '' ? content.additionalInformation: '-'}</td>

                        <td>
                          <div className='row'>
                          <div className='col'>
                          <button type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)}>Full Details</button>
                          </div>
                          <div className='col'>
                          <button value={content._id}
  type="button" 
  className={`btn btn-success w-100 d-flex justify-content-center align-items-center zoom${content.verifystatus ? ' disabled' : ''}` } onClick={Verifiedstatus}
>
  {content.verifystatus ? "Verified" : "Unverified"}
</button>
                          </div>
                          </div>
                            
                            
                           
                        </td>
               
                </tr>
                 ))}
                        {/* } */}
                {/* <tr>
                  <td>Arun</td>
                  <td>Singh</td>
                  <td>32</td>
                </tr>
                <tr>
                  <td>Sam</td>
                  <td>Watson</td>
                  <td>41</td>
                </tr> */}
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
                <div class="scroll_bar_donation" style={{display:"flex", overflow:"scroll"}}>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <div>
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
              <div class="dropdown d-flex justify-content-center m-4">
              <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h1 align="center">React-App</h1> */}
        {/* <h4 align="center">Export Data to PDF in Material Table</h4> */}
        {/* <button onClick={downloadPdf}>Download PDF</button> */}
        <button type="button" onClick={downloadPdf} class="btn btn-warning zoom m-2"><i className="fa fa-download" aria-hidden="true"></i>
  <span className="mx-2">PDF</span></button>
      </div>
    </ThemeProvider>
              

    <button  type="button" onClick={downloadExcel} class="btn btn-success zoom m-2"><i class="fa fa-download" aria-hidden="true"></i><span className="mx-2">Excel</span></button>
              </div>
              

              <div>
            {/* <button onClick={handleClickOpen}>Open popup</button> */}
            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            {/* <div className="popup-header">
                                <h1>popup</h1>
                                <h1 onClick={closePopup}>X</h1>
                            </div> */}
                            <div>
                            {/* <p>This is simple popup in React js</p> */}
                            {/* <div class="card" style={{width: "18rem"}}>
  <img src="..." class="card-img-top" alt="..."></img>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item"></li>
    <li class="list-group-item">{indContent.Blood_grp}</li>
    <li class="list-group-item"></li>
  
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}
<div class=" mt-4">
{/* <h1 >X</h1> */}
{/* <i class="fa fa-times fa-5x" aria-hidden="true" onClick={closePopup}  style={{color:"gray"}}></i> */}
<i class="fa fa-times fa-2x bg-light rounded p-1 mb-2" aria-hidden="true" onClick={closePopup}  style={{color:"black"}}></i>
        <div class="card">
            <div class="card-header">
                <div class="row">
                    {/* <div class="text-center">
                        <img src="profile-image.jpg" alt="Profile Image" class="img-fluid rounded-circle"></img>
                    </div> */}
                    <div class="">
                        <h5 class="card-title">Donar Information</h5>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td class="card-text-label bg-light">Name</td>
                                    <td class="text-light">{indContent.name}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Email</td>
                                    <td class="text-light">{indContent.email}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Phone</td>
                                    <td class="text-light">{indContent.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Transaction Id</td>
                                    <td class="text-light">{indContent.transactionId}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Payment Method</td>
                                    <td class="text-light">{indContent.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Amount</td>
                                    <td class="text-light">{indContent.amount}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">QrCodeScan</td>
                                    <td class="text-light">{indContent.qrCodeScan}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Additional Information</td>
                                    <td class="text-light">{indContent.additionalInformation !== '' ? indContent.additionalInformation: '-'}</td>
                                    {/* <td class="text-light">{indContent.additionalInformation}</td> */}
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">date</td>
                                    <td class="text-light">{moment(indContent.date).format('HH:mm:ss DD-MM-YYYY') }</td>
                                </tr>
                                {/* <tr>
                                    <td class="card-text-label bg-light">Blood Group</td>
                                    <td class="text-light">{indContent.Blood_grp}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Additional Information</td>
                                    <td class="text-light">{indContent.additionalInfo}</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
                            </div>
                        </div>
                    </div>:""
                }
            </div>
        </div>

              </section>
              </>
              :(
                <div className="centered-content " style={{backgroundColor:'#f0f4fb'}}>
              <div className="spinner-container">
              <ThreeDots height="200" width="100" color="black "  ariaLabel="loading" />
              
            </div>
            </div>)}
            
            </section>
           } 
           </section>
  )
}
