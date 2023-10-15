import React from 'react'
import {useContext,useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Image} from 'cloudinary-react';
import {ThreeDots} from 'react-loader-spinner';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {store} from './App'
import * as XLSX from 'xlsx';
export default function CommunityInitiaves() {
  const [token,setToken]=useContext(store);
  const [data,setdata]=useState([]);
  const [edata,esetdata]=useState();
  const [ongoingdata,setOngoingData]=useState([]);
  const [previousdata,setPreviousData]=useState([]);
  const [datastatus,setDatastatus]=useState(false);
  const [indContent,setIndContent]=useState();
  const [reqStatus,setReqStatus]=useState(1);
  const [info,setInfo]=useState({
    // username:'',

    Title:'',
    Location:'',
    OrganisedBy:'',
    phone:'',
    Timings:'',
    filechoosen:''

    // confirmpassword:''
})
const [einfo,esetInfo]=useState({
  // username:'',
  id:'',
  E_Title:'',
  E_Location:'',
  E_OrganisedBy:'',
  E_Timings:'',
  E_filechoosen:''

  // confirmpassword:''
})
const currentDateTime = new Date();
const [image1UploadStatus,setImage1UploadStatus]=useState("");
const [image1Selected,setImage1Selected]=useState("");
const [image1Url,setImage1Url]=useState("");
var PreviousSno=0;
var OngoingSno=0;
  // const [denieddata,setDenieddata]=useState([]);
  // const [selectedOption, setSelectedOption] = useState('Select');
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKENDAPI}/getevents`).then(res=>{setdata(res.data);setDatastatus(true);}).catch((err)=>console.log(err));
    
})
// console.log(edata);
// useEffect(()=>{
//   axios.get('${process.env.REACT_APP_BACKENDAPI}/getpreviousevents').then(res=>{setdata(res.data);setDatastatus(true)}).catch((err)=>console.log(err));
// })
// data.map(content => (
//   moment(content.Timings).format('YYYY-MM-DD HH:mm:ss ') >= moment().format('YYYY-MM-DD HH:mm:ss ')))

  

  const [popup,setPop]=useState(false)
  const handleClickOpen=(content)=>{
      
      // console.log(content);
      // esetInfo({...einfo,["E_Title"]:content.Title});
      // esetInfo({...einfo,["E_Location"]:content.Location});
      // esetInfo({...einfo,["E_OrganisedBy"]:content.OrganisedBy});
      // esetInfo({...einfo,["E_filechoosen"]:content.filechoosen});

      esetInfo({ ...einfo,["id"]:content._id , ["E_Title"]: content.Title, ["E_Location"]: content.Location, ["E_Timings"]: content.Timings, ["E_OrganisedBy"]: content.OrganisedBy, ["E_filechoosen"]: content.filechoosen });

      // console.log(einfo);
      // axios.post('${process.env.REACT_APP_BACKENDAPI}/getindevent',id).then(res=>{esetdata(res.data)}).catch((err)=>console.log(err));
      // console.log(edata);
      // console.log(content);
      // setIndContent(content);

      setPop(!popup);
  }
  const closePopup=()=>{
      setPop(false)
  }

  const OnClickDelete=(id)=>{
    // console.log(id);
    setReqStatus(0);
    axios.post(`${process.env.REACT_APP_BACKENDAPI}/deleteevent`,{id},{
      headers:{
        'x-token':token
    }
    }).then(res=>{
      setReqStatus(1);
    });
  }




const categoriseEvents = () => {
  
  data.map(content => {
    if (moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss')) {
      const updated1Data = [...ongoingdata];
      
      // Push new elements into the updatedData array
      updated1Data.push(content);
      // updatedData.push('Element 2');
    
      // Update the state with the updatedData array
      setOngoingData(updated1Data);
      // console.log(setOngoingData);
    }
    else{
      const updated2Data = [...ongoingdata];
      
      // Push new elements into the updatedData array
      updated2Data.push(content);
      // Update the state with the updatedData array
      setPreviousData(updated2Data);
      // console.log(setOngoingData);
    }
  });
}


const columns = [
  { title: "Name", field: "Title" },
  { title: "Location", field: "Location"},
  { title: "Timings", field: "Timings"},
  { title: "OrganisedBy", field: "OrganisedBy" }
];

const downloadPdf = (type) => {
  setOngoingData([]);
  setPreviousData([]);
// console.log(e.target.name);

    data.map(content => {
      // console.log(moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss'))
      if (moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss')) {
        // const updated1Data = [...ongoingdata];
        
        // // Push new elements into the updatedData array
        // updated1Data.push(content);
        // // updatedData.push('Element 2');
      
        // // Update the state with the updatedData array
        // setOngoingData(updated1Data);
        // console.log(ongoingdata);
        // console.log(content);
        ongoingdata.push(content);
      }
      else{
        // const updated2Data = [...previousdata];
        
        // // Push new elements into the updatedData array
        // updated2Data.push(content);
        // // Update the state with the updatedData array
        // setPreviousData(updated2Data);
        // console.log(previousdata);
        // console.log(content);
        previousdata.push(content);
      }
    });
    
// console.log(ongoingdata);
// console.log(previousdata);
  const doc = new jsPDF();
  doc.text("Student Details", 20, 10);
  if(type=="ongoing"){
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body:ongoingdata
    });
  }
  else{
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body:previousdata
    });
  }
  
  doc.save('table.pdf');
};

const theme = createTheme({
  direction: 'ltr', // Specify the direction property explicitly
});


const downloadExcel = (type) => {


  setOngoingData([]);
  setPreviousData([]);
// console.log(e.target.name);

    data.map(content => {
      // console.log(moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss'))
      if (moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >= moment().format('YYYY-MM-DD HH:mm:ss')) {
        // const updated1Data = [...ongoingdata];
        
        // // Push new elements into the updatedData array
        // updated1Data.push(content);
        // // updatedData.push('Element 2');
      
        // // Update the state with the updatedData array
        // setOngoingData(updated1Data);
        // console.log(ongoingdata);
        // console.log(content);
        ongoingdata.push(content);
      }
      else{
        // const updated2Data = [...previousdata];
        
        // // Push new elements into the updatedData array
        // updated2Data.push(content);
        // // Update the state with the updatedData array
        // setPreviousData(updated2Data);
        // console.log(previousdata);
        // console.log(content);
        previousdata.push(content);
      }
    });
    





    var newData=[] ;
  if(type=="ongoing"){
    newData =ongoingdata.map(row => {
      const newRow = {};
      columns.forEach(col => {
        newRow[col.title] = row[col.field];
      });
      return newRow;
    });
  }
  else{
    newData =previousdata.map(row => {
      const newRow = {};
      columns.forEach(col => {
        newRow[col.title] = row[col.field];
      });
      return newRow;
    });
  }
 

  const workSheet = XLSX.utils.json_to_sheet(newData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "students");

  // Buffer
  let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

  // Binary string
  let binaryString = XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

  // Download
  XLSX.writeFile(workBook, "StudentsData.xlsx");
};


const ChangeHandler=(e)=>{
  // console.log(e.target.name+" : "+e.target.value);
  setInfo({...info,[e.target.name]:e.target.value});
}
const SubmitHandler=e=>{
  e.preventDefault();
  // console.log(einfo);
  info.filechoosen=image1Url;
  setInfo({...info,filechoosen:image1Url});
  // console.log(info.filechoosen+"----------------");
  // console.log(info);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/addevents`,info,{
    headers:{
      'x-token':token
  }
  }).then(
    arr=>{setdata(arr.data);
    setInfo({
      id:'',
      Title: '',
      Location: '',
      OrganisedBy: '',
      Timings: '',
      filechoosen: ''
    });
    setImage1UploadStatus("");
    setImage1Selected("");
    setImage1Url("");
    document.getElementById("exampleFormControlInput1").value="";
    document.getElementById("exampleFormControlInput2").value="";
    document.getElementById("exampleFormControlInput3").value="";
    document.getElementById("exampleFormControlInput4").value="";
    document.getElementById("exampleFormControlInput5").value="";
    
    document.getElementById("inputGroupFile02").value="";
    setImage1UploadStatus("");
    // document.getElementById("exampleFormControlInput4").value="";
    // arr=>console.log(arr.data);
    }
  )
 }
 const EditHandler=e=>{
  e.preventDefault();
  // console.log()
  // console.log(einfo);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/updateevent`,einfo,{
    headers:{
      'x-token':token
  }
  }).then(
    closePopup()
  )

  // info.filechoosen=image1Url;
  // setInfo({...info,filechoosen:image1Url});
  // console.log(info.filechoosen+"----------------");
  // console.log(info);
  // axios.post("${process.env.REACT_APP_BACKENDAPI}/updateevents",id,info).then(
  //   arr=>{setdata(arr.data);
  //   setInfo({
  //     Title: '',
  //     Location: '',
  //     OrganisedBy: '',
  //     Timings: '',
  //     filechoosen: ''
  //   });
  //   setImage1UploadStatus("");
  //   setImage1Selected("");
  //   setImage1Url("");
  //   document.getElementById("exampleFormControlInput1").value="";
  //   document.getElementById("exampleFormControlInput2").value="";
  //   document.getElementById("exampleFormControlInput3").value="";
  //   document.getElementById("exampleFormControlInput4").value="";
  //   document.getElementById("inputGroupFile02").value="";
  //   setImage1UploadStatus("");
  //   // document.getElementById("exampleFormControlInput4").value="";
  //   // arr=>console.log(arr.data);
  //   }
  // )
 }
 const E_ChangeHandler=(e)=>{
  // console.log(e.target.name+" : "+e.target.value);
  esetInfo({...einfo,[e.target.name]:e.target.value});
}


 

 const upload1Image=(e)=>{
  e.preventDefault();
  setImage1UploadStatus("uploading....");
  // console.log(image1Selected);
  const formData=new FormData();
  formData.append("file",image1Selected);
  formData.append("upload_preset",process.env.REACT_APP_CLOUDINARYPRESET);

  axios.post(`${process.env.REACT_APP_CLOUDINARYURL}`,formData).then((res)=>{
    // console.log(res);
    // console.log(res.data.public_id);
    
    if(res.data.public_id){
      setImage1Url(res.data.public_id);
      setImage1UploadStatus("Done!!");
    }
  })
};
  return (
    <section>
      { token &&
    <section class="home-section p-4">
    
    {datastatus?
    <>
    
    <section >
       


               
      <h4 className='mb-2'>Ongoing</h4>
              <table style={{width:"100%", marginBottom:"100px"}}>
                
                <tr>
                <th>S.no</th>
                <th>Agenda</th>
                  <th>Location</th>
                  
                  <th>Date & StartTime</th>
                  <th>Organised By</th>
                  <th>File Choosen</th>
                      
                  <th>
                {/* <div class="dropdown d-flex justify-content-end">
                    <button class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"black", color:"white"}}>
                      Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item zoom" href="#">By Area</a></li>
                      <li><a class="dropdown-item zoom" href="#">By name</a></li>

                    </ul>
                  </div> */}
            </th>
                </tr>
                {data.map(content => (
  moment(content.Timings).format('YYYY-MM-DD HH:mm:ss ') >= moment().format('YYYY-MM-DD HH:mm:ss ')&& (
    
    <tr>
      <td>{OngoingSno =OngoingSno + 1}</td>
      <td>{content.Title}</td>
      <td><a href={content.Location} target='_blank' style={{textDecoration:"none"}}><button type="button" class="btn btn-dark w-100 d-flex justify-content-center align-items-center zoom text-info"><i class="fa fa-map-marker ms-2 text-warning" aria-hidden="true"></i> view</button></a></td>
      {/* <td>{moment(content.Timings).format('HH:mm:ss DD-MM-YYYY') < moment().format('HH:mm:ss DD-MM-YYYY') ? 'true' : 'false'}</td> */}
       <td>{moment(content.Timings).format('HH:mm:ss DD-MM-YYYY') }</td>
      <td>{content.OrganisedBy}</td>
      {/* ID: {content.filechoosen}  */}
      <td><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.filechoosen} /></td>
      <td>
        { reqStatus===1 &&(
          <div className='row'>
          <div className='col'>
          <button type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)}>Edit</button>
          </div>
          <div className='col'>
          <button type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>OnClickDelete(content._id)} >Delete</button>
          </div>
        </div>
        )}
      
      { reqStatus===0 &&(
          <div className='row'>
          <div className='col'>
          <button disabled type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)}>Edit</button>
          </div>
          <div className='col'>
          <button disabled type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>OnClickDelete(content._id)} >Delete</button>
          </div>
        </div>
        )}
        
      </td>
    </tr>
  )
))}

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


 





              <div class="dropdown d-flex justify-content-center m-4">
              <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h1 align="center">React-App</h1> */}
        {/* <h4 align="center">Export Data to PDF in Material Table</h4> */}
        {/* <button onClick={downloadPdf}>Download PDF</button> */}
        <button type="button" onClick={()=>{downloadPdf("ongoing")}} class="btn btn-warning zoom m-2"><i className="fa fa-download" aria-hidden="true"></i>
  <span className="mx-2">PDF</span></button>
      </div>
    </ThemeProvider>
              

    <button  type="button" onClick={()=>{downloadExcel("ongoing")}} class="btn btn-success zoom m-2"><i class="fa fa-download" aria-hidden="true"></i><span className="mx-2">Excel</span></button>
              </div>
              
      <h4>Previous</h4>
              <table style={{width:"100%", marginBottom:"100px"}}>
                {/* <caption>Previous</caption> */}
                <tr>
                <th>S.no</th>
                <th>Agenda</th>
                  <th>Location</th>
                  
                  
                  
                  
                  <th>Date & StartTime</th>
                  <th>Organised By</th>
                  <th>File Choosen</th>
                  <th>
                {/* <div class="dropdown d-flex justify-content-end">
                    <button class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"black", color:"white"}}>
                      Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item zoom" href="#">By Area</a></li>
                      <li><a class="dropdown-item zoom" href="#">By name</a></li>

                    </ul>
                  </div> */}
            </th>
                </tr>
                {data.map((content,i) => (
  moment(content.Timings).format('YYYY-MM-DD HH:mm:ss ') < moment().format('YYYY-MM-DD HH:mm:ss ') && (
    // PreviousSno = PreviousSno + 1,
    <tr>
      <td>{PreviousSno = PreviousSno + 1}</td>
      <td>{content.Title}</td>
      <td><a href={content.Location} target='_blank' style={{textDecoration:"none"}}><button type="button" class="btn btn-dark w-100 d-flex justify-content-center align-items-center zoom text-info"><i class="fa fa-map-marker ms-2 text-warning" aria-hidden="true"></i> view</button></a></td>
      <td>{moment(content.Timings).format('HH:mm:ss DD-MM-YYYY')}</td>
      <td>{content.OrganisedBy}</td>
      {/* ID: {content.filechoosen}  */}
      <td><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.filechoosen} /> </td>
      <td>
        {reqStatus===1 && (
           <div className='row'>
           <div className='col'>
           <button type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom"  onClick={()=>handleClickOpen(content)}>Edit</button>
           </div>
           <div className='col'>
           <button type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>OnClickDelete(content._id)}>Delete</button>
           </div>
         </div>
        )}
        {reqStatus===0 && (
           <div className='row'>
           <div className='col'>
           <button disabled type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom"  onClick={()=>handleClickOpen(content)}>Edit</button>
           </div>
           <div className='col'>
           <button disabled type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>OnClickDelete(content._id)}>Delete</button>
           </div>
         </div>
        )}
        
        
      </td>
    </tr>
  )
))}

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
              <div class="dropdown d-flex justify-content-center m-4">
              <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h1 align="center">React-App</h1> */}
        {/* <h4 align="center">Export Data to PDF in Material Table</h4> */}
        {/* <button onClick={downloadPdf}>Download PDF</button> */}
        <button type="button" onClick={()=>{downloadPdf("previous")}} class="btn btn-warning zoom m-2"><i className="fa fa-download" aria-hidden="true"></i>
  <span className="mx-2">PDF</span></button>
      </div>
    </ThemeProvider>
              

    <button  type="button" onClick={()=>{downloadExcel("previous")}} class="btn btn-success zoom m-2"><i class="fa fa-download" aria-hidden="true"></i><span className="mx-2">Excel</span></button>
              </div>
              
              <h4>Add Iniative</h4>
      <div className='d-flex justify-content-center align-items-center'>
      <form class=" p-4 mb-4 zoom" onSubmit={SubmitHandler} style={{backgroundColor:"#003A69", color:"white", width:"600px", borderRadius:"20px"}}>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Agenda</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="abc" name="Title" onChange={ChangeHandler} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput2" class="form-label">Location</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput2" placeholder="Paste the Google map loaction Link here" name="Location" onChange={ChangeHandler} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Organised By</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput3" placeholder="Name of the volunteers" name="OrganisedBy" onChange={ChangeHandler} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput5" class="form-label">Phone Number</label>
                    <input type="number" class="form-control p-2" id="exampleFormControlInput5" placeholder="Phone number of the Volunteer" name="phone" onChange={ChangeHandler} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput4" class="form-label">Date & StartTime</label>
                    <input type="datetime-local" class="form-control p-2" id="exampleFormControlInput4" placeholder="abc" name="Timings" onChange={ChangeHandler}required></input>
                  </div>
                
                  <div class="input-group mb-3">
                  <input type="file"  class="form-control p-2" id="inputGroupFile02" accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage1Selected(e.target.files[0])}} required/>
                  <button className='zoom p-2 btn-info' onClick={upload1Image} style={{border:"none", borderEndEndRadius:"5px" ,borderTopRightRadius:"5px"}}>Upload</button>
                  <p>{image1UploadStatus}</p>
                    {/* <input type="file" class="form-control" id="inputGroupFile02"></input> */}
                    {/* <label class="input-group-text" for="inputGroupFile02">Upload</label> */}
                  </div>
                 <center><button type="submit" class="btn btn-success zoom" >Save</button></center> 
                </form>

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
<div className='d-flex justify-content-center align-items-center'>
      <form class=" p-4 mb-4 zoom" onSubmit={EditHandler} style={{backgroundColor:"#003A69", color:"white", width:"600px", borderRadius:"20px"}}>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Agenda</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="abc" name="E_Title" onChange={E_ChangeHandler} value={einfo.E_Title} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput2" class="form-label">Location do it with google maps</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput2" placeholder="abc" name="E_Location" onChange={E_ChangeHandler} value={einfo.E_Location} required></input>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput3" class="form-label">Organised By</label>
                    <input type="text" class="form-control p-2" id="exampleFormControlInput3" placeholder="Select From volunteers should be a drop down" name="E_OrganisedBy" onChange={E_ChangeHandler} value={einfo.E_OrganisedBy} required></input>
                  </div>

                 <center><button type="submit" class="btn btn-success zoom" >Save</button></center> 
                </form>

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
