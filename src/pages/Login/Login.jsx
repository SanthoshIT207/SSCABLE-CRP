import React,{
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import users from "../../data/users";
import "./Login.css";

import {
  FaUserPlus,
  FaSignInAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaIdCard,
} from "react-icons/fa";

const Login=()=>{

  const navigate=useNavigate();

  if(!localStorage.getItem("users")){

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }

  const [activePage,setActivePage]=
    useState("login");

  const [showPassword,setShowPassword]=
    useState(false);

  const [showConfirm,setShowConfirm]=
    useState(false);

  const [
    showLoginPassword,
    setShowLoginPassword,
  ]=useState(false);

  const [serial,setSerial]=useState("");

  const [password,setPassword]=
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ]=useState("");

  const [
    loginPassword,
    setLoginPassword,
  ]=useState("");

  const [popup,setPopup]=useState({
    show:false,
    type:"",
    message:"",
  });

  const showPopup=(
    type,
    message
  )=>{

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

  const handleSignup=()=>{

    if(
      !serial||
      !password||
      !confirmPassword
    ){

      showPopup(
        "error",
        "Please enter your details"
      );

      return;
    }

    const storedUsers=
      JSON.parse(
        localStorage.getItem("users")
      )||users;

    const validUser=
      storedUsers.find(
        (user)=>
          user.serial===serial
      );

    if(!validUser){

      showPopup(
        "error",
        "Serial / VC number not found"
      );

      return;
    }

    if(password.length<8){

      showPopup(
        "error",
        "Password must contain minimum 8 characters"
      );

      return;
    }

    if(
      password!==confirmPassword
    ){

      showPopup(
        "error",
        "Passwords do not match"
      );

      return;
    }

    const updatedUsers=
      storedUsers.map((user)=>{

        if(
          user.serial===serial
        ){

          return{
            ...user,
            password,
          };
        }

        return user;
      });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    showPopup(
      "success",
      "Account Created Successfully"
    );

    setSerial("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(()=>{

      setActivePage("login");

    },1000);
  };

  const handleLogin=()=>{

    if(
      !serial||
      !loginPassword
    ){

      showPopup(
        "error",
        "Please enter your details"
      );

      return;
    }

    const storedUsers=
      JSON.parse(
        localStorage.getItem("users")
      )||users;

    const validUser=
      storedUsers.find(
        (user)=>
          user.serial===serial&&
          user.password===
            loginPassword
      );

    if(!validUser){

      showPopup(
        "error",
        "Please enter correct username or password"
      );

      return;
    }

    localStorage.setItem(
      "loggedUser",
      JSON.stringify(validUser)
    );

    showPopup(
      "success",
      "Login Successful"
    );

    setSerial("");
    setLoginPassword("");

    setTimeout(()=>{

      navigate("/dashboard");

    },1200);
  };

  return(

    <div className="main-container">

      <div className="outer-card">

        <div className="logo-section">

          <img
            src="/logo.png"
            alt="logo"
            className="logo"
          />

          <h1>
            SS Cable Network
          </h1>

          <p>
            ── CUSTOMER PORTAL ──
          </p>

        </div>

        <div className="switch-buttons">

          <button
            className={
              activePage===
              "signup"
                ? "active"
                : ""
            }
            onClick={()=>
              setActivePage(
                "signup"
              )
            }
          >

            <FaUserPlus />

            Signup

          </button>

          <button
            className={
              activePage===
              "login"
                ? "active"
                : ""
            }
            onClick={()=>
              setActivePage(
                "login"
              )
            }
          >

            <FaSignInAlt />

            Login

          </button>

        </div>

        {activePage===
          "signup"&&(

          <form
            className="form-section fade"
            onSubmit={(e)=>{

              e.preventDefault();

              handleSignup();

            }}
          >

            <h3 className="field-title">
              Serial / VC Number
            </h3>

            <div className="input-box">

              <FaIdCard className="input-icon" />

              <input
                type="text"
                inputMode="numeric"
                name="username"
                autoComplete="username"
                placeholder="Enter your number"
                value={serial}
                maxLength={15}
                onKeyPress={(e)=>{

                  if(
                    !/[0-9]/.test(
                      e.key
                    )
                  ){

                    e.preventDefault();
                  }
                }}
                onChange={(e)=>
                  setSerial(
                    e.target.value
                  )
                }
              />

            </div>

            <h3 className="field-title">
              Create Password
            </h3>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="new-password"
                autoComplete="new-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <span
                className="eye-icon"
                onClick={()=>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword?(
                  <FaEyeSlash />
                ):(
                  <FaEye />
                )}

              </span>

            </div>

            {password.length>
              0&&
              password.length<
                8&&(

                <p className="warning-text">

                  Password must contain
                  minimum 8 characters

                </p>
              )}

            <h3 className="field-title">
              Confirm Password
            </h3>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={
                  confirmPassword
                }
                onChange={(e)=>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

              <span
                className="eye-icon"
                onClick={()=>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >

                {showConfirm?(
                  <FaEyeSlash />
                ):(
                  <FaEye />
                )}

              </span>

            </div>

            <button
              type="submit"
              className="main-btn"
            >

              <FaUserPlus />

              Create Account

            </button>

          </form>
        )}

        {activePage===
          "login"&&(

          <form
            className="form-section fade"
            autoComplete="on"
            onSubmit={(e)=>{

              e.preventDefault();

              handleLogin();

            }}
          >

            <h3 className="field-title">
              Serial / VC Number
            </h3>

            <div className="input-box">

              <FaIdCard className="input-icon" />

              <input
                type="text"
                inputMode="numeric"
                name="username"
                autoComplete="username"
                placeholder="Enter your number"
                value={serial}
                maxLength={15}
                onKeyPress={(e)=>{

                  if(
                    !/[0-9]/.test(
                      e.key
                    )
                  ){

                    e.preventDefault();
                  }
                }}
                onChange={(e)=>
                  setSerial(
                    e.target.value
                  )
                }
              />

            </div>

            <h3 className="field-title">
              Password
            </h3>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showLoginPassword
                    ? "text"
                    : "password"
                }
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={
                  loginPassword
                }
                onChange={(e)=>
                  setLoginPassword(
                    e.target.value
                  )
                }
              />

              <span
                className="eye-icon"
                onClick={()=>
                  setShowLoginPassword(
                    !showLoginPassword
                  )
                }
              >

                {showLoginPassword?(
                  <FaEyeSlash />
                ):(
                  <FaEye />
                )}

              </span>

            </div>

            <div
              className="forgot-password"
              onClick={()=>
                navigate(
                  "/forgot-password"
                )
              }
            >

              Forgot Password?

            </div>

            <button
              type="submit"
              className="main-btn"
            >

              <FaSignInAlt />

              Login

            </button>

          </form>
        )}

      </div>

      {popup.show&&(

        <div className="popup-container">

          <div className="popup-card">

            {popup.type===
            "success"?(

              <FaCheckCircle
                className="popup-icon success"
              />

            ):(

              <FaTimesCircle
                className="popup-icon error"
              />

            )}

            <h3>
              {popup.message}
            </h3>

          </div>

        </div>
      )}

    </div>
  );
};

export default Login;