import React from 'react'
import {useContext,useState,useEffect} from 'react'
import axios from 'axios'
import {Image} from 'cloudinary-react';
import {store} from './App'
import {ThreeDots} from 'react-loader-spinner';
// import dotenv from 'dotenv';

// dotenv.config();
// require('dotenv').config();

export default function CarouselManagement() {
  const [token,setToken]=useContext(store);
  const [data,setdata]=useState([]);
  const [marquee,setMarquee]=useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [info,setInfo]=useState({
    // username:'',
    Main_text:'',
    Sub_text:'',
    filechoosen:''
    // confirmpassword:''
})
const [einfo,esetInfo]=useState({
  // username:'',
  id:'',
  E_Main_text:'',
  E_Sub_text:'',


  // confirmpassword:''
})
var Sno=0;
const [image1UploadStatus,setImage1UploadStatus]=useState("");
const [image1Selected,setImage1Selected]=useState("");
const [image1Url,setImage1Url]=useState("");
const [datastatus,setDatastatus]=useState(false);
  // const [denieddata,setDenieddata]=useState([]);
  // const [selectedOption, setSelectedOption] = useState('Select');
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKENDAPI}/getslides`).then(res=>{setdata(res.data);setDatastatus(true);
      // console.log(res.data)
    }).catch((err)=>console.log(err));
})

const ChangeHandler=(e)=>{
  setInfo({...info,[e.target.name]:e.target.value});
}
const E_ChangeHandler=(e)=>{
  // console.log(e.target.name+" : "+e.target.value);
  esetInfo({...einfo,[e.target.name]:e.target.value});
}

 const SubmitHandler=e=>{
  e.preventDefault();
  // console.log(info);
   
  info.filechoosen=image1Url;
  setInfo({...info,filechoosen:image1Url});
  // console.log(info.filechoosen+"----------------");
  // console.log(info);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/addslides`,info,{headers:{
    'x-token':token
}}).then(
    arr=>{setdata(arr.data);
      setInfo({
        Main_text:'',
        Sub_text:'',
        filechoosen:''
      });
      setImage1UploadStatus("");
      setImage1Selected("");
      setImage1Url("");
    document.getElementById("exampleFormControlInput1").value="";
    document.getElementById("exampleFormControlTextarea1").value="";
    document.getElementById("inputGroupFile02").value="";
    // document.getElementById("exampleFormControlInput4").value="";
    // document.getElementById("inputGroupFile02").value="";
    setImage1UploadStatus("");
    // arr=>console.log(arr.data),
    }
  )
 }

 const SubmitHandler2=(e)=>{
  e.preventDefault();
  // console.log()
  // console.log(einfo);
  console.log(marquee);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/updatemarqueecontent`,{marquee},{headers:{
    'x-token':token
}}).then(
    // closePopup()
    console.log("done!!")
  )


 }
 const EditHandler=e=>{
  e.preventDefault();
  // console.log()
  // console.log(einfo);
  axios.post(`${process.env.REACT_APP_BACKENDAPI}/updatecarousel`,einfo,{headers:{
    'x-token':token
}}).then(
    closePopup()
  )


 }
//  const SubmitHandler=(e)=>{
//   e.preventDefault();
//   // console.log(data);
//   axios.post('${process.env.REACT_APP_BACKENDAPI}/login',data).then(
      
//       res=>{
//           console.log(res.data.token);
//           setToken(res.data.token)
//       }

          
//   )
// }

const [popup,setPop]=useState(false)
  const handleClickOpen=(content)=>{
      
      // console.log(content);
      // esetInfo({...einfo,["E_Title"]:content.Title});
      // esetInfo({...einfo,["E_Location"]:content.Location});
      // esetInfo({...einfo,["E_OrganisedBy"]:content.OrganisedBy});
      // esetInfo({...einfo,["E_filechoosen"]:content.filechoosen});

      esetInfo({ ...einfo,["id"]:content._id , ["E_Main_text"]: content.Main_text, ["E_Sub_text"]: content.Sub_text });

    
    
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
    setIsDisabled(true);
    axios.post(`${process.env.REACT_APP_BACKENDAPI}/deletecarousel`,{id},{headers:{
      'x-token':token
  }}).then((res)=>{setIsDisabled(false);});
  }

 const upload1Image=(e)=>{
  e.preventDefault();
  setImage1UploadStatus("uploading....");
  // console.log(image1Selected);
  const formData=new FormData();
  formData.append("file",image1Selected);
  formData.append("upload_preset",process.env.REACT_APP_CLOUDINARYPRESET);

 
  // axios.post(process.env.CLOUDINARY_URL,formData).then((res)=>{
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
{token &&

    
    <section class="home-section p-4">
    
        {datastatus?
        <>
    <section>
     
    

  <h4 className='mb-2'>Carousel </h4>
  <table style={{width:"100%", marginBottom:"100px"}} >
    
    <tr>
      <th>S.no</th>
      <th>Main Caption</th>
      <th>Subcaption</th>
      <th>File Choosen</th>
     
           
    </tr>
    {data.map(content => (
    <tr>
      <td>{Sno =Sno + 1}</td>
      <td>{content.Main_text}</td>
      <td>{content.Sub_text}</td>
      {/* ID: {content.filechoosen}  */}
      <td><a href={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/v1693358536/${content.filechoosen}`} target='_blank'><Image style={{width: "100px"}} cloudName={process.env.REACT_APP_CLOUDNAME} publicId={content.filechoosen} /></a></td>
    
            <td>
              <div className='row'>
                <div className='col'>
                <button type="button" class="btn btn-info w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>handleClickOpen(content)} disabled={isDisabled}>Edit</button>
                </div>
                <div className='col'>
                <button type="button" class="btn btn-danger w-100 d-flex justify-content-center align-items-center zoom" onClick={()=>OnClickDelete(content._id)} disabled={isDisabled}>Delete</button>
                </div>
              </div>
                
                
               
            </td>
            
    </tr>
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


  <h4>Add Carousel</h4>
  
  <div className="d-flex justify-content-center align-items-center">
      <form class=" p-4 mb-4 m-4" onSubmit={SubmitHandler} style={{backgroundColor:"#003A69", color:"white", width:"600px", borderRadius:"20px"}}>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Main Caption<span className="text-danger">*</span></label>
      <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="abc" onChange={ChangeHandler} name='Main_text' required></input>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Sub Caption<span className="text-danger">*</span></label>
      <textarea class="form-control p-2" id="exampleFormControlTextarea1" rows="3" placeholder="sub caption"  onChange={ChangeHandler} name='Sub_text' required></textarea>
    </div>
    <div class="input-group mb-3">
      {/* <input type="file" class="form-control" id="inputGroupFile02"></input> */}
      <input type="file"  class="form-control p-2" id="inputGroupFile02" accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage1Selected(e.target.files[0])}} required/>
      <button className='zoom p-2 btn-info' onClick={upload1Image} style={{border:"none", borderEndEndRadius:"5px" ,borderTopRightRadius:"5px"}}>Upload</button>
      <p>{image1UploadStatus}</p>
      {/* <label class="input-group-text" for="inputGroupFile02">Upload</label> */}
    </div>
    <center><button type="submit" class="btn btn-success zoom">Save</button></center>
  </form>
      </div>

<div style={{marginTop:"80px"}}>
<h4 className='' >Marquee</h4>
  
  <div className="d-flex justify-content-center align-items-center">
      <form class=" p-4 mb-4 m-4" onSubmit={SubmitHandler2} style={{backgroundColor:"#003A69", color:"white", width:"600px", borderRadius:"20px"}}>
 
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Content</label>
      <textarea class="form-control p-2" id="exampleFormControlTextarea5" rows="3" placeholder="enter content here !!"  onChange={(e)=>{setMarquee(e.target.value)}} name='content' required></textarea>
      <p className="mt-2" style={{color:"gray"}}>Note : make content field empty to disable the Marquee</p>
    </div>
  
    <center><button type="submit" class="btn btn-success zoom">Save</button></center>
  </form>
  </div>
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
<div class="mt-4">
{/* <h1 >X</h1> */}
{/* <i class="fa fa-times fa-5x" aria-hidden="true" onClick={closePopup}  style={{color:"gray"}}></i> */}
<i class="fa fa-times fa-2x bg-light rounded p-1 mb-2" aria-hidden="true" onClick={closePopup}  style={{color:"black"}}></i>
<div className="d-flex justify-content-center align-items-center">
      <form class=" p-4 mb-4 m-4 zoom" onSubmit={EditHandler}  style={{backgroundColor:"#003A69", color:"white", width:"600px", borderRadius:"20px"}}>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Main Caption</label>
      <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="abc" onChange={E_ChangeHandler}  name='E_Main_text' value={einfo.E_Main_text}></input>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Sub Caption</label>
      <textarea class="form-control p-2" id="exampleFormControlTextarea1" rows="3" placeholder="Sub Caption" onChange={E_ChangeHandler}  name='E_Sub_text' value={einfo.E_Sub_text}></textarea>
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
