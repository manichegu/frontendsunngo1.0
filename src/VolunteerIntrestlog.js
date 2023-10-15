import React from 'react'
import {useContext,useState,useEffect} from 'react'
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner';
import './Popup.css'
import {store} from './App'
import {Image} from 'cloudinary-react';
export default function VolunteerIntrestlog() {
  const [token,setToken]=useContext(store);
    const [data,setData]=useState([]);
    const [denieddata,setDenieddata]=useState([]);
    const [selectedOption, setSelectedOption] = useState('Select');
    const [datastatus1,setDatastatus1]=useState(false);
    const [datastatus2,setDatastatus2]=useState(false);
    const [indContent,setIndContent]=useState();
    const [selecteddropdownOption, setSelecteddropdownOption] = useState(null);
    const [currentappPage, setCurrentappPage] = useState(1);
    const [currentdeniedPage, setCurrentdeniedPage] = useState(1);
    const [reqStatus,setReqStatus]=useState(1);
    const itemsPerPage = 4;
    var appliedSno=0;
    var deniedSno=0;

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKENDAPI}/appliedforvolunteer`,{
        headers:{
          'x-token':token
      }
      }).then(res=>{setData(res.data);setDatastatus1(true)}).catch((err)=>console.log(err));
  })

  // console.log(data);
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKENDAPI}/deniedforvolunteer`,{
      headers:{
        'x-token':token
    }
    }).then(res=>{setDenieddata(res.data);setDatastatus2(true)}).catch((err)=>console.log(err));
})
const DenyHandler=email=>{
  // console.log(email);
  setReqStatus(0);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/deniedforvolunteer`,{email:email,accept:-1},{
    headers:{
      'x-token':token
  }
  }).then(
      arr=>{
        setDenieddata(arr.data);
      setReqStatus(1)
      }

    )
}
const getCurrentPageappItems = () => {
  const startIndex = (currentappPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

// Function to handle page navigation
const goToappPage = (page) => {
  setCurrentappPage(page);
};
const getCurrentPagedeniedItems = () => {
  const startIndex = (currentdeniedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return denieddata.slice(startIndex, endIndex);
};

// Function to handle page navigation
const goTodeniedPage = (page) => {
  setCurrentdeniedPage(page);
};
  const AcceptHandler=email=>{
    // console.log(email);
    // console.log(selectedOption);
    
    if(selectedOption=="Select"){
      alert("Please select the position!!");
    }
    else{
      setReqStatus(0);
      axios.post(`${process.env.REACT_APP_BACKENDAPI}/appliedforvolunteer`,{email:email,selectedOption:selectedOption,accept:1},{
        headers:{
          'x-token':token
      }
      }).then((arr)=>{
        setData(arr.data);
        setReqStatus(1);
        setSelectedOption('Select')
        var inputFields = document.getElementsByClassName("form-select")
        // console.log(inputFields);
        for (var i = 0; i < inputFields.length; i++) {
          inputFields[i].value = "Select";
        }
      }
        
        // arr=>console.log(arr.data),
      )
    }
    
  }
  const ReconsiderHandler=email=>{
    // console.log(email);
    setReqStatus(0);
    axios.post(`${process.env.REACT_APP_BACKENDAPI}/deniedforvolunteer`,{email:email,accept:0},{
      headers:{
        'x-token':token
    }
    }).then(
      res=>{
        setReqStatus(1)
      }
      
        // arr=>setData(arr.data),
        // arr=>console.log(arr.data),
      )
  }
  const OnClickDelete=(id)=>{
    // console.log(id);
    setReqStatus(0);
    axios.post(`${process.env.REACT_APP_BACKENDAPI}/deleteappliedvolunteer`,{id},{
      headers:{
        'x-token':token
    }
    }).then(res=>{
      setDenieddata(res.data);setReqStatus(1)});
  }
  // const FullDetailsHandler=content=>{
  //     console.log(content);
  //     setIndContent(content);
  // }



  const [popup,setPop]=useState(false)
  const handleClickOpen=(content)=>{
      setPop(!popup)
      console.log(content);
      setIndContent(content);
  }
  const closePopup=()=>{
      setPop(false)
  }


  const handleOptionSelect = (option) => {
    setSelecteddropdownOption(option);
    // console.log(selecteddropdownOption);
    // console.log(option);
    if(option=="By Area"){
      // console.log("area");
      data.sort((a,b)=>a.name>b.name ? 1:-1);
    }
    // data.sort((a,b)=>a.name>b.name ? 1:-1)
  };



  



  return (
    <section class="home-section p-4">
    
    {(datastatus1 && datastatus2) ?
    <>
    
<section >
{/* {data} */}
<section className='mb-4'>


    <h4 className='p-2 px-0'>Applied for Volunteer</h4>
	<table style={{width:"100%"}}>
		{/* <caption>Applied</caption> */}
		<tr>
    <th>S.no</th>
			<th>Name</th>
			<th>Email</th>
			<th>ID</th>
      
            <th>Position</th>
            <th>
                <div class="dropdown d-flex justify-content-end">
                    <button class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"black", color:"white"}}>
                      Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item zoom" href="#"  onClick={() => handleOptionSelect('By Name')}>By Name</a></li>
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Blood_donar')}>By Blood Donar</a></li>

                    </ul>
                  </div>
            </th>
		</tr>
        {getCurrentPageappItems()
        .sort((a, b) => {
          if (selecteddropdownOption === 'By Name') {
            return a.volunteer_name > b.volunteer_name ? 1 : -1;
          } else if (selecteddropdownOption === 'By Blood_donar'){
            return a.Blood_donar < a.Blood_donar ? 1 : -1;
          }
        })
        .map(content => (
		<tr>
      <td>{appliedSno+=1}</td>
			<td>{content.volunteer_name}</td>
			<td>{content.email}</td>
            {/* {content.Blood_donar && 
			<td>yes</td>
        }
        {!content.Blood_donar && 
			<td>No</td>
        } */}
        <td><a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${content.user_id}`} target='_blank'><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.user_id} /></a></td>
        
            <td>
            {/* setSelectedOption(e.target.value) */}
                <select class="form-select" aria-label="Default select example"  onChange={(e) =>{setSelectedOption(e.target.value);} } >
                    <option selected>Select</option>
                    <option value="President">President</option>
                    <option value="Vice-President">Vice-President</option>
                    <option value="Co-ordinator">Co-ordinator</option>
                    <option value="InCharge">InCharge</option>
                    <option value="Volunteer">Volunteer</option>
                    
                   
                  </select>
            </td>
            <td>
            { reqStatus===1 && (
                <div className='row'>
                <div className='col '>
                <button  type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>AcceptHandler(content.email)}>Accept</button>
                </div>
                <div className='col'>
                <button type="button" class="btn btn-danger w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>DenyHandler(content.email)} >Deny</button>
                </div>
                <div className='col'>
                  {/* onClick={()=>FullDetailsHandler(content)}*/}
                <button type="button"  class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)} >Full Details</button>
                </div>
              </div>
            )}
          { reqStatus===0 && (
                <div className='row'>
                <div className='col '>
                <button disabled type="button" class="btn btn-success w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>AcceptHandler(content.email)}>Accept</button>
                </div>
                <div className='col'>
                <button disabled type="button" class="btn btn-danger w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>DenyHandler(content.email)} >Deny</button>
                </div>
                <div className='col'>
                  {/* onClick={()=>FullDetailsHandler(content)}*/}
                <button disabled type="button"  class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)} >Full Details</button>
                </div>
              </div>
            )}
                
               
            </td>
		</tr>
         ))}

	</table>
  <div className='ps-2'>Page No:</div>
                <div style={{display:"flex"}}>
                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <div >
                      {currentappPage === (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "#003A69", borderBlockColor: "none",color:"#fff" }} key={index} onClick={() => goToappPage(index + 1)}>
    {index + 1}
  </button>
)}
 {currentappPage != (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "white",borderBlockColor: "none",color:"#003A69" }} key={index} onClick={() => goToappPage(index + 1)}>
   {index + 1}
  </button>
)}

                    </div>
                   
                  ))}
                </div>
  </section>


  <section className="mt-4">
  <h4 className='p-2 px-0'>Denied Applications</h4>
    <table style={{width:"100%"}}>
		{/* <caption>Denied</caption> */}
		<tr>
      <th>S.no</th>
			<th>Name</th>
			<th>Email</th>
			<th>ID</th>
      <th>Profession</th>
      {/* <th>Availability</th> */}
            {/* <th>Position</th> */}
            <th>
                <div class="dropdown d-flex justify-content-end">
                    <button class="btn  dropdown-toggle  d-flex justify-content-center align-items-center p-2 px-4 zoom" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"black", color:"white"}}>
                      Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Name')}>By Name</a></li>
                      <li><a class="dropdown-item zoom" href="#" onClick={() => handleOptionSelect('By Blood_donar')}>By Blood Donar</a></li>

                    </ul>
                  </div>
            </th>
		</tr>
        {getCurrentPagedeniedItems()
           .sort((a, b) => {
            if (selecteddropdownOption === 'By Name') {
              return a.volunteer_name > b.volunteer_name ? 1 : -1;
            } else if (selecteddropdownOption === 'By Blood_donar'){
              return a.Blood_donar < a.Blood_donar ? 1 : -1;
            }
          })
        .sort((a, b) => {
          if (selecteddropdownOption === 'By Name') {
            return a.name < b.name ? 1 : -1;
          } else if (selecteddropdownOption === 'By Blood_donar'){
            return a.Blood_donar < a.Blood_donar ? 1 : -1;
          }
        })
        .map(content => (
		<tr>
      <td>{deniedSno=deniedSno+1}</td>
			<td>{content.volunteer_name}</td>
			<td> {content.email}</td>
            {/* {content.Blood_donar && 
			<td>yes</td>
        }
        {!content.Blood_donar && 
			<td>No</td>
        } */}
        <td><a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${content.user_id}`} target='_blank'><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.user_id} /></a></td>
        <td>{content.Profession}</td>
            {/* <td>{content.availability}</td> */}
            <td>
              {reqStatus===1 &&(
                <div className='row'>
                <div className='col w-100 d-flex justify-content-center align-items-center '>
                <button  type="button" onClick={()=>handleClickOpen(content)}class="btn btn-info zoom">Full Details</button>
                </div>
                <div className='col w-100 d-flex justify-content-center align-items-center'>
                <button type="button" class="btn btn-success zoom" onClick={()=>ReconsiderHandler(content.email)}>Reconsider</button>
                </div>
                <div className='col w-100 d-flex justify-content-center align-items-center'>
                <button type="button" class="btn btn-danger zoom" onClick={()=>OnClickDelete(content._id)}>Delete</button>
                </div>
              </div>
              )}
               {reqStatus===0 &&(
              <div className='row'>
                <div className='col w-100 d-flex justify-content-center align-items-center '>
                <button disabled type="button" onClick={()=>handleClickOpen(content)}class="btn btn-info zoom">Full Details</button>
                </div>
                <div className='col w-100 d-flex justify-content-center align-items-center'>
                <button disabled type="button" class="btn btn-success zoom" onClick={()=>ReconsiderHandler(content.email)}>Reconsider</button>
                </div>
                <div className='col w-100 d-flex justify-content-center align-items-center'>
                <button disabled type="button" class="btn btn-danger zoom" onClick={()=>OnClickDelete(content._id)}>Delete</button>
                </div>
              </div>
                )}
                
                {/* <button type="button" class="btn btn-outline-danger" onClick={()=>DenyHandler(content.email)} >Deny</button> */}
            </td>
		</tr>

    
         ))}
         


	</table>

  <div className='ps-2'>Page No:</div>
                <div style={{display:"flex"}}>
                  {Array.from({ length: Math.ceil(denieddata.length / itemsPerPage) }, (_, index) => (
                    <div >
                      {currentdeniedPage === (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "#003A69", borderBlockColor: "none",color:"#fff" }} key={index} onClick={() => goTodeniedPage(index + 1)}>
    {index + 1}
  </button>
)}
 {currentdeniedPage != (index + 1) && (
  <button className='page_nos m-1 p-2 border rounded zoom' style={{ background: "white",borderBlockColor: "none",color:"#003A69" }} key={index} onClick={() => goTodeniedPage(index + 1)}>
   {index + 1}
  </button>
)}

                    </div>
                   
                  ))}
                </div>
</section>

             
<div>
  
            {/* <button onClick={handleClickOpen}>Open popup</button> */}
            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup" >

                            <div>

<div class=" mt-4">
{/* <h1 >X</h1> */}
<i class="fa fa-times fa-2x bg-light rounded p-1 mb-2" aria-hidden="true" onClick={closePopup}  style={{color:"black"}}></i>
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="text-center">
                    <a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${indContent.user_photo}`} target='_blank'><Image style={{width: "80px", height:"80px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={indContent.user_photo} /></a>
                        {/* <img src="profile-image.jpg" alt="Profile Image" class="img-fluid rounded-circle"></img> */}
                    </div>
                    <div class="">
                        <h5 class="card-title">Volunteer Information</h5>
                        <table class="table table-bordered">
                            <tbody>
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
                                    <td class="card-text-label bg-light">State</td>
                                    <td class="text-light">{indContent.state}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">District</td>
                                    <td class="text-light">{indContent.District}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Address</td>
                                    <td class="text-light">{indContent.address}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Position</td>
                                    <td class="text-light">{indContent.position}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Blood Donar</td>
        
                                    {/* <td class="text-light">{indContent.Blood_donor}</td> */}
                                    <td class="text-light">{indContent.Blood_grp !== '' ? 'yes' : 'no'}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Blood Group</td>
                                    <td class="text-light">{indContent.Blood_grp !== '' ? indContent.Blood_grp : '-'}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Additional Information</td>
                                    <td class="text-light">{indContent.additionalInfo !== '' ? indContent.additionalInfo: '-'}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Gender</td>
                                    <td class="text-light">{indContent.Gender}</td>
                                </tr>
                                <tr>
                                    <td class="card-text-label bg-light">Profession</td>
                                    <td class="text-light">{indContent.Profession}</td>
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

            
  )
}