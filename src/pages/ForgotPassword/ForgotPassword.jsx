import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../data/users";
import "./ForgotPassword.css";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
  FaKey,
} from "react-icons/fa";

const ForgotPassword=()=>{

  const navigate=useNavigate();

  const [serial,setSerial]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=
    useState("");

  const [showNewPassword,setShowNewPassword]=
    useState(false);

  const [showConfirmPassword,setShowConfirmPassword]=
    useState(false);

  const [popup,setPopup]=useState({
    show:false,
    type:"",
    message:"",
  });

  const showPopup=(type,message)=>{

    setPopup({
      show:true,
      type,
      message,
    });

    setTimeout(()=>{

      setPopup({
        show:false,
        type:"",
        message:"",
      });

    },3000);
  };

  const handlePasswordReset=()=>{

    if(
      !serial||
      !newPassword||
      !confirmPassword
    ){

      showPopup(
        "error",
        "Please enter your details"
      );

      return;
    }

    if(newPassword.length<8){

      showPopup(
        "error",
        "Password must contain minimum 8 characters"
      );

      return;
    }

    if(newPassword!==confirmPassword){

      showPopup(
        "error",
        "Passwords do not match"
      );

      return;
    }

    const storedUsers=
      JSON.parse(localStorage.getItem("users"))||users;

    const userIndex=storedUsers.findIndex(
      (user)=>user.serial===serial
    );

    if(userIndex===-1){

      showPopup(
        "error",
        "Please enter correct serial / VC number"
      );

      return;
    }

    storedUsers[userIndex].password=
      newPassword;

    localStorage.setItem(
      "users",
      JSON.stringify(storedUsers)
    );

    showPopup(
      "success",
      "Your password was created successfully"
    );

    setSerial("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(()=>{

      navigate("/");

    },2000);
  };

  return(

    <div className="forgot-main-container">

      <div className="forgot-card">

        <div className="logo-section">

          <img
            src="/logo.png"
            alt="logo"
            className="logo"
          />

          <h1>SS Cable Network</h1>

          <p>── CUSTOMER PORTAL ──</p>

        </div>

        <div className="forgot-title">

          <FaKey className="key-icon" />

          <h2>Forgot Password</h2>

        </div>

        <div className="input-box">

          <FaIdCard className="input-icon" />

          <input
            type="text"
            inputMode="numeric"
            maxLength={20}
            placeholder="Enter your number"
            value={serial}
            onKeyPress={(e)=>{

              if(!/[0-9]/.test(e.key)){

                e.preventDefault();

              }

            }}
            onChange={(e)=>
              setSerial(e.target.value)
            }
          />

        </div>

        <div className="input-box">

          <FaLock className="input-icon" />

          <input
            type={
              showNewPassword
                ? "text"
                : "password"
            }
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e)=>
              setNewPassword(
                e.target.value
              )
            }
          />

          <span
            className="eye-icon"
            onClick={()=>
              setShowNewPassword(
                !showNewPassword
              )
            }
          >
            {showNewPassword?(
              <FaEyeSlash />
            ):(
              <FaEye />
            )}
          </span>

        </div>

        {newPassword.length>0&&
          newPassword.length<8&&(

            <p className="warning-text">

              Password must contain
              minimum 8 characters

            </p>

        )}

        <div className="input-box">

          <FaLock className="input-icon" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <span
            className="eye-icon"
            onClick={()=>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword?(
              <FaEyeSlash />
            ):(
              <FaEye />
            )}
          </span>

        </div>

        <button
          className="main-btn"
          onClick={handlePasswordReset}
        >

          <FaKey />

          Create Password

        </button>

      </div>

      {popup.show&&(

        <div className="popup-container">

          <div className="popup-card">

            {popup.type==="success"?(

              <FaCheckCircle
                className="popup-icon success"
              />

            ):(

              <FaTimesCircle
                className="popup-icon error"
              />

            )}

            <h3>{popup.message}</h3>

          </div>

        </div>
      )}

    </div>
  );
};

export default ForgotPassword;