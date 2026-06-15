import React,{
  useEffect,
  useState,
} from "react";

import "./GooglePay.css";

import {
  FaArrowLeft,
  FaCircleNotch,
  FaChevronDown,
  FaBackspace,
  FaCheck,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

const GooglePay=()=>{

  const googlepayNavigate=
    useNavigate();

  const [
    googlepayShowBankPage,
    setGooglepayShowBankPage,
  ]=useState(false);

  const [
    googlepaySelectedBank,
    setGooglepaySelectedBank,
  ]=useState(null);

  const [
    googlepayShowDropdown,
    setGooglepayShowDropdown,
  ]=useState(false);

  const [
    googlepayShowPinPage,
    setGooglepayShowPinPage,
  ]=useState(false);

  const [
    googlepayShowProcessingPage,
    setGooglepayShowProcessingPage,
  ]=useState(false);

  const [
    googlepayActiveDot,
    setGooglepayActiveDot,
  ]=useState(0);

  const [
    googlepayPin,
    setGooglepayPin,
  ]=useState("");

  const googlepayUserData=
    JSON.parse(
      localStorage.getItem(
        "loggedUser"
      )
    )||{};

  const googlepayAmount=
    googlepayUserData.price||
    googlepayUserData.amount||
    "399";

  useEffect(()=>{

    const googlepayTimer=
      setTimeout(()=>{

        setGooglepayShowBankPage(
          true
        );

      },3500);

    return ()=>clearTimeout(
      googlepayTimer
    );

  },[]);

  const googlepayBanks=[

    {
      name:
        "State Bank Of India - 3254",

      number:
        "****8961234",

      upi:
        "sbi3254@oksbi",

      logo:
        "/sbi.png",

      pin:
        "123456",
    },

    {
      name:
        "HDFC Bank - 5012",

      number:
        "****78963451",

      upi:
        "hdfc5012@okhdfcbank",

      logo:
        "/hdfc.png",

      pin:
        "654321",
    },

    {
      name:
        "ICICI Bank - 7845",

      number:
        "****12369875",

      upi:
        "icici7845@okicici",

      logo:
        "/icici.jpg",

      pin:
        "112233",
    },

    {
      name:
        "Axis Bank - 9123",

      number:
        "****45678452",

      upi:
        "axis9123@okaxis",

      logo:
        "/axis.png",

      pin:
        "445566",
    },

  ];

  const handleGooglepayPinInput=
    (num)=>{

      if(
        googlepayPin.length<6
      ){

        setGooglepayPin(
          googlepayPin+num
        );
      }
    };

  const handleGooglepayBackspace=
    ()=>{

      setGooglepayPin(

        googlepayPin.slice(
          0,
          -1
        )

      );
    };

  const handleGooglepayVerifyPin=
    ()=>{

      if(
        googlepayPin.length!==6
      ){

        alert(
          "Please enter 6 digit UPI PIN"
        );

        return;
      }

      if(
        googlepayPin!==
        googlepaySelectedBank.pin
      ){

        alert(
          "Please enter a valid PIN"
        );

        setGooglepayPin("");

        return;
      }

      setGooglepayShowProcessingPage(
        true
      );

      let googlepayDot=0;

      const googlepayInterval=
        setInterval(()=>{

          googlepayDot++;

          setGooglepayActiveDot(

            googlepayDot%5

          );

        },500);

      setTimeout(()=>{

        clearInterval(
          googlepayInterval
        );

        const googlepayTransactionId=

          "G"+
          Date.now()+

          Math.floor(
            1000+
            Math.random()*9000
          );

        const googlepayToday=
          new Date();

        const googlepayOldExpiry=
          new Date(

            googlepayUserData?.expiryDate

          );

        let googlepayNewRechargeDate;

        let googlepayNewExpiryDate;

        if(
          googlepayOldExpiry>=
          googlepayToday
        ){

          googlepayNewRechargeDate=

            googlepayUserData?.rechargeDate;

          googlepayNewExpiryDate=

            new Date(
              googlepayOldExpiry
            );

          googlepayNewExpiryDate.setDate(

            googlepayNewExpiryDate.getDate()+30

          );

        }else{

          googlepayNewRechargeDate=

            googlepayToday.toISOString();

          googlepayNewExpiryDate=

            new Date(
              googlepayToday
            );

          googlepayNewExpiryDate.setDate(

            googlepayNewExpiryDate.getDate()+30

          );
        }

        const googlepayUpdatedUser={

          ...googlepayUserData,

          rechargeDate:
            googlepayNewRechargeDate,

          expiryDate:
            googlepayNewExpiryDate.toISOString(),

          transactionStatus:
            "Success",

          transactionId:
            googlepayTransactionId,

          paidAmount:
            googlepayAmount,

          selectedBank:
            googlepaySelectedBank.name,

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

          JSON.stringify(
            googlepayUpdatedUser
          )

        );

        const googlepayAllUsers=

          JSON.parse(
            localStorage.getItem(
              "users"
            )
          )||[];

        const googlepayUpdatedUsers=

          googlepayAllUsers.map(

            (user)=>{

              if(

                user.serial===
                googlepayUpdatedUser.serial

              ){

                return(
                  googlepayUpdatedUser
                );
              }

              return user;

            }

          );

        localStorage.setItem(

          "users",

          JSON.stringify(
            googlepayUpdatedUsers
          )

        );

        const googlepayOldPayments=

          JSON.parse(
            localStorage.getItem(
              "paymentHistory"
            )
          )||[];

        const googlepayNewPayment={

          serial:
            googlepayUpdatedUser.serial,

          username:
            googlepayUpdatedUser.username,

          transactionId:
            googlepayTransactionId,

          amount:
            googlepayAmount,

          plan:
            googlepayUserData?.plan||
            "Basic Plan",

          paymentMethod:
            "Google Pay",

          paymentIcon:
            "/gpay1.jpg",

          bankName:
            googlepaySelectedBank.name,

          bankLogo:
            googlepaySelectedBank.logo,

          status:
            "Success",

          validity:
            "30 Days",

          date:
            googlepayUpdatedUser.paymentDate,
        };

        const alreadyExists=
          googlepayOldPayments.some(
            (payment)=>
              payment.transactionId===
              googlepayTransactionId
          );

        if(!alreadyExists){

          googlepayOldPayments.unshift(
            googlepayNewPayment
          );

          localStorage.setItem(
            "paymentHistory",
            JSON.stringify(
              googlepayOldPayments
            )
          );
        }

        googlepayNavigate(

          "/googlepay-success",

          {
            state:{

              amount:
                googlepayAmount,

              transactionId:
                googlepayTransactionId,

              bank:
                googlepaySelectedBank,
            },
          }

        );

      },4000);
    };

  useEffect(()=>{

    const handleGooglepayKeyDown=
      (e)=>{

        if(
          !googlepayShowPinPage
        )return;

        if(
          /^[0-9]$/.test(e.key)
        ){

          handleGooglepayPinInput(
            e.key
          );
        }

        if(
          e.key==="Backspace"
        ){

          handleGooglepayBackspace();
        }

        if(
          e.key==="Enter"
        ){

          handleGooglepayVerifyPin();
        }
      };

    window.addEventListener(

      "keydown",

      handleGooglepayKeyDown

    );

    return()=>{

      window.removeEventListener(

        "keydown",

        handleGooglepayKeyDown

      );
    };

  },[

    googlepayPin,

    googlepayShowPinPage

  ]);

  return(

    <div className="googlepay-main-container">

      <div

        className={`googlepay-card ${
          googlepayShowBankPage
            ? "googlepay-bank-page-card"
            : ""
        }`}

      >

        {!googlepayShowBankPage?(

          <div className="googlepay-loading-screen">

            <div className="googlepay-logo-circle">

              <img
                src="/gpay1.jpg"
                alt="gpay"
                className="googlepay-logo"
              />

            </div>

            <h1 className="googlepay-title">

              Google Pay

            </h1>

            <p className="googlepay-subtitle">

              Redirecting to Google Pay...

            </p>

            <div className="googlepay-loader-container">

              <FaCircleNotch className="googlepay-loader" />

            </div>

            <div className="googlepay-bottom">

              <p>

                Powered by

              </p>

              <img
                src="/upi2.png"
                alt="upi"
                className="googlepay-upi-logo"
              />

            </div>

          </div>

        ):!googlepayShowPinPage?(

          <>

            <div className="googlepay-bank-header">

              <div

                className="googlepay-back-btn"

                onClick={()=>
                  googlepayNavigate(
                    "/recharge"
                  )
                }

              >

                <FaArrowLeft />

              </div>

              <div className="googlepay-bank-header-center">

                <img
                  src="/upi2.png"
                  alt="upi"
                  className="googlepay-bank-upi-logo"
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

            <div className="googlepay-amount-box">

              <span>

                Amount

              </span>

              <h1>

                {googlepayAmount}

              </h1>

            </div>

            <div className="googlepay-dropdown-container">

              <div

                className="googlepay-dropdown-selected"

                onClick={()=>

                  setGooglepayShowDropdown(

                    !googlepayShowDropdown

                  )

                }

              >

                {googlepaySelectedBank?(

                  <div className="googlepay-selected-bank-info">

                    <div className="googlepay-selected-left">

                      <img
                        src={
                          googlepaySelectedBank.logo
                        }
                        alt="bank"
                        className="googlepay-bank-logo"
                      />

                      <div>

                        <h3>

                          {
                            googlepaySelectedBank.name
                          }

                        </h3>

                        <p>

                          {
                            googlepaySelectedBank.number
                          }

                        </p>

                      </div>

                    </div>

                  </div>

                ):(

                  <div className="googlepay-choose-bank-text">

                    <span>

                      Select your bank account

                    </span>

                  </div>

                )}

                <FaChevronDown

                  className={`googlepay-dropdown-arrow ${
                    googlepayShowDropdown
                      ? "googlepay-rotate-arrow"
                      : ""
                  }`}

                />

              </div>

              {googlepayShowDropdown&&(

                <div className="googlepay-dropdown-list">

                  {googlepayBanks.map(

                    (
                      bank,
                      index
                    )=>(

                      <div

                        className="googlepay-dropdown-item"

                        key={index}

                        onClick={()=>{

                          setGooglepayShowDropdown(
                            false
                          );

                          setTimeout(()=>{

                            setGooglepaySelectedBank(
                              bank
                            );

                          },500);

                        }}

                      >

                        <img
                          src={bank.logo}
                          alt="bank"
                          className="googlepay-bank-logo"
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

            <div className="googlepay-message-box">

              <label>

                Additional Message

              </label>

              <textarea
                placeholder="Enter your message..."
              />

            </div>

            <button

              className="googlepay-continue-btn"

              onClick={()=>{

                if(
                  !googlepaySelectedBank
                ){

                  alert(
                    "Please select your bank account"
                  );

                  return;
                }

                setGooglepayShowPinPage(
                  true
                );

              }}

            >

              Proceed Payment

            </button>

          </>

        ):googlepayShowProcessingPage?(

          <>

            <div className="googlepay-processing-page">

              <h2 className="googlepay-processing-title">

                Processing Payment

              </h2>

              <p className="googlepay-processing-subtitle">

                Please wait while we secure
                your payment

              </p>

              <div className="googlepay-processing-image-circle">

                <img
                  src="/secure-payment.webp"
                  alt="secure"
                  className="googlepay-processing-image"
                />

              </div>

              <div className="googlepay-processing-dots">

                {[0,1,2,3,4].map(
                  (dot)=>(

                    <div

                      key={dot}

                      className={`googlepay-dot ${
                        googlepayActiveDot===dot
                          ? "googlepay-active-dot"
                          : ""
                      }`}

                    />

                  )
                )}

              </div>

              <div className="googlepay-secure-box">

                <img
                  src="/secure.png"
                  alt="secure"
                  className="googlepay-secure-icon"
                />

                <span>

                  100% Secure

                </span>

              </div>

            </div>

          </>

        ):(

          <>

            <div className="googlepay-pin-page">

              <h2 className="googlepay-pin-title">

                Enter UPI PIN

              </h2>

              <div className="googlepay-pin-bank-card">

                <img
                  src={
                    googlepaySelectedBank.logo
                  }
                  alt="bank"
                  className="googlepay-pin-bank-logo"
                />

                <div>

                  <h3>

                    {
                      googlepaySelectedBank.name
                    }

                  </h3>

                  <p>

                    UPI ID:
                    {" "}
                    {
                      googlepaySelectedBank.upi
                    }

                  </p>

                </div>

              </div>

              <p className="googlepay-pin-label">

                Enter 6 digit UPI PIN

              </p>

              <div className="googlepay-pin-box-container">

                {[...Array(6)].map(

                  (_,index)=>(

                    <div

                      key={index}

                      className="googlepay-pin-box"

                    >

                      {
                        googlepayPin[index]
                          ? "•"
                          : ""
                      }

                    </div>

                  )

                )}

              </div>

              <div className="googlepay-pin-keypad">

                {[1,2,3,4,5,6,7,8,9].map(

                  (num)=>(

                    <button

                      key={num}

                      className="googlepay-key-btn"

                      onClick={()=>

                        handleGooglepayPinInput(
                          num.toString()
                        )

                      }

                    >

                      {num}

                    </button>

                  )

                )}

                <button

                  className="googlepay-key-btn"

                  onClick={
                    handleGooglepayBackspace
                  }

                >

                  <FaBackspace />

                </button>

                <button

                  className="googlepay-key-btn"

                  onClick={()=>

                    handleGooglepayPinInput(
                      "0"
                    )

                  }

                >

                  0

                </button>

                <button

                  className="googlepay-key-btn googlepay-success-btn"

                  onClick={()=>{

                    setTimeout(()=>{

                      handleGooglepayVerifyPin();

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

export default GooglePay;