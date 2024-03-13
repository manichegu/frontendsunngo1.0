import React from 'react'
import {useContext,useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Home.css"
import { ThreeDots,TailSpin } from 'react-loader-spinner';
// import { set } from 'mongoose';
export default function VolunteerApplication() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isIndian, setIsIndian] = useState(false);
  const [datastatus1, setDatastatus1] = useState(-1);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [isBloodDonar,SetisBloodDonar]=useState(false);
  const [bloodgrp, setBloodgrp] = useState('');
  const [addInfo, setaddInfo] = useState('');
  const [selectedDistrict,SetselectedDistrict]=useState('');
  const [allemails,setAllEmails]=useState([]);
  const [emailstatus,setEmailStatus]=useState(false);
  const [gender, setGender] = useState('');
  const [Profession, setProfession] = useState('');
  const [user_id, setUser_id] = useState('');
  const [user_photo, setUser_photo] = useState('');
  const [image1Selected,setImage1Selected]=useState("");
  const [image2Selected,setImage2Selected]=useState("");
  const [image1Url,setImage1Url]=useState("");
  const [image2Url,setImage2Url]=useState("");
  const [subbtn,setSubbtn]=useState(true);
  const [navbarDisplay,setNavbarDisplay]=useState(false);

  const states = {
    AndraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
    ArunachalPradesh: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar"],
    Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup (Rural)", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    Goa: ["North Goa", "South Goa"],
    Gujarat: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    JammuKashmir: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
    Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    Karnataka: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"],
    Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    MadhyaPradesh: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    Meghalaya: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    Nagaland: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"],
    Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"],
    Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    TamilNadu: ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    Telangana: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
    Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    UttarPradesh: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar", "Uttarkashi"],
    WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
    AndamanNicobar: ["Nicobar", "North Middle Andaman", "South Andaman"],
    Chandigarh: ["Chandigarh"],
    DadraHaveli: ["Dadra Nagar Haveli"],
    DamanDiu: ["Daman", "Diu"],
    Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    Lakshadweep: ["Lakshadweep"],
    Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"]
  };

    const handleStateChange = (event) => {
      setState(event.target.value);
      // console.log(event.target.value);
      // console.log("-------------"+event.target.value);
      // var optionsList;
      // var htmlString = "";
     

      // if(event.target.value=="AndhraPradesh"){
        // optionsList=AndraPradesh;
        // console.log({state});
        setDistrict(event.target.value)
        SetselectedDistrict(event.target.value);
        // console.log(selectedDistrict);
      // }
      // for(var i = 0; i < optionsList.length; i++){
      //   htmlString = htmlString+"<option value='"+ optionsList[i] +"'>"+ optionsList[i] +"</option>";
      // }
      // $("#inputDistrict").html(htmlString);
      // var ele=document.getElementById("floatingDistrict");
      // ele.innerHTML(htmlString)
    };
  

    const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
        // console.log(content);
    }
    const closePopup=()=>{
        setPop(false)
    }
  
    const handleDistrictChange = (e) => {
      setDistrict(e.target.value);
      // console.log("-------------"+e.target.value);
    };
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
    const handleCountryChange = (event) => {
        // if(india)
      setIsIndian(event.target.value === 'india');
    };
    const handleisBloodDonarChange = (event) => {
        // if(india)
        SetisBloodDonar(event.target.value === 'yes');
    };
    const SubmitHandler=(e)=>{
      e.preventDefault();
      handleClickOpen();
      // setDatastatus1(2);
      // console.log(bloodgrp);
      // console.log("state :"+state);
      // console.log("District :"+district);
      axios.get(`${process.env.REACT_APP_BACKENDAPI}/getallemails`).then((res) => {
        
    
        if ((res.data).includes(String(email))) {
          // console.log("Found!!");
          setDatastatus1(-1);
          setEmailStatus(true);
          closePopup();
        } else {
          var image1,image2;
          // console.log(res.data);
          // console.log(String(email));
          // console.log("Not found!!");
          const form1Data=new FormData();
          form1Data.append("file",image1Selected);
          form1Data.append("upload_preset",process.env.REACT_APP_CLOUDINARYPRESET);
   
          axios.post(`${process.env.REACT_APP_CLOUDINARYURL}`,form1Data).then((res)=>{
            // console.log(res);
            // console.log(res.data.public_id);
            if(res.data.public_id){
              image1=res.data.public_id;
              // console.log("Image1:");
              // console.log(image1);
            // setUser_id(res.data.public_id);
            // console.log(user_id);
            }
          // });
            const form2Data=new FormData();
            form2Data.append("file",image2Selected);
            form2Data.append("upload_preset",process.env.REACT_APP_CLOUDINARYPRESET);

            // axios.post(process.env.REACT_APP_CLOUDINARYURL,form2Data).then((res)=>{
// REACT_APP_CLOUDINARYURL=process.env.REACT_APP_CLOUDINARYURL
// REACT_APP_CLOUDINARYURL=process.env.REACT_APP_CLOUDINARYURL
              axios.post(`${process.env.REACT_APP_CLOUDINARYURL}`,form2Data).then((res)=>{
              // console.log(res);
              // console.log(res.data.public_id);
              if(res.data.public_id){
                // setUser_photo(res.data.public_id);
                // console.log(user_photo);
                image2=res.data.public_id;
              //   console.log("Image1:");
              // console.log(image2);
              }
            
            
            // console.log(user_id);
            // console.log(user_photo);
            // console.log(user_id!=='' && user_photo!=='')
// if(user_id!=='' && user_photo!==''){
                  // closePopup();
          // setDatastatus1(0);
      axios.post(`${process.env.REACT_APP_BACKENDAPI}/applyforvolunteer`, {
        volunteer_name:name,
        sex:"male",
        email:email,
        phone:phone,
        isIndian: isIndian,
        state: state,
        District: district,
        address:address,
        Blood_donar:isBloodDonar,
        Blood_grp:bloodgrp,
        Gender:gender,
        Profession:Profession,
        user_id:image1,
        user_photo:image2,
        additionalInfo:addInfo
      }).then((res) => {
        var inputFields = document.getElementsByClassName("input_field");
        for (var i = 0; i < inputFields.length; i++) {
          inputFields[i].value = "";
        }
        closePopup();
        setDatastatus1(1);
        // if(datastatus1==false){
        //   alert("Your contribution will help many to have a smile on their faces. Thank you for the Application!!");
        // }
        
        // setName('');
        // setEmail('');
        // setPhone('');
        // setIsIndian(false);
        // setState('');
        // setDistrict('');
        // setAddress('');
        // SetisBloodDonar(false)
        // setBloodgrp('');
        // setaddInfo('');
        // setInfo({
        //   name: '',
        //   email: '',
        //   phoneNumber: '',
        //   transactionId: '',
        //   paymentMethod: '',
        //   amount: 0,
        //   additionalInformation: ''
        // });
        setName('');
        setEmail('');
        setPhone('');
        setIsIndian(false);
        setState('');
        setDistrict('');
        setAddress('');
        SetisBloodDonar(false);
        setBloodgrp('');
        setaddInfo('');
        SetselectedDistrict('');
        setEmailStatus(false);
        setGender('');
        setProfession('');
        // console.log("Done!!");
      });

// }
});
});
    }
  });
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

{
  datastatus1===-1 &&

<form className='' style={{padding:"10%", paddingTop:"6%"}} onSubmit={SubmitHandler}>

<h2 className='text-center mb-4'>Volunteer Application</h2>
    <div className='row'>
    <div className='col'>
    <div className="form-floating mb-3 zoommm">
    <input
      type="string"
      className="form-control input_field"
      id="floatingName"
      placeholder="name"
      name="name"
      onChange={(e)=>{setName(e.target.value)}}
      required
    />
    <label htmlFor="floatingEmail">Name<span className="text-danger">*</span></label>
  </div>
    </div>
    <div className='col'>
    <div className="form-floating mb-3 zoommm">
    <input
      type="number"
      className="form-control input_field"
      id="floatingPhone"
      placeholder="1234567890"
      onChange={(e)=>{setPhone(e.target.value)}}
      required
    />
    <label htmlFor="floatingPhone">Phone<span className="text-danger">*</span></label>
  </div>
    </div>
    </div>

    <div className='row'>
    <div className='col'>
  {!emailstatus &&
   <div className="form-floating mb-3 zoommm">
   <input
     type="email"
     className="form-control input_field"
     id="floatingEmail"
     placeholder="name@example.com"
     name='email'
     onChange={(e)=>{setEmail(e.target.value)}}
     required
   />
   <label htmlFor="floatingEmail">Email address<span className="text-danger">*</span></label>
 </div>
  }
    {emailstatus &&
   <div className="form-floating mb-3 zoommm">
   <input
     type="email"
     className="form-control input_field border-danger"
     id="floatingEmail"
     placeholder="name@example.com"
     name='email'
     onChange={(e)=>{setEmail(e.target.value)}}
     required
   />
   <label htmlFor="floatingEmail">Email address<span className="text-danger">*</span></label>
   <p className='text-danger'><i class="fa fa-exclamation-circle" aria-hidden="true"></i>  Please use new mail ID for Application</p>
 </div>
  }
   
    </div>
    <div className='col'>
    <div className="form-floating mb-3 zoommm">
    <select className="form-control input_field" id="floatingCountry" required onChange={handleCountryChange}>
      <option value="" disabled selected>Select country</option>
      <option value="india">India</option>
      <option value="others">Others</option>
      {/* Add more country options as needed */}
    </select>
    <label htmlFor="floatingCountry">Country<span className="text-danger">*</span></label>
  </div>

    </div>
    </div>
    <div className='row'>
    <div className='col'>
    {isIndian && (
    <div className="form-floating mb-3">
      <select className="form-control zoommm input_field" id="floatingState" required onChange={handleStateChange}>
        <option value="" disabled selected>Select state</option>
        {/* <div> */}
  <option value="AndraPradesh">Andra Pradesh</option>
  <option value="ArunachalPradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="HimachalPradesh">Himachal Pradesh</option>
  <option value="JammuKashmir">Jammu and Kashmir</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="MadyaPradesh">Madya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Orissa">Orissa</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="TamilNadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttaranchal">Uttaranchal</option>
  <option value="UttarPradesh">Uttar Pradesh</option>
  <option value="WestBengal">West Bengal</option>
  <option disabled style={{ backgroundColor: '#aaa', color: '#fff' }}>
    UNION Territories
  </option>
  <option value="AndamanNicobar">Andaman and Nicobar Islands</option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="DadraHaveli">Dadar and Nagar Haveli</option>
  <option value="DamanDiu">Daman and Diu</option>
  <option value="Delhi">Delhi</option>
  <option value="Lakshadeep">Lakshadeep</option>
  <option value="Pondicherry">Pondicherry</option>
{/* </div>; */}
   
        {/* Add more state options as needed */}
      </select>
      <label htmlFor="floatingState">State<span className="text-danger">*</span></label>
    </div>
  )}
      {!isIndian && (
    <div className="form-floating mb-3">
      <select className="form-control input_field" id="floatingState"  onChange={handleStateChange} disabled>
        <option value="" disabled selected>Select state</option>
        <option value="state1">State 1</option>
        <option value="state2">State 2</option>
        <option value="state3">State 3</option>
        {/* Add more state options as needed */}
      </select>
      <label htmlFor="floatingState">State<span className="text-danger">*</span></label>
    </div>
  )}

    </div>
    <div className='col'>
    {selectedDistrict && (
    <div className="form-floating mb-3">
      <select className="form-control zoommm input_field" id="floatingDistrict" required onChange={handleDistrictChange} >
        <option value="" disabled selected>Select district</option>
        {states[selectedDistrict].map(content => (
          <option value={content}>{content}</option>
          ))}
        {/* District options will be dynamically populated based on the selected state */}
      </select>
      <label htmlFor="floatingDistrict">District<span className="text-danger">*</span></label>
    </div>
  )}
  {!selectedDistrict && (
    <div className="form-floating mb-3">
      <select className="form-control input_field" id="floatingDistrict"  onChange={handleDistrictChange} disabled>
        <option value="" disabled selected>Select district</option>
        {/* District options will be dynamically populated based on the selected state */}
      </select>
      <label htmlFor="floatingDistrict">District<span className="text-danger">*</span></label>
    </div>
  )}
    </div>
    </div>
    <div className='row'>
    <div className='col'>
            
    <div className="form-floating mb-3 zoommm">
    <input
      type="text"
      className="form-control input_field"
      id="floatingAddress"
      placeholder="Address"
      onChange={(e)=>{setAddress(e.target.value)}}
      required
    />
    <label htmlFor="floatingAddress">PinCode<span className="text-danger">*</span></label>
  </div>

    </div>
    <div className='col'>

    <div className="form-floating mb-3 zoommm">
    <select className="form-control input_field" id="floatingBloodDonor" required onChange={handleisBloodDonarChange}>
      <option value="" disabled selected>Are you a blood donor?</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
    <label htmlFor="floatingBloodDonor">Blood Donor<span className="text-danger">*</span></label>
  </div>

    </div>
    </div>
    <div className='row'>
    <div className='col'>
            
    {isBloodDonar && (
  <div className="form-floating mb-3">
  <select className="form-control zoommm input_field" id="floatingBloodGroup" required onChange={(e)=>{setBloodgrp(e.target.value)}}>
    <option value="" disabled selected>Select blood group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
  <label htmlFor="floatingBloodGroup">Blood Group<span className="text-danger">*</span></label>
</div>
  )
}
{!isBloodDonar && (
  <div className="form-floating mb-3 input_field">
  <select className="form-control" id="floatingBloodGroup" disabled>
    <option value="" disabled selected>Select blood group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
  <label htmlFor="floatingBloodGroup">Blood Group<span className="text-danger">*</span></label>
</div>
  )
}

    </div>
    <div className='col'>
    <div className="form-floating mb-3 zoommm">
    <textarea
      className="form-control input_field"
      id="floatingAdditionalInformation"
      placeholder="Additional Information"
      onChange={(e)=>{setaddInfo(e.target.value)}}
      
    ></textarea>
    <label htmlFor="floatingAdditionalInformation">Additional Info</label>
  </div>
    </div>

    
    </div>
    <div className='row'>
    <div className='col'>
    <p>Upload ID CARD<span className="text-danger">*</span></p>
    <div className="form-floating mb-3 zoommm">
    <input
      type="file"
      className="form-control input_field  p-3"
      id=""
      placeholder="Address"
      accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage1Selected(e.target.files[0])}}
      required
    />
    {/* <label htmlFor="floatingAddress">Address<span className="text-danger">*</span></label> */}
  </div>

    </div>
    <div className='col'>
    <p>Upload Profile Photo<span className="text-danger">*</span></p>
    <div className="form-floating mb-3 zoommm">
    
    <input
      type="file"
      className="form-control input_field p-3"
      id=""
      placeholder="Address"
      accept=".jpg, .jpeg, .png" onChange={(e)=>{setImage2Selected(e.target.files[0])}}
      required
    />
    {/* <label htmlFor="floatingAddress">Address<span className="text-danger">*</span></label> */}
  </div>

    </div>
    
    </div>
    <div className='row'>
    <div className='col'>

<div className="form-floating mb-3 zoommm">
<select className="form-control input_field" id="floatingBloodDonor5" required onChange={(e)=>{setGender(e.target.value)}}>
  <option value="" disabled selected>Select your Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="others">Others</option>
</select>
<label htmlFor="floatingBloodDonor5">Gender<span className="text-danger">*</span></label>
</div>

</div>
    <div className='col'>

    <div className="form-floating mb-3 zoommm">
    <select className="form-control input_field" id="floatingBloodDonor4" required onChange={(e)=>{setProfession(e.target.value)}}>
      <option value="" disabled selected>Select your Profession</option>
      <option value="Student">Student</option>
      <option value="Employee">Employee</option>
      <option value="Others">Others</option>
    </select>
    <label htmlFor="floatingBloodDonor4">Profession<span className="text-danger">*</span></label>
  </div>

    </div>
    </div>
    <center>
    {
      popup?
<button type="submit" className="btn  zoommm p-4 py-2 border-none" style={{backgroundColor:"#003A69", color:"#fff"}} disabled>Submit</button>
:
<button type="submit" className="btn  zoommm p-4 py-2 border-none" style={{backgroundColor:"#003A69", color:"#fff"}} >Submit</button>

    }
        
        {/* {datastatus1  &&(
          <div className="centered-content" style={{ backgroundColor: '#f0f4fb' }}>
          <div className="spinner-container">
            <ThreeDots height="20" width="10" color="black " ariaLabel="loading" />
            Thank you for your request. We are currently processing it. Please do not refresh the page
          </div>
        </div>
      // )
        )
                } */}
    </center>


    
</form>
}
{
                    popup?
                    <div className="main" style={{height:"120%"}}>
                        <div className="popup" >

                        <div className="centered-content ">
              <div className="spinner-container">
                {/* <div className='row'> */}
                <div className='row'>
                <ThreeDots height="200" width="100" color="black "  ariaLabel="loading" />
                </div>
                {/* <div className='row'>
                <p>Thank you for your request. We are currently processing it. Please do not refresh the page</p>
                </div> */}
                {/* </div> */}
                
             
              {/* <br></br> */}
              
          
            </div>
            </div>

                    </div>
                    </div>:""
                }

{/* ) } */}
{/* {datastatus1===0 && ( 
            <div className="centered-content" style={{ backgroundColor: '#f0f4fb' }}>
              <div className=" me-2 mt-0">
                <TailSpin height="40" width="100" color="#003A69" ariaLabel="loading" />
              </div>
              <p>Thank you for your request. We are currently processing it. Please do not refresh the page</p>
            </div>
          )} */}
{datastatus1===1 && ( 
            <div className="centered-content text-center" style={{ backgroundColor: '#f0f4fb' }}>
              <section>
              <div className="text-center me-2 mt-0">
              <i class="fa fa-smile-o  fa-4x" style={{color:"#003A69"}} aria-hidden="true"></i>
              </div>
              <br>
              </br>
              <p>Your contribution will help many to have a smile on their faces.</p> 
              <p>Thank you for the Application!!</p>
              <center>
              <button  className="btn  zoommm p-4 py-2 border-none text-center" style={{backgroundColor:"#003A69", color:"#fff"}} onClick={()=>{setDatastatus1(-1)}}>Ok</button>
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
