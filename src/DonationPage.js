import React from 'react'
import {useContext,useState,useEffect} from 'react'
import "./Home.css"
// import './Popup.css'
import axios from 'axios';
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react';
import { ThreeDots,TailSpin } from 'react-loader-spinner';
// import React from 'react'

export default function DonationPage() {
    const [image1UploadStatus,setImage1UploadStatus]=useState("");
    const [image1Selected,setImage1Selected]=useState("");
    const [image1Url,setImage1Url]=useState("");
    const [datastatus1,setDatastatus1]=useState(false);
    const [resstatus,setResStatus]=useState(-1);
    const [qrCodeScan,SetqrCodeScan]=useState("");
    const [data,setData]=useState([]);
    const [events,setEvents]=useState([]);
    const [navbarDisplay,setNavbarDisplay]=useState(false);

    const [info,setInfo]=useState({
      name:'',
      email:'',
      phoneNumber:'',
      transactionId:'',
      paymentMethod:'',
      amount:0,
      // qrCodeScan:'',
      additionalInformation:''
  })
  const ChangeHandler=(e)=>{
    // console.log(e.target.name+" : "+e.target.value);
    setInfo({...info,[e.target.name]:e.target.value});
  }

  const navToggle=()=>{
    const navToggler = document.querySelector(".nav-toggler");
  // navToggler.addEventListener("click", navToggle);
    navToggler.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("open");
    if(nav.classList.contains("open")){
      nav.style.maxHeight = nav.scrollHeight + "px";
    }
    else{
      nav.removeAttribute("style");
    }
  }
  const navbarStyle = {
    top: '0',
    zIndex: '999',
    position: navbarDisplay ? 'sticky' : 'static', // Set position to sticky when navbarDisplay is true, otherwise, set it to static
  };
    const DonationHandler= async (e)=>{
        e.preventDefault();
        // console.log(info);
        //  await upload1Image();
        setResStatus(0);
        setImage1UploadStatus("uploading....");
        // console.log(image1Selected);
        const formData=new FormData();
        formData.append("file",image1Selected);
        formData.append("upload_preset",process.env.REACT_APP_CLOUDINARYPRESET);
  
        axios.post(`${process.env.REACT_APP_CLOUDINARYURL}`,formData).then((res)=>{
          // console.log(res);
          // console.log(res.data.public_id);
          
          if(res.data.public_id)
            {
            setImage1Url(res.data.public_id);
            // setImage1UploadStatus("Done!!");
          
            // if((res.data.public_id) && (image1UploadStatus==="Done!!")){
              // console.log("Done status is recieved!!");
              // console.log(res.data.public_id)
              // setInfo(prevInfo => ({
              //   ...prevInfo,
              //   qrCodeScan: res.data.public_id
              // }));
              // setInfo({ ...info,["qrCodeScan"]:res.data.public_id});
              // setInfo(prevInfo => {
              //   return {
              //     ...prevInfo,
              //     amount: 400, // Assigning a value of 100 to 'amount'
              //   };
              // });
              // SetqrCodeScan(res.data.public_id);
              // console.log(info);
              // console.log(res.data.public_id);
              // console.log(qrCodeScan);
          //     name:'',
          // email:'',
          // phoneNumber:'',
          // transactionId:'',
          // paymentMethod:'',
          // amount:0,
          // // qrCodeScan:'',
          // additionalInformation:''
          axios.post(`${process.env.REACT_APP_BACKENDAPI}/donationrecords`, {
            name: info.name,
            email: info.email,
            phoneNumber: info.phoneNumber,
            transactionId: info.transactionId,
            paymentMethod: info.paymentMethod,
            amount: info.amount,
            additionalInformation: info.additionalInformation,
            qrCodeScan: res.data.public_id
          }).then((res) => {
            var inputFields = document.getElementsByClassName("input_field");
            for (var i = 0; i < inputFields.length; i++) {
              inputFields[i].value = "";
            }
          
            // alert("Your contribution will help many to have a smile on their faces. Thank you for the Donation!!");
            setResStatus(1);
            setInfo({
              name: '',
              email: '',
              phoneNumber: '',
              transactionId: '',
              paymentMethod: '',
              amount: 0,
              additionalInformation: ''
            });
          });
          
            }
          // }
          
        })
        //  console.log("uploaded");
          // if(image1UploadStatus==="Done!!"){
          //   console.log("---------"+ image1UploadStatus +"------------");
          //   setInfo({...info,["qrCodeScan"]:image1Url});
          //   console.log("++++++++++++++++++++++++"+info.qrCodeScan+"++++++++++++++++++");
          //   console.log("++++++++++++++++++++++++"+image1Url+"++++++++++++++++++");
          //   axios.post("${process.env.REACT_APP_BACKENDAPI}/donationrecords",info).then(
          //     console.log("done"));
          //     setInfo({ ...info,
          //       name:'',
          //       email:'',
          //       phoneNumber:'',
          //       transactionId:'',
          //       paymentMethod:'',
          //       amount:0,
          //       qrCodeScan:'',
          //       additionalInformation:''
          //      });
          // }
          // axios.get('${process.env.REACT_APP_BACKENDAPI}/donationrecords').then(res=>{setdata(res.data);console.log(data)}).catch((err)=>console.log(err));
          
        // axios.get("${process.env.REACT_APP_BACKENDAPI}/donationrecords").then(res => {console.log(res);});
        }
  return (
    <div>
<header className="header" style={navbarStyle}>
  <div className="container">
    <div className="roww align-items-center justify-content-between">
      <div className="logo">
        {/* <a href="#">logo</a> */}
        <a href="/"><img width={48}  src="./pictures/SUNNGOBremovedwhitetext.png" class="pb-0 me-2"></img>SUN</a>
      </div>
      <button type="button" className="nav-toggler" onClick={navToggle}>
        <span/>
      </button>
      <nav className="nav">
        <ul className='m-0'>
          <li>
            <a href="/" className="active">
              Home
            </a>
          </li>
          {/* <li>
            <a href="#about_div">About Us</a>
          </li>
          <li>
            <a href="#getinvolved_div">Get Involved</a>
          </li>
          <li>
            <a href="#initiatives_div">Initiatives</a>
          </li> */}
          <li>
            <a href="#contact_div">Contact Us</a>
          </li>
           <li>
          <a href="/volunteerapplication">Volunteer</a>
          
            {/*<Link to='/volunteerapplication'>
              <a>Become a Volunteer</a>
            </Link>*/}
          </li> 
          <li>
            <a href="donationpage"  style={{backgroundColor:'none'}}>
              <button style={{ backgroundColor: "#fff",border:"none" }} className='rounded px-3 py-2'>
                Donate Now
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
<br></br>
<br></br>
{resstatus===-1 && (
  
      <section className="payment_section text-center" id="donate">
        {/* <div id="donate_div" style={{paddingTop:"100px"}}></div> */}

  <div className="payment_section_div1" >
    <img src="./pictures/NGOQR.png" className=" bounce" style={{ width: 260 }} />
  </div>
  <div
    className="payment_section_div2  "
    style={{ paddingLeft: '6%', paddingRight: '6%' }}
   
  >
    <h1 style={{ fontWeight: 900, fontFamily: 'poppins,sans-serif' }}>
      Donate
    </h1>
    <br />
    <h6>
      Remember that the happiest people are not those <br />
      getting more, but those giving more.
    </h6>
    {/* <a href="NGOQRsmlpic.jpg" class="flex justify-center items-center p-3 px-6 w-max bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all ease-in-out duration-100 sm:scale-100 m-1.5" target="_blank" rel="noopener noreferrer" download="" style="background-color:black;">Download QR&nbsp;</a> */}
    <br />
    <img src="./pictures/NGOQRsmlpic.jpg" style={{ width: 220 }} />
    <br />
    <br />
    <p style={{ color: 'gray', paddingBottom: 20 }}>
      Please fill out the form if you have made the payment.
    </p>
    <div className="zoomm">
      <a
        href="pictures/NGOQRsmlpic.jpg"
        className="p-3 rounded "
        target="_blank"
        rel="noopener noreferrer"
        download
        style={{ backgroundColor: '#003A69', color: '#fff' }}
      >
        {' '}
        Download QR <i className="fa fa-download px-2" aria-hidden="true" />
      </a>
    </div>
  </div>
  <div
    className="payment_section_div3  m-0 p-4"
    style={{ paddingLeft: '10%' }}
    
  >
    <h3
      style={{
        fontWeight: 900,
        fontFamily: 'poppins,sans-serif',
        paddingBottom: '4%',
      }}
    >
      Payment Details Form
    </h3>
    <p style={{ color: 'gray' }}>
      Please fill out the form if you have made the payment.
    </p>

    <form className="m-0" onSubmit={DonationHandler}>
      <div className="row">
        <div className="form-floating col p-2">
          <input
            className="p-3 ps-4 border-dark rounded w-100 zoomm form-control input_field"
            type="string"
            placeholder="Name"
            style={{ backgroundColor: 'white' }}
            name='name'
            onChange={ChangeHandler}
            required
          />
        <label htmlFor="floatingEmail" className='px-3'> Name<span className="text-danger">*</span></label>
        </div>
        <div className="form-floating col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="email"
            placeholder="Email"
            style={{ backgroundColor: 'white' }}
            name='email'
            onChange={ChangeHandler}
            required

          />
           <label htmlFor="floatingEmail" className='px-3'>Email<span className="text-danger">*</span></label>
        </div>
      </div>
      <div className="row">
        <div className="form-floating col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="number"
            placeholder="Mobile Number"
            style={{ backgroundColor: 'white' }}
            name='phoneNumber' 
            onChange={ChangeHandler}
            required
          />
           <label htmlFor="floatingEmail" className='px-3'>PhoneNumber<span className="text-danger">*</span></label>
        </div>
        <div className="form-floating  col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="string"
            placeholder="Transaction ID"
            style={{ backgroundColor: 'white' }}
            name='transactionId'
            onChange={ChangeHandler}
            required
          />
           <label htmlFor="floatingEmail" className='px-3'>Transaction ID<span className="text-danger">*</span></label>
        </div>
      </div>
      <div className="row">
        <div className="form-floating  col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="string"
            placeholder="PayMethod(phnpay/gpay/others)"
            style={{ backgroundColor: 'white' }}
            name='paymentMethod'
            onChange={ChangeHandler}
            required
          />
           <label htmlFor="floatingEmail" className='px-3'>Payment Method<span className="text-danger">*</span></label>
        </div>
        <div className="form-floating col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="number"
            placeholder="Amount"
            style={{ backgroundColor: 'white' }}
            name='amount'
            onChange={ChangeHandler}
            required
          />
          <label htmlFor="floatingEmail" className='px-3'>Amount<span className="text-danger">*</span></label>
        </div>
      </div>
      <div className="row">
        <div className="form-floating col p-2">
          <input
            className="p-3 rounded w-100 zoomm form-control input_field"
            type="file"
            placeholder="Upload ScreenShot"
            style={{ backgroundColor: 'white', border: '1px solid black' }}
            name='qrCodeScan'
            accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage1Selected(e.target.files[0])}}
            required
          />
          {/* <label htmlFor="floatingEmail" className='px-3'>Payment Method</label> */}
        </div>
        <div className="form-floating  col p-2">
          <input
            className="p-3 border-dark rounded w-100 zoomm form-control input_field"
            type="string"
            placeholder="Additional Information"
            style={{ backgroundColor: 'white' }}
            name='additionalInformation'
            onChange={ChangeHandler}
          />
          <label htmlFor="floatingEmail" className='px-3'>Additional Info</label>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded zoomm "
        style={{ backgroundColor: '#003A69', color: '#fff', marginTop: '6%' ,
        }} 
      >
        Save
      </button>
      {/* <input type="email" placeholder="Email"> */}
    </form>

 
  </div>
</section>
    ) }
{resstatus===0 && ( 
            <div className="centered-content_payment" style={{ backgroundColor: '#f0f4fb' }}>
              <div className=" me-2 mt-0">
                <ThreeDots height="40" width="100" color="black" ariaLabel="loading" />
              </div>
              {/* <p>Thank you for your request. We are currently processing it. Please do not refresh the page</p> */}
            </div>
          )}
{resstatus===1 && ( 
            <div className="centered-content_payment text-center" style={{ backgroundColor: '#f0f4fb' }}>
              <section>
              <div className="text-center me-2 mt-0">
              <i class="fa fa-smile-o  fa-4x" style={{color:"#003A69"}} aria-hidden="true"></i>
              </div>
              <br>
              </br>
              <p>Your contribution will help many to have a smile on their faces.</p> 
              <p>Thank you for the Donation!!</p>
              <center>
              <button  className="btn  zoommm p-4 py-2 border-none text-center" style={{backgroundColor:"#003A69", color:"#fff"}} onClick={()=>{setResStatus(-1)}}>Ok</button>
              </center>
              
              </section>

            </div>
          )}
    
    <section
  id="footer"
  className=" py-4 mb-0 "
  style={{ backgroundColor: '#003A69', color: '#fff' }}
>
  <div className="wave-2">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="shape-fill"
      />
    </svg>
  </div>
  <div className="section-title mb-4 mb-lg-0" id="contact_div" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
    <h1 className='m-2 mt-lg-0'>Contact Us</h1>
    <br />
    <br />
    <div class=" ms-2 ps-2 ms-lg-4 ps-lg-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
            <div className='fisr_div_footer' style={{textAlign:'left'}}>
            <h4 className='mb-4'>FIND US ON</h4>
            <a
                    className="text"
                    href="mailto:xyz@gmail.com"
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <img 
                        src="./pictures/mail.png"
                        alt="...."
                       
                        className="img_size m-1 "
                    />
                    Mail
                </a>
    <br />
    <a
      className="text"
      href="https://www.facebook.com/profile.php?id=100087419500577"
      style={{ textDecoration: "none", color: "white" }}
    >
      <img
        src="https://i.ibb.co/cQzLTC1/icons8-facebook-48.png"
        alt="...."
        
        className="img_size m-1"
      />
      Facebook
    </a>
    <br />
    <a
      className="text"
      href="https://www.instagram.com/ajayfromayejude/"
      style={{ textDecoration: "none", color: "white" }}
    >
      <img
        src="https://i.ibb.co/mS1xsCq/Pngtree-instagram-icon-8704817.png"
      
        className="img_size m-1"
      />
      Instagram
    </a>
    <br />
    <a
      className="text"
      href="https://www.youtube.com/ayejude"
      style={{ textDecoration: "none", color: "white" }}
    >
      <img
        src="https://i.ibb.co/3cMbk7H/icons8-youtube-48.png"
     
        className="img_size m-1 "
      />
      Youtube
    </a>
    <br />
            </div>
        </div>
        <div class='img_icon_footer p-2  px-lg-2 ms-lg-0 me-lg-0 ps-lg-0 p-lg-0'>
            <img
                className=" img-fluid   p-1 p-lg-3  bg-light"
                src="./pictures/SUNNGOwithBG.jpg"
                alt=""
                style={{borderRadius:"20%"}}
            />
        </div>
        <div className=''>
            <div style={{textAlign:'left'}}>
            <h4 className='mb-4' >OUR LOCATIONS</h4>
<h6>SATTENAPALLI</h6>
<h6>GUNTUR</h6>
<h6>MANGALAGIRI</h6>

            </div>
        </div>
    </div>
</div>

</section>

    </div>
  )
}