import React from 'react'
import {useContext,useState,useEffect} from 'react'
import "./Home.css"
// import './Popup.css'
import axios from 'axios';
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react';
import { ThreeDots,TailSpin } from 'react-loader-spinner';
export default function Home() {

  const [image1UploadStatus,setImage1UploadStatus]=useState("");
  const [image1Selected,setImage1Selected]=useState("");
  const [image1Url,setImage1Url]=useState("");
  const [datastatus1,setDatastatus1]=useState(false);
  const [resstatus,setResStatus]=useState(-1);
  const [qrCodeScan,SetqrCodeScan]=useState("");
  const [data,setData]=useState([]);
  const [events,setEvents]=useState([]);
  const [marquee,setMarquee]=useState("");
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


useEffect(()=>{
  axios.get(`${process.env.REACT_APP_BACKENDAPI}/getslides`).then(res=>{setData(res.data);
    // console.log(res.data)
  }
  ).catch((err)=>console.log(err));
})
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_BACKENDAPI}/getevents`).then(res=>{setEvents(res.data); setDatastatus1(true)}).catch((err)=>console.log(err));
  
})
// const sortItemsByDate = () => {
//   // Use the JavaScript sort method to sort items by date
//   const sorted = [...events].sort((a, b) => a.Title - b.Title);
//   // setSortedItems(sorted);
//   // setEvents(res.data)
//   console.log(sorted);
//   setEvents(sorted);
//   console.log(events);
// };
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_BACKENDAPI}/getmarqueecontent`).then(res=>{setMarquee(res.data.Content);
    console.log(res.data)
  }
  ).catch((err)=>console.log(err));
})
  const ChangeHandler=(e)=>{
    // console.log(e.target.name+" : "+e.target.value);
    setInfo({...info,[e.target.name]:e.target.value});
  }
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
    // axios.get('${process.env.REACT_APP_BACKENDAPI}o.onrender.com/donationrecords').then(res=>{setdata(res.data);console.log(data)}).catch((err)=>console.log(err));
    
  // axios.get("${process.env.REACT_APP_BACKENDAPI}/donationrecords").then(res => {console.log(res);});
  }
  
 
 const upload1Image=()=>{
  // e.preventDefault();
  // console.log("uploading..");
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


const [popup,setPop]=useState(false)
const handleClickOpen=()=>{
    setPop(!popup)
    // console.log(content);
    // setIndContent(content);
}
const closePopup=()=>{
    setPop(false)
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
// const navToggler = document.querySelector(".nav-toggler");
// navToggler.addEventListener("click", navToggle);

// function navToggle() {
 
// } 


// Function to check if the scroll is at the topmost position
function isScrollAtTop() {
  return window.scrollY === 0;
}

// Function to handle the visibility of the button based on scroll position
function handleButtonVisibility() {
  const button = document.querySelector('.floating-button');
  if(button!==null){
    if (isScrollAtTop()) {
      button.style.display = 'none';
    } else {
      button.style.display = 'block';
    }
  }
  
}
function navbarVisibility() {
  const button = document.querySelector('.floating-button');
  
//   const navToggler = document.querySelector(".nav-toggler");
//   // navToggler.addEventListener("click", navToggle);
//     navToggler.classList.toggle("active");
//     const nav = document.querySelector(".nav");
//  if(!nav.classList.contains("open")){

//   }
  // setNavbarDisplay(false);
//  navToggle()



  // setNavbarDisplay(false);
}
// Attach an event listener to the window to call the visibility function on scroll
// window.addEventListener('scroll', navbarVisibility);
// window.addEventListener('scroll', handleButtonVisibility);



const [navbarDisplay,setNavbarDisplay]=useState(false);

const navbarStyle = {
  top: '0',
  zIndex: '999',
  position: navbarDisplay ? 'sticky' : 'static', // Set position to sticky when navbarDisplay is true, otherwise, set it to static
};
  return (
    <div>


<header className="header" style={navbarStyle}>
    <link rel="icon" href="https://drive.google.com/file/d/1YATkhA0vuTGfNFUFCqsITWVAEfsGRYp9/view?usp=sharing">
  <div className="container">
    <div className="roww align-items-center justify-content-between">
      <div className="logo">
        <a href="/"><img width={48}  src="./pictures/SUNNGOBremovedwhitetext.png" class="pb-0 me-2"></img>SUN</a>
      </div>
      <button type="button" className="nav-toggler" onClick={navToggle}>
        <span/>
      </button>
      <nav className="nav">
        <ul className='m-0'>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#about_div">About Us</a>
          </li>
          <li>
            <a href="#getinvolved_div">Get Involved</a>
          </li>
          <li>
            <a href="#initiatives_div">Initiatives</a>
          </li>
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




{/* {navbarDisplay?(
  <button
        className="floating-button"
        onClick={()=>{setNavbarDisplay(false)}}    
      >
        Navbar <i class="fa fa-hand-rock" aria-hidden="true"></i>
      </button>
):(
  <button
        className="floating-button"
        onClick={()=>{setNavbarDisplay(true)}}    
      >
        Navbar <i class="fa fa-hand-paper" aria-hidden="true"></i>
      </button>
)

} */}


      {/* <section style={{ padding: '4%', paddingTop: '4%' }}>
  <div
    id="carouselExampleCaptions"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={0}
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={1}
        aria-label="Slide 2"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={2}
        aria-label="Slide 3"
      />
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="./pictures/21_9_img1.jpg"
          className="d-block w-100 zoomm"
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="./pictures/21_9_img2.jpg"
          className="d-block w-100 zoomm"
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="./pictures/21_9_img3.jpg"
          className="d-block w-100 zoomm"
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section> */}

<section style={{ paddingTop: '0%' }}>
  <div
    id="carouselExampleCaptions"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={0}
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      />
      {/* <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={1}
        aria-label="Slide 2"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={2}
        aria-label="Slide 3"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={3}
        aria-label="Slide"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={4}
        aria-label="Slide 5"
      /> */}
    {data.map((content, index) => (
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to={index+1}
        aria-label={`Slide ${index + 2}`}
        key={index}
      />
    ))}
      
    </div>
    <div className="carousel-inner" style={{backgroundColor:"goldenrod"}}>
      <div className="carousel-item active py-2">
        <img
       
          src="./pictures/mainslide_updated.jpg"
          className="d-block w-100 "
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          <h5>Student Union for Nation</h5>
          <p>Strive for better nation</p>
        </div>
      </div>
      {data.slice().reverse().map((content, index) => (
  <div className="carousel-item py-2" key={index}>
    <img
      src={`http://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${content.filechoosen}`}
      className="d-block w-100 "
      alt="..."
    />
    <div className="carousel-caption d-none d-md-block">
      <h5>{content.Main_text}</h5>
      <p>{content.Sub_text}</p>
    </div>
  </div>
))}

      
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>


<div className="containerhere scroll-right" xxx>
    <span style={{fontWeight:"bold"}}><span style={{ fontWeight: "bold", display: "none" }} className="d-lg-inline">New Articles </span><i class="fa fa-bullhorn mx-2" aria-hidden="true"></i></span>
    <marquee className=" " behavior="" direction="right" style={{color:"red" ,fontWeight:"bold"}}>
      {marquee}
    </marquee>
  </div>
<div id="about_div"></div>
<br></br>
<section className="Aboutus"  >
  <div className="section-title">
    <h1 >About Us</h1>
  </div>
  <div className="container">
  <section className="hero hero-home with-pattern d-flex align-items-center  ">
  <div className="container m-0 p-0 mt-5">
    <div className="row m-0 p-0">
      <div className="col-md-6 mb-5 mb-md-0">
        <h1 className="mb-3 sun_aboutus_subtitle" style={{ textAlign: 'left'}}>
        Student Union for Nation<span className="text-primary"> (SUN)</span> 
        </h1>
        <p style={{ textAlign: 'justify', color: '#999' }}>
    Welcome to the Student Union for Nation (SUN)! We are an NGO based in Guntur, Andhra Pradesh, India, founded by a group of B.Tech students on August 15, 2013. Our mission is to support orphaned children, rural and needy students, and provide aid to the poor and needy during difficult times. We registered as an NGO in May 2014 under registration number 92/2014.
</p>

        <a
          className="video-btn d-flex align-items-center py-md-5"
          href="https://youtu.be/RQu7jpcNUWI" target='_blank'
          data-video-id="B6uuIHpFkuo" style={{color:"#003A69" }}
        >
          <span className="video-btn-icon">
            <i className="fas fa-play" ></i>
          </span>
          <div className="ms-3">
            <span className="text-muted d-block line-height-sm">Watch</span>
            <strong className="text-uppercase text-dark">Intro Video</strong>
          </div>
        </a>
      </div>
      <div className="col-md-5 ml-auto  sun_img_aboutsection" >
        <div className="img-gradient img-gradient-right ps-5" style={{paddingLeft:"440px;"}}>
          <img
            className="img-fluid shadow rounded  " style={{backgroundColor:"white" , padding:"10%"}}
            // src="./pictures/hero-img.jpg"
            src="./pictures/SUNNGOwithBG.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
</section>

<section id="services">
  {/* <div className="wave">
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
  </div> */}
  <div id="services_div"></div>
<br></br>
  <div className="section-title">
    <h1>What we Do</h1>
  </div>
  <div className="p-4 p-lg-4 m-lg-4">
    <div className="row gy-4">
      {/* <div className="col-6 "  data-aos-delay={100}>
        <div className="box ">
          <center className="mt-4">
          <div className="icon ">
          <img
          src="./pictures/SDG1.png"
          className="d-block w-100 zoomm" 
          
          alt="..."
        />
          </div>
          </center>
          <p className="title ">
            
SUN aligns with SDG 1

          </p>
          <p className="description text-left">
          
Supporting financially disadvantaged students by covering their educational expenses, ensuring equal access to quality education for all and fostering a brighter future.
          </p>
        </div>
      </div> */}
      <div className="col-6"  data-aos-delay={200}>
        <div className="box">
        <center>
          <div className="icon ">
          <img
          src="./pictures/SDG1.png"
          className="d-block w-100 " 
          
          alt="..."
        />
          </div>
          </center>
          <p className="title">
          SUN aligns with SDG 1
          </p>
          <p className="description">
          Supporting financially disadvantaged students by covering their educational expenses, ensuring equal access to quality education for all and fostering a brighter future.
          </p>
        </div>
      </div>
      <div className="col-6"  data-aos-delay={200}>
        <div className="box">
        <center>
          <div className="icon ">
          <img
          src="./pictures/SDG3.png"
          className="d-block w-100 zoomm" 
          
          alt="..."
        />
          </div>
          </center>
          <p className="title">
            SUN aligns with SDG 3
          </p>
          <p className="description">
          Addressing the needs of migrant laborers during challenging times and collaborating with the government to provide support
Celebrating orphan children's birthdays and organizing medical camps in children's homes and old age homes
          </p>
        </div>
      </div>
      <div className="col-6"  data-aos-delay={300}>
        <div className="box">
        <center>
          <div className="icon ">
          <img
          src="./pictures/SDG4.png"
          className="d-block w-100 zoomm" 
          
          alt="..."
        />
          </div>
          </center>
          <p className="title">
           SUN aligns with SDG 4
          </p>
          <p className="description">
          Providing career guidance and scholarships to empower students and promote education
Promoting scientific knowledge and curiosity among students through science fairs
          </p>
        </div>
      </div>
      <div className="col-6"  data-aos-delay={400}>
        <div className="box">
        <center>
          <div className="icon  ">
          <img
          src="./pictures/SDG10.png"
          className="d-block w-100 zoomm" 
          
          alt="..."
        />
          </div>
          </center>
          <p className="title">
            SUN aligns with SDG 10
          </p>
          <p className="description">
          Promoting scientific knowledge and curiosity among students through science fairs<br></br>
          Supporting visually challenged students in their educational pursuits by acting as scribes during exams
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<section className='pb-4'>
<div id="getinvolved_div"></div>
<br></br>
<div className="section-title" id="getinvolved">
    <h1>Get Involved</h1>
  </div>
<section className="getinvolved h-25" >
  {/* <div class="wave">
<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path
    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
    class="shape-fill"></path>
</svg>
    </div> */}
  {/* <section  class="getinvolved_content " data-aos="fade-up" > */}

  <a href="/volunteerapplication" className="card_getinvolved">
    
    <i className="icon_getinvolved fas fa-users"  />
    <p className="m-0 mt-3 mt-lg-4 " >Become a Volunteer</p>
    
  </a>
  <a  href="donationpage" className="card_getinvolved  ">
    {/* <div class="overlay"></div> */}
    {/* <div class="circle"> */}
    <i className="icon_getinvolved fas fa-hands-helping"  />
    <p className="m-0 mt-3 mt-lg-4 ">Donate to Support</p>
  </a>
  <a id='Connect_to_us' href="mailto:chegu.mani2020@gmail.com" className="card_getinvolved ">
  {/* <i className="icon_getinvolved fas fa-handshake"  /> */}
  <i class="icon_getinvolved fa fa-envelope  " aria-hidden="true"></i>

  <p className="mt-4">Connect to us</p>

</a>
 
</section>
</section>
<div id="achievements_div"></div>
<br></br>
<div>
{/* <section id="achievements" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
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
  <div className="section-title-secondary text-light">
    <h1>Achievements</h1>
  </div>  
  <div className="container text-light">
    <p>yet to be added</p>
    Over the years, SUN has made significant contributions to society. Some of our major achievements include:

    <ul>
    <li>Conducted career guidance sessions in more than 85 government schools, benefiting 4,500 students.</li>
    <li>Acted as scribes for visually disabled and visually impaired students during their exams.</li>
    <li>Promoted scientific temper among students through science fairs across schools.</li>
    <li>Provided financial support to 136 students, including single-parent children, visually impaired and physically challenged individuals, and those in need.</li>
    <li>Donated 10,000 notebooks to various government schools.</li>
    <li>Offered assistance to migrant laborers by providing more than 6,000 meals during the lockdown.</li>
    <li>Worked closely with the government, serving as supporting staff in general hospitals and public areas.</li>
    <li>Celebrated orphan kids' birthdays to bring smiles to their faces.</li>
    <li>Organized medical camps in children's homes (orphanages) and old age homes.</li>
    <li>Running a monthly student magazine named Viganana Deepika, created by students for students.</li>
  </ul>
  </div>
</section> */}


</div>

<div></div>

<div id="initiatives_div"></div>
<br></br>
<section id="initiatives" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
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
  <div className="section-title-secondaryy m-0">
    <h1 className='initiatives_title'>Our Initiatives</h1>
  </div>
 

  {datastatus1 ? (
<div className="m-0 p-0">

  <div className="container_initiatives m-0 py-4 p-lg-0 py-lg-4 h-75 h-lg-0">
    {/* {events.map(content => (
  moment(content.Timings).format('YYYY-MM-DD HH:mm:ss ') >= moment().format('YYYY-MM-DD HH:mm:ss ')&& (
    <div className="px-4 mt-0" >

      <div className="card-hover rounded mt-0" >
      <img
          src="./pictures/event145.jpg"
          alt=".."
        />
        <div className="card-hover__content" >
          <h3 className="card-hover__title">{content.Title}</h3>
          <div className="on_hover_display">
            <div className="row on_hover_flex_content  p-lg-0">
              
              <div
                className="col p-2 m-2 rounded text-center pt-3 on_hover_flex_content_inner_div"
                style={{ color: '#003A69', backgroundColor: '#fff' }}
              >
              <a href={content.Location} style={{ color: "#003A69" }} target='_blank'>
                <i  className="fas fa-map-marker-alt fs-4" />
                <p >Location</p>
                 </a>
              </div>
             
              <div
                className="col p-2 m-2 rounded  pt-3"
                style={{ color: '#003A69', backgroundColor: '#fff' }}
              >
             
                <h6 style={{fontWeight:"bold"}}>Date :</h6>
                <p className='loc_setter'>{moment(content.Timings).format('DD-MM-YY')}</p>
                <p className='loc_setter'>{moment(content.Timings).format('HH:mm')}</p>
              </div>
            </div>
            <div
              className="col rounded p-2   mb-4 org_details"
              style={{ color: '#003A69', backgroundColor: '#fff' }} 
            >
              <h6>Organiser Details:</h6>
              <div className="row ">
                <div>
                  <i className="fas fa-user-alt p-2" style={{ fontSize: 20 }} />
                  {content.OrganisedBy}
                </div>
                <div>
  <a  href="tel:{content.phone}" style={{ color: "#003A69" }} >
    <i className="fa fa-phone p-2" aria-hidden="true" />
    {content.phone}
  </a>
</div>
              </div>
            </div>
          </div>
          <div className="container text-center" >
            <a  href="/donationpage" className="button">
              Donate Now
            </a>
           
          </div>
          
          
        </div>
        
        <div className="card-hover__extra">
          <h4>
            Learn <span>now</span> and get <span>40%</span> discount!
          </h4>
          
        </div>
        <img
          src={`http://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${content.filechoosen}`}
          alt=".."
        />
      </div>
    </div>
 
 )))} */}


{events
  .filter(content =>
    moment(content.Timings).format('YYYY-MM-DD HH:mm:ss') >=
    moment().format('YYYY-MM-DD HH:mm:ss')
  )
  .sort((a, b) => moment(a.Timings) - moment(b.Timings)) // Sort events by date
  .map(content => (
    <div className="px-4 mt-0" key={content.id}>
      <div className="card-hover rounded mt-0">
        <img src="./pictures/event145.jpg" alt="..." />
        <div className="card-hover__content">
          <h3 className="card-hover__title">{content.Title}</h3>
          <div className="on_hover_display">
            <div className="row on_hover_flex_content p-lg-0">
              <div
                className="col p-2 m-2 rounded text-center pt-3 on_hover_flex_content_inner_div"
                style={{ color: '#003A69', backgroundColor: '#fff' }}
              >
                <a href={content.Location} style={{ color: "#003A69" }} target='_blank'>
                  <i className="fas fa-map-marker-alt fs-4" />
                  <p>Location</p>
                </a>
              </div>
              <div
                className="col p-2 m-2 rounded pt-3"
                style={{ color: '#003A69', backgroundColor: '#fff' }}
              >
                <h6 style={{ fontWeight: "bold" }}>Date :</h6>
                <p className='loc_setter'>{moment(content.Timings.slice(0,-5)).format('DD-MM-YY ')}</p>
                <p className='loc_setter'>{moment(content.Timings.slice(0,-5)).format('hh-mm a')}</p>
              </div>
            </div>
            <div
              className="col rounded p-2 mb-4 org_details"
              style={{ color: '#003A69', backgroundColor: '#fff' }}
            >
              <h6>Organiser Details:</h6>
              <div className="row">
                <div>
                  <i className="fas fa-user-alt p-2" style={{ fontSize: 20 }} />
                  {content.OrganisedBy}
                </div>
                <div>
                  <a href={`tel:${content.phone}`} style={{ color: "#003A69" }}>
                    <i className="fa fa-phone p-2" aria-hidden="true" />
                    {content.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <a href="/donationpage" className="button">
              Donate Now
            </a>
          </div>
        </div>
        <div className="card-hover__extra">
          <h4>
            Learn <span>now</span> and get <span>40%</span> discount!
          </h4>
        </div>
        <img
          src={`http://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${content.filechoosen}`}
          alt="..."
        />
      </div>
    </div>
  ))
}

  </div>


  </div>
 ) : (
    <div className="centered-content_initiatives " style={{ backgroundColor: 'none'  }}>
                <div className="spinner-container ">
                  <ThreeDots height="200" width="100" color="white " ariaLabel="loading" />
                </div>
              </div>
            )} 
</section>

{
  /* Teams */
}

<section id="team" className="team animate__animated animate__fade-up" >
  <div className="wave">
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
  <div id="team_div"></div>
<br></br>
  <div className="section-title mt-5 mb-5">
    <h1>Team</h1>
  </div>
  <div className="p-lg-4 m-4">
    <div className="row">
      <div className="col-6 col-lg-3  d-flex flex-column align-items-stretch">
        <div className="member">
        <img
            // src="https://online-english.biz.ua/img/img_folder08/8_Business-Manager.jpg"
            src="./pictures/President.jpg"
            alt
          />
          <h4>President</h4>
          <span className='des_text'>Mr. P. Mallikarjun</span>
        </div>
      </div>
      <div className="col-6 col-lg-3 d-flex flex-column align-items-stretch">
        <div className="member">
          <img
            src="./pictures/Secretary.jpg"
            alt
          />
          <h4>Secretary</h4>
          <span className='des_text'>Mr. L. Pawan Kumar</span>
        </div>
      </div>
      <div className="col-6 col-lg-3 d-flex flex-column align-items-stretch">
        <div className="member">
        <img
            src="./pictures/Treasurer.jpg"
            alt
          />
          <h4>Treasurer</h4>
          <span className='des_text'>Mr. K. Yaswanth</span>
        </div>
      </div>
      <div className="col-6 col-lg-3 d-flex flex-column align-items-stretch">
        <div className="member">
        <img
            src="./pictures/Coordinator.jpg"
            alt
          />
          <h4>Co-ordinator</h4>
          <span className='des_text'>Mr. K. Sai Kumar</span>
        </div>
      </div>
    </div>
  </div>
</section>
{/* <div id="donationpage" style={{paddingTop:"100px"}}></div>
<br></br>
<section className="payment_section text-center" id="donate">
  <div className="payment_section_div1" >
    <img src="./pictures/NGOQR.jpg" className=" bounce" style={{ width: 260 }} />
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
    className="payment_section_div3  m-0 p-2"
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
    {resstatus===-1 && (
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
     
    </form>
    ) }
    {resstatus===0 && ( 
            <div className="centered-content_payment" style={{ backgroundColor: '#f0f4fb' }}>
              <div className=" me-2 mt-0">
                <TailSpin height="60" width="100" color="#003A69" ariaLabel="loading" />
              </div>
              <p>Thank you for your request. We are currently processing it. Please do not refresh the page</p>
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
              <p>Thank you for the Application!!</p>
              <center>
              <button  className="btn  zoommm p-4 py-2 border-none text-center" style={{backgroundColor:"#003A69", color:"#fff"}} onClick={()=>{setResStatus(-1)}}>Ok</button>
              </center>
              
              </section>

            </div>
          )}
    
  </div>
</section> */}

<div className='footer_padding' ></div>
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
<h6>GUNTUR</h6>
<h6>SATTENAPALLI</h6>
<h6>MANGALAGIRI</h6>
<h6><i class="fa fa-phone-square  mt-lg-4" aria-hidden="true"></i> +91 72075 66702</h6>
            </div>
        </div>
    </div>
</div>
<p className="f-copy text-center">
        <i className="fa fa-code" aria-hidden="true"></i> Developed by{' '}
        <a href="https://manichegu.onrender.com/" target="_blank">
          ManiChegu & Team
        </a>
      </p>
</section>



    </div>


  )
}
