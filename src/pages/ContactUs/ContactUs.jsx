import React,{ useState,useRef } from "react";
import "./ContactUs.css";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaGift,
  FaHistory,
  FaWifi,
  FaHeadset,
  FaSignOutAlt,
  FaBell,
  FaTv,
  FaUpload,
  FaTimes,
  FaPaperPlane,
  FaGlobe,
  FaShieldAlt,
  FaHeadset as FaSupport,
  FaBolt,
  FaUsers,
} from "react-icons/fa";

const ContactUs=()=>{

  const navigate=useNavigate();

  const [form,setForm]=useState({
    name:"",
    email:"",
    phone:"",
    queryType:"",
    vcBox:"",
    description:"",
    area:"",
  });

  const [image,setImage]=useState(null);
  const [submitting,setSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const fileRef=useRef();

  const [inetForm,setInetForm]=useState({
    name:"",
    email:"",
    phone:"",
    preferredPlan:"",
    area:"",
    speedRequirement:"",
    description:"",
  });

  const [inetSubmitting,setInetSubmitting]=useState(false);
  const [inetSubmitted,setInetSubmitted]=useState(false);

  const handleChange=(e)=>setForm({ ...form,[e.target.name]:e.target.value });

 const handleFile=(e)=>{

  const f=e.target.files[0];

  if(!f)return;

  const maxSize=1*1024*1024;

  if(f.size>maxSize){

    alert(
      "Image size exceeded.\nPlease upload image below 1MB."
    );

    e.target.value="";
    setImage(null);

    return;
  }
  setImage(f);
};

  const openPreview=()=>{
    const url=URL.createObjectURL(image);
    const win=window.open("","_blank");
    win.document.write(`
      <html>
        <head>
          <title>Image Preview</title>
          <style>
            body { margin:0; background:#000; display:flex; align-items:center;
                   justify-content:center; height:100vh; }
            img  { max-width:95vw; max-height:95vh; border-radius:10px; }
            button { position:fixed; top:18px; right:18px; background:#ff2d2d;
                     border:none; color:#fff; width:42px; height:42px;
                     border-radius:50%; font-size:22px; cursor:pointer; }
          </style>
        </head>
        <body>
          <button onclick="window.close()">✕</button>
          <img src="${url}" />
        </body>
      </html>
    `);
  };

 const toBase64=(file)=>
  new Promise((resolve,reject)=>{

    const reader=new FileReader();

    reader.readAsDataURL(file);

    reader.onload=(event)=>{

      const img=new Image();

      img.src=event.target.result;

      img.onload=()=>{

        const canvas=document.createElement("canvas");
        const ctx=canvas.getContext("2d");

        let width=img.width;
        let height=img.height;

        const maxWidth=800;

        if(width>maxWidth){

          height*=maxWidth/width;
          width=maxWidth;
        }

        canvas.width=width;
        canvas.height=height;

        ctx.drawImage(img,0,0,width,height);

        const compressedImage=
          canvas.toDataURL("image/jpeg",0.5);

        resolve(compressedImage);
      };

      img.onerror=reject;
    };

    reader.onerror=reject;
  });

  const handleSubmit=async()=>{
    const { name,email,phone,queryType,vcBox,description,area }=form;

    if(!name||!email||!phone||!queryType||!vcBox||!description||!area){
      alert("Please fill all required fields.");
      return;
    }

    setSubmitting(true);

    const SERVICE_ID="service_fcvi14p";
    const TEMPLATE_ID="template_a85l6sa";
    const PUBLIC_KEY="MXNudPTeoOGic60Bp";
let imageData="No image uploaded.";

if(image&&image.size>1*1024*1024){

  alert("Image size exceeded. Please upload below 1MB.");

  setSubmitting(false);

  return;
}

if(image)imageData=await toBase64(image);

    const payload={
      service_id:SERVICE_ID,
      template_id:TEMPLATE_ID,
      user_id:PUBLIC_KEY,
      template_params:{
        from_name:name,
        from_email:email,
        phone,
        query_type:queryType,
        vc_box:vcBox,
        area,
        description,
        image_data:imageData,
      },
    };

    try{
      const res=await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(payload),
      });

      if(res.ok){
        setSubmitted(true);
        setForm({
          name:"",
          email:"",
          phone:"",
          queryType:"",
          vcBox:"",
          description:"",
          area:"",
        });
        setImage(null);
      }else{
        alert("Failed to send. Please try again.");
      }
    }catch{
      alert("Network error. Please try again.");
    }

    setSubmitting(false);
  };

  const handleInetChange=(e)=>
    setInetForm({ ...inetForm,[e.target.name]:e.target.value });

  const handleInetSubmit=async()=>{

    const {
      name,
      email,
      phone,
      preferredPlan,
      area,
      speedRequirement,
      description,
    }=inetForm;

    if(!name||!email||!phone||!preferredPlan||!area||!speedRequirement||!description){
      alert("Please fill all required fields.");
      return;
    }

    setInetSubmitting(true);

    const SERVICE_ID="service_5hjbrvb";
    const TEMPLATE_ID="template_96jza38";
    const PUBLIC_KEY="MXNudPTeoOGic60Bp";

    const payload={
      service_id:SERVICE_ID,
      template_id:TEMPLATE_ID,
      user_id:PUBLIC_KEY,
      template_params:{
        from_name:name,
        from_email:email,
        phone,
        preferred_plan:preferredPlan,
        area,
        speed_requirement:speedRequirement,
        description,
        query_type:"Internet Connection Enquiry",
      },
    };

    try{
      const res=await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(payload),
      });

      if(res.ok){
        setInetSubmitted(true);
        setInetForm({
          name:"",
          email:"",
          phone:"",
          preferredPlan:"",
          area:"",
          speedRequirement:"",
          description:"",
        });
      }else{
        alert("Failed to send. Please try again.");
      }
    }catch{
      alert("Network error. Please try again.");
    }

    setInetSubmitting(false);
  };

  const handleLogout=()=>{
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  return(
    <div className="contact-main-container">
      <div className="contact-wrapper">

        <div className="sidebar">
          <div className="logo-section">
            <img src="/logo.png" alt="logo" className="dashboard-logo" />
          </div>

          <div className="sidebar-menu">

            <button className="menu-btn" onClick={()=>navigate("/dashboard")}>
              <FaHome /> Dashboard
            </button>

            <button
              className="menu-btn"
              onClick={()=>navigate("/recharge")}
            >
              <FaWallet />
              Recharge
            </button>

            <button className="menu-btn" onClick={()=>navigate("/view-packages")}>
              <FaGift /> View Packages
            </button>

            <button
              className="menu-btn"
              onClick={()=>navigate("/payment-history")}
            >
              <FaHistory /> Payment History
            </button>

            <button className="menu-btn" onClick={()=>navigate("/tic-internet")}>
              <FaWifi /> TIC - INTERNET
            </button>

            <button className="menu-btn active-menu">
              <FaHeadset /> Contact Us
            </button>

            <button className="menu-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>

          </div>
        </div>

        <div className="contact-content">

          <div className="topbar">
            <marquee behavior="scroll" direction="left" scrollamount="6">
              Connecting You... Entertaining You...
            </marquee>
            <FaBell className="bell-icon" />
          </div>

          <div className="contact-banner-container">
            <img
              src="/contactbanner.png"
              alt="contact-banner"
              className="contact-banner"
            />
          </div>

          <div className="ctv-section">
            <div className="ctv-card">

              <div className="ctv-header">
                <div className="ctv-header-icon">
                  <FaTv />
                </div>

                <div>
                  <h2 className="ctv-title">Cable TV Support</h2>
                  <p className="ctv-subtitle">
                    Facing any issues with your Cable TV connection?
                  </p>
                </div>
              </div>

              {submitted?(
                <div className="ctv-success">
                  <span>✅</span>

                  <p>
                    Your query has been submitted! We'll get back to you soon.
                  </p>

                  <button
                    className="ctv-submit-btn"
                    onClick={()=>setSubmitted(false)}
                  >
                    Submit Another
                  </button>
                </div>
              ):(
                <>
                  <div className="ctv-form-grid">

                    <div className="ctv-field">
                      <label>Your Name <span>*</span></label>

                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Email Address <span>*</span></label>

                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Phone Number <span>*</span></label>

                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Query Type <span>*</span></label>

                      <select
                        name="queryType"
                        value={form.queryType}
                        onChange={handleChange}
                      >
                        <option value="">Select query type</option>
                        <option>Signal Problem</option>
                        <option>Channel Not Working</option>
                        <option>Deactivated Connection</option>
                        <option>Recharge Issue</option>
                        <option>Wire Cut Problem</option>
                        <option>Package Change</option>
                        <option>Box Not Working</option>
                      </select>
                    </div>

                    <div className="ctv-field">
                      <label>VC / Box Number <span>*</span></label>

                      <input
                        name="vcBox"
                        value={form.vcBox}
                        onChange={handleChange}
                        placeholder="Enter your VC / Box number"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Detailed Description <span>*</span></label>

                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your issue in detail..."
                      />
                    </div>

                    <div className="ctv-field ctv-full">
                      <label>Area / Address <span>*</span></label>

                      <input
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        placeholder="Enter your area or address"
                      />
                    </div>

                  </div>

                  <div className="ctv-upload-wrap">

                    <p className="ctv-upload-label">
                      Upload Photo (If any)
                    </p>

                    <p className="ctv-upload-hint">
                      Upload image of wire cut, no signal, damage, etc.
                    </p>

                    {!image?(
                      <label className="ctv-upload-box">

                        <FaUpload className="ctv-upload-icon" />

                        <span>
                          <strong>Click to upload</strong> or drag and drop
                        </span>

                       <small>JPG, PNG (Max. 1MB)</small>

                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleFile}
                        />

                      </label>
                    ):(
                      <div className="ctv-preview-wrap">

                        <div className="ctv-preview-thumb">

                          <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            onClick={openPreview}
                            title="Click to view full image"
                          />

                          <button
                            type="button"
                            className="ctv-remove-btn"
                            onClick={()=>setImage(null)}
                          >
                            <FaTimes />
                          </button>

                        </div>

                        <p className="ctv-preview-name">
                          {image.name}
                        </p>

                      </div>
                    )}
                  </div>

                  <button
                    className="ctv-submit-btn"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <FaPaperPlane />
                    {submitting?"Sending...":"Submit Cable TV Query"}
                  </button>
                </>
              )}

            </div>
          </div>

          <div className="ctv-section inet-section">
            <div className="ctv-card">

              <div className="ctv-header">

                <div className="ctv-header-icon inet-header-icon">
                  <FaWifi />
                </div>

                <div>
                  <h2 className="ctv-title inet-title">
                    Internet Connection Enquiry
                  </h2>

                  <p className="ctv-subtitle">
                    Looking for a new internet connection?
                  </p>
                </div>

              </div>

              {inetSubmitted?(
                <div className="ctv-success">

                  <span>✅</span>

                  <p>
                    Your enquiry has been submitted! We'll get back to you soon.
                  </p>

                  <button
                    className="ctv-submit-btn inet-submit-btn"
                    onClick={()=>setInetSubmitted(false)}
                  >
                    Submit Another
                  </button>

                </div>
              ):(
                <>
                  <div className="ctv-form-grid">

                    <div className="ctv-field">
                      <label>Your Name <span>*</span></label>

                      <input
                        name="name"
                        value={inetForm.name}
                        onChange={handleInetChange}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Email Address <span>*</span></label>

                      <input
                        name="email"
                        type="email"
                        value={inetForm.email}
                        onChange={handleInetChange}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Phone Number <span>*</span></label>

                      <input
                        name="phone"
                        value={inetForm.phone}
                        onChange={handleInetChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Preferred Plan <span>*</span></label>

                      <select
                        name="preferredPlan"
                        value={inetForm.preferredPlan}
                        onChange={handleInetChange}
                      >
                        <option value="">Select preferred plan</option>
                        <option value="TIC_WOT_20MBPS_UL_299_12M">
                          TIC_WOT_20MBPS_UL_299_12M
                        </option>

                        <option value="TIC_NEW_30Mbps_UL_399">
                          TIC_NEW_30Mbps_UL_399
                        </option>

                        <option value="TIC_SILVER_40MBPS_UL_399_6M">
                          TIC_SILVER_40MBPS_UL_399_6M
                        </option>

                        <option value="TIC_NEW_50Mbps_UL_499">
                          TIC_NEW_50Mbps_UL_499
                        </option>

                        <option value="TIC_DIAMOND_100MBPS_UL_599">
                          TIC_DIAMOND_100MBPS_UL_599
                        </option>

                        <option value="TIC_93M_150Mbps_UL_999">
                          TIC_93M_150Mbps_UL_999
                        </option>
                      </select>
                    </div>

                    <div className="ctv-field">
                      <label>Area / Address <span>*</span></label>

                      <input
                        name="area"
                        value={inetForm.area}
                        onChange={handleInetChange}
                        placeholder="Enter your area"
                      />
                    </div>

                    <div className="ctv-field">
                      <label>Speed Requirement <span>*</span></label>

                      <select
                        name="speedRequirement"
                        value={inetForm.speedRequirement}
                        onChange={handleInetChange}
                      >
                        <option value="">Select speed</option>
                        <option value="20 Mbps">20 Mbps</option>
                        <option value="30 Mbps">30 Mbps</option>
                        <option value="40 Mbps">40 Mbps</option>
                        <option value="50 Mbps">50 Mbps</option>
                        <option value="100 Mbps">100 Mbps</option>
                        <option value="150 Mbps">150 Mbps</option>
                      </select>
                    </div>

                    <div className="ctv-field ctv-full">
                      <label>Short Description <span>*</span></label>

                      <textarea
                        name="description"
                        value={inetForm.description}
                        onChange={handleInetChange}
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                  </div>

                  <button
                    className="ctv-submit-btn inet-submit-btn"
                    onClick={handleInetSubmit}
                    disabled={inetSubmitting}
                  >
                    <FaPaperPlane />
                    {inetSubmitting?"Sending...":"Submit Internet Enquiry"}
                  </button>

                </>
              )}

            </div>

            <div className="satisfy-banner">

              <div className="satisfy-left">

                <div className="satisfy-quote-icon">
                  ❝
                </div>

                <div className="satisfy-text">
                  <h3>Your Satisfaction is Our Priority.</h3>

                  <p>
                    We don't just provide service, we build relationships.
                  </p>
                </div>

              </div>

              <div className="satisfy-center">
                ✦ ✦
              </div>

              <div className="satisfy-right">

                <span>24/7</span>

                <p>
                  We're Always
                  <br />
                  <strong>Here for You!</strong>
                </p>

              </div>

            </div>
          </div>

          <div className="dashboard-footer">
            <marquee behavior="scroll" direction="left" scrollamount="5">
              © SS Cable Network 2026. All Rights Reserved.
            </marquee>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;