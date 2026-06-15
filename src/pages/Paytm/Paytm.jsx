import React,{
  useEffect,
  useState,
} from "react";

import "./Paytm.css";

import {
  FaArrowLeft,
  FaCircleNotch,
  FaChevronDown,
  FaBackspace,
  FaCheck,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Paytm=()=>{

  const navigate=useNavigate();

  const [showBankPage,setShowBankPage]=
    useState(false);

  const [selectedBank,setSelectedBank]=
    useState(null);

  const [showDropdown,setShowDropdown]=
    useState(false);

  const [showPinPage,setShowPinPage]=
    useState(false);

  const [showProcessingPage,setShowProcessingPage]=
    useState(false);

  const [activeDot,setActiveDot]=
    useState(0);

  const [pin,setPin]=
    useState("");

  const userData=
    JSON.parse(
      localStorage.getItem("loggedUser")
    )||{};

  const amount=
    userData.price||
    userData.amount||
    "399";

  useEffect(()=>{

    const timer=setTimeout(()=>{

      setShowBankPage(true);

    },3500);

    return()=>clearTimeout(timer);

  },[]);

  const banks=[

    {
      name:
        "State Bank Of India - 3254",
      number:"****8961234",
      upi:"sbi3254@ybl",
      logo:"/sbi.png",
      pin:"123456",
    },

    {
      name:"HDFC Bank - 5012",
      number:"****78963451",
      upi:"hdfc5012@okhdfcbank",
      logo:"/hdfc.png",
      pin:"654321",
    },

    {
      name:"ICICI Bank - 7845",
      number:"****12369875",
      upi:"icici7845@icici",
      logo:"/icici.jpg",
      pin:"112233",
    },

    {
      name:"Axis Bank - 9123",
      number:"****45678452",
      upi:"axis9123@axisbank",
      logo:"/axis.png",
      pin:"445566",
    },

  ];

  const handlePinInput=(num)=>{

    if(pin.length<6){

      setPin(pin+num);
    }
  };

  const handleBackspace=()=>{

    setPin(
      pin.slice(0,-1)
    );
  };

  const handleVerifyPin=()=>{

    if(pin.length!==6){

      alert(
        "Please enter 6 digit UPI PIN"
      );

      return;
    }

    if(pin!==selectedBank.pin){

      alert(
        "Please enter a valid PIN"
      );

      setPin("");

      return;
    }

    setShowProcessingPage(true);

    let dot=0;

    const interval=setInterval(()=>{

      dot++;

      setActiveDot(dot%5);

    },500);

    setTimeout(()=>{

      clearInterval(interval);

      const transactionId=
        "T"+
        Date.now()+
        Math.floor(
          1000+Math.random()*9000
        );

      const today=new Date();

      const oldExpiry=
        new Date(
          userData?.expiryDate
        );

      let newRechargeDate;

      let newExpiryDate;

      if(oldExpiry>=today){

        newRechargeDate=
          userData?.rechargeDate;

        newExpiryDate=
          new Date(oldExpiry);

        newExpiryDate.setDate(
          newExpiryDate.getDate()+30
        );

      }else{

        newRechargeDate=
          today.toISOString();

        newExpiryDate=
          new Date(today);

        newExpiryDate.setDate(
          newExpiryDate.getDate()+30
        );
      }

      const updatedUser={

        ...userData,

        rechargeDate:
          newRechargeDate,

        expiryDate:
          newExpiryDate.toISOString(),

        transactionStatus:
          "Success",

        transactionId,

        paidAmount:
          amount,

        selectedBank:
          selectedBank.name,

        paymentDate:
          new Date().toLocaleString(
            "en-GB",
            {
              day:"2-digit",
              month:"short",
              year:"numeric",
              hour:"numeric",
              minute:"2-digit",
            }
          ),
      };

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(updatedUser)
      );

      const allUsers=
        JSON.parse(
          localStorage.getItem("users")
        )||[];

      const updatedUsers=
        allUsers.map((user)=>{

          if(
            user.serial===
            updatedUser.serial
          ){

            return updatedUser;
          }

          return user;

        });

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      const oldPayments=
        JSON.parse(
          localStorage.getItem(
            "paymentHistory"
          )
        )||[];

      const newPayment={

        serial:
          updatedUser.serial,

        username:
          updatedUser.username,

        transactionId,

        amount,

        plan:
          userData?.plan||
          "Basic Plan",

        paymentMethod:
          "Paytm",

        paymentIcon:
          "/paytm1.webp",

        bankName:
          selectedBank.name,

        bankLogo:
          selectedBank.logo,

        status:
          "Success",

        validity:
          "30 Days",

        date:
          updatedUser.paymentDate,
      };

      const alreadyExists=
        oldPayments.some(
          (payment)=>
            payment.transactionId===
            transactionId
        );

      if(!alreadyExists){

        oldPayments.unshift(
          newPayment
        );

        localStorage.setItem(
          "paymentHistory",
          JSON.stringify(
            oldPayments
          )
        );
      }

      navigate(
        "/paytm-success",
        {
          state:{
            amount,
            transactionId,
            bank:selectedBank,
          },
        }
      );

    },4000);
  };

  useEffect(()=>{

    const handleKeyDown=(e)=>{

      if(!showPinPage) return;

      if(
        /^[0-9]$/.test(e.key)
      ){

        handlePinInput(e.key);
      }

      if(e.key==="Backspace"){

        handleBackspace();
      }

      if(e.key==="Enter"){

        handleVerifyPin();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return()=>{

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  },[pin,showPinPage]);

  return(

    <div className="paytm-main-container">

      <div
        className={`paytm-card ${
          showBankPage
            ? "paytm-bank-page-card"
            : ""
        }`}
      >

        {!showBankPage?(

          <>

            <div className="paytm-loading-screen">

              <div className="paytm-logo-circle">

                <img
                  src="/paytm1.webp"
                  alt="paytm"
                  className="paytm-logo"
                />

              </div>

              <h1 className="paytm-title">

                Paytm

              </h1>

              <p className="paytm-subtitle">

                Redirecting to Paytm...

              </p>

              <div className="paytm-loader-container">

                <FaCircleNotch className="paytm-loader" />

              </div>

              <div className="paytm-bottom">

                <p>

                  Powered by

                </p>

                <img
                  src="/upi1.png"
                  alt="upi"
                  className="paytm-upi-logo"
                />

              </div>

            </div>

          </>

        ):!showPinPage?(

          <>

            <div className="paytm-bank-header">

              <div
                className="paytm-back-btn"
                onClick={()=>
                  navigate("/recharge")
                }
              >

                <FaArrowLeft />

              </div>

              <div className="paytm-bank-header-center">

                <img
                  src="/upi1.png"
                  alt="upi"
                  className="paytm-bank-upi-logo"
                />

                <div>

                  <h2>

                    SS CABLE

                  </h2>

                  <p>

                    Choose Bank Account

                  </p>

                </div>

              </div>

            </div>

            <div className="paytm-amount-box">

              <span>

                Amount

              </span>

              <h1>

                {amount}

              </h1>

            </div>

            <div className="paytm-dropdown-container">

              <div
                className="paytm-dropdown-selected"
                onClick={()=>
                  setShowDropdown(
                    !showDropdown
                  )
                }
              >

                {selectedBank?(

                  <div className="paytm-selected-bank-info">

                    <div className="paytm-selected-left">

                      <img
                        src={selectedBank.logo}
                        alt="bank"
                        className="paytm-bank-logo"
                      />

                      <div>

                        <h3>

                          {selectedBank.name}

                        </h3>

                        <p>

                          {selectedBank.number}

                        </p>

                      </div>

                    </div>

                  </div>

                ):(

                  <div className="paytm-choose-bank-text">

                    <span>

                      Select your bank account

                    </span>

                  </div>

                )}

                <FaChevronDown
                  className={`paytm-dropdown-arrow ${
                    showDropdown
                      ? "paytm-rotate-arrow"
                      : ""
                  }`}
                />

              </div>

              {showDropdown&&(

                <div className="paytm-dropdown-list">

                  {banks.map(
                    (bank,index)=>(

                      <div
                        className="paytm-dropdown-item"
                        key={index}
                        onClick={()=>{

                          setShowDropdown(false);

                          setTimeout(()=>{

                            setSelectedBank(bank);

                          },500);

                        }}
                      >

                        <img
                          src={bank.logo}
                          alt="bank"
                          className="paytm-bank-logo"
                        />

                        <div>

                          <h3>

                            {bank.name}

                          </h3>

                          <p>

                            {bank.upi}

                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

            <div className="paytm-message-box">

              <label>

                Additional Message

              </label>

              <textarea
                placeholder="Enter your message..."
              />

            </div>

            <button
              className="paytm-continue-btn"
              onClick={()=>{

                if(!selectedBank){

                  alert(
                    "Please select your bank account"
                  );

                  return;
                }

                setShowPinPage(true);

              }}
            >

              Proceed Payment

            </button>

          </>

        ):showProcessingPage?(

          <>

            <div className="paytm-processing-page">

              <h2 className="paytm-processing-title">

                Processing Payment

              </h2>

              <p className="paytm-processing-subtitle">

                Please wait while we secure
                your payment

              </p>

              <div className="paytm-processing-image-circle">

                <img
                  src="/secure-payment.webp"
                  alt="secure"
                  className="paytm-processing-image"
                />

              </div>

              <div className="paytm-processing-dots">

                {[0,1,2,3,4].map((dot)=>(

                  <div
                    key={dot}
                    className={`paytm-dot ${
                      activeDot===dot
                        ? "paytm-active-dot"
                        : ""
                    }`}
                  />

                ))}

              </div>

              <div className="paytm-secure-box">

                <img
                  src="/secure.png"
                  alt="secure"
                  className="paytm-secure-icon"
                />

                <span>

                  100% Secure

                </span>

              </div>

            </div>

          </>

        ):(

          <>

            <div className="paytm-pin-page">

              <h2 className="paytm-pin-title">

                Enter UPI PIN

              </h2>

              <div className="paytm-pin-bank-card">

                <img
                  src={selectedBank.logo}
                  alt="bank"
                  className="paytm-pin-bank-logo"
                />

                <div>

                  <h3>

                    {selectedBank.name}

                  </h3>

                  <p>

                    UPI ID:
                    {" "}
                    {selectedBank.upi}

                  </p>

                </div>

              </div>

              <p className="paytm-pin-label">

                Enter 6 digit UPI PIN

              </p>

              <div className="paytm-pin-box-container">

                {[...Array(6)].map(
                  (_,index)=>(

                    <div
                      key={index}
                      className="paytm-pin-box"
                    >

                      {pin[index]
                        ? "•"
                        : ""}

                    </div>

                  )
                )}

              </div>

              <div className="paytm-pin-keypad">

                {[1,2,3,4,5,6,7,8,9].map(
                  (num)=>(

                    <button
                      key={num}
                      className="paytm-key-btn"
                      onClick={()=>
                        handlePinInput(
                          num.toString()
                        )
                      }
                    >

                      {num}

                    </button>

                  )
                )}

                <button
                  className="paytm-key-btn"
                  onClick={
                    handleBackspace
                  }
                >

                  <FaBackspace />

                </button>

                <button
                  className="paytm-key-btn"
                  onClick={()=>
                    handlePinInput("0")
                  }
                >

                  0

                </button>

                <button
                  className="paytm-key-btn paytm-success-btn"
                  onClick={()=>{

                    setTimeout(()=>{

                      handleVerifyPin();

                    },200);

                  }}
                >

                  <FaCheck />

                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default Paytm;