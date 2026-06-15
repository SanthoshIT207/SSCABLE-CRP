import React, {
  useEffect,
  useState,
} from "react";

import "./PhonePe.css";

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

const PhonePe = () => {

  const navigate = useNavigate();

  const [
    phonepeShowBankPage,
    setPhonepeShowBankPage,
  ] = useState(false);

  const [
    phonepeSelectedBank,
    setPhonepeSelectedBank,
  ] = useState(null);

  const [
    phonepeShowDropdown,
    setPhonepeShowDropdown,
  ] = useState(false);

  const [
    phonepeShowPinPage,
    setPhonepeShowPinPage,
  ] = useState(false);

  const [
    phonepeShowProcessingPage,
    setPhonepeShowProcessingPage,
  ] = useState(false);

  const [
    phonepeActiveDot,
    setPhonepeActiveDot,
  ] = useState(0);

  const [
    phonepePin,
    setPhonepePin,
  ] = useState("");

  /* USER DATA */

  const userData =
    JSON.parse(
      localStorage.getItem(
        "loggedUser"
      )
    ) || {};

  const amount =
    userData.price ||
    userData.amount ||
    "₹399";

  /* AUTO REDIRECT */

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setPhonepeShowBankPage(true);

      }, 3500);

    return () =>
      clearTimeout(timer);

  }, []);

  /* BANKS */

  const phonepeBanks = [

    {
      name:
        "State Bank Of India - 3254",

      number:
        "****8961234",

      upi:
        "sbi3254@ybl",

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
        "icici7845@icici",

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
        "axis9123@axisbank",

      logo:
        "/axis.png",

      pin:
        "445566",
    },

  ];

  /* HANDLE PIN */

  const handlePhonepePinInput = (
    num
  ) => {

    if(phonepePin.length < 6){

      setPhonepePin(
        phonepePin + num
      );
    }
  };

  /* BACKSPACE */

  const handlePhonepeBackspace = () => {

    setPhonepePin(
      phonepePin.slice(0, -1)
    );
  };

  /* VERIFY PIN */

  const handlePhonepeVerifyPin = () => {

    if(phonepePin.length !== 6){

      alert(
        "Please enter 6 digit UPI PIN"
      );

      return;
    }

    if(
      phonepePin !==
      phonepeSelectedBank.pin
    ){

      alert(
        "Please enter valid UPI PIN"
      );

      setPhonepePin("");

      return;
    }

    setPhonepeShowProcessingPage(true);

    let dot = 0;

    const interval =
      setInterval(() => {

        dot++;

        setPhonepeActiveDot(
          dot % 5
        );

      }, 500);

    setTimeout(() => {

      clearInterval(interval);

      /* TRANSACTION ID */

      const transactionId =
        "PP" +
        Date.now() +
        Math.floor(
          1000 +
          Math.random() * 9000
        );

      /* DATE LOGIC */

      const today =
        new Date();

      const oldExpiry =
        new Date(
          userData?.expiryDate
        );

      let newRechargeDate;

      let newExpiryDate;

      /* ACTIVE */

      if(oldExpiry >= today){

        newRechargeDate =
          userData?.rechargeDate;

        newExpiryDate =
          new Date(oldExpiry);

        newExpiryDate.setDate(
          newExpiryDate.getDate() + 30
        );

      } else {

        /* EXPIRED */

        newRechargeDate =
          today.toISOString();

        newExpiryDate =
          new Date(today);

        newExpiryDate.setDate(
          newExpiryDate.getDate() + 30
        );
      }

      /* UPDATED USER */

      const updatedUser = {

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
          phonepeSelectedBank.name,

        paymentDate:
          new Date()
            .toLocaleString(
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

      /* SAVE LOGGED USER */

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(
          updatedUser
        )
      );

      /* UPDATE USERS */

      const allUsers =
        JSON.parse(
          localStorage.getItem(
            "users"
          )
        ) || [];

      const updatedUsers =
        allUsers.map(
          (user) => {

            if(
              user.serial ===
              updatedUser.serial
            ){

              return updatedUser;
            }

            return user;
          }
        );

      localStorage.setItem(
        "users",
        JSON.stringify(
          updatedUsers
        )
      );

      /* PAYMENT HISTORY */

      const oldPayments =
        JSON.parse(
          localStorage.getItem(
            "paymentHistory"
          )
        ) || [];

   const newPayment = {
serial:
  updatedUser.serial,

username:
  updatedUser.username,
  transactionId,

  amount,

  plan:
    userData?.plan ||

    "Basic Plan",

  paymentMethod:
    "PhonePe",

  paymentIcon:
    "/phonepay.png",

  bankName:
    phonepeSelectedBank.name,

  bankLogo:
    phonepeSelectedBank.logo,

  status:
    "Success",

  validity:
    "30 Days",

  date:
    updatedUser.paymentDate,
};

      const alreadyExists =
  oldPayments.some(
    (payment) =>
      payment.transactionId ===
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

      /* SUCCESS PAGE */

      navigate(
        "/phonepe-success",
        {
          state: {

            amount,

            transactionId,

            bank:
              phonepeSelectedBank,
          },
        }
      );

    }, 4000);
  };

  /* KEYBOARD SUPPORT */

  useEffect(() => {

    const handlePhonepeKeyDown =
      (e) => {

        if(
          !phonepeShowPinPage
        ) return;

        if(
          /^[0-9]$/.test(
            e.key
          )
        ){

          handlePhonepePinInput(
            e.key
          );
        }

        if(
          e.key ===
          "Backspace"
        ){

          handlePhonepeBackspace();
        }

        if(
          e.key ===
          "Enter"
        ){

          handlePhonepeVerifyPin();
        }
      };

    window.addEventListener(
      "keydown",
      handlePhonepeKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handlePhonepeKeyDown
      );
    };

  }, [
    phonepePin,
    phonepeShowPinPage,
  ]);

  return (

    <div className="phonepe-main-container">

      <div
        className={`phonepe-card ${
          phonepeShowBankPage
            ? "phonepe-bank-page-card"
            : ""
        }`}
      >

        {!phonepeShowBankPage ? (

          <div className="phonepe-loading-screen">

            <div className="phonepe-logo-circle">

              <img
                src="/phonepay.png"
                alt="phonepe"
                className="phonepe-logo"
              />

            </div>

            <h1 className="phonepe-title">

              PhonePe

            </h1>

            <p className="phonepe-subtitle">

              Redirecting to PhonePe...

            </p>

            <div className="phonepe-loader-container">

              <FaCircleNotch className="phonepe-loader" />

            </div>

            <div className="phonepe-bottom">

              <p>

                Powered by

              </p>

              <img
                src="/upi1.png"
                alt="upi"
                className="phonepe-upi-logo"
              />

            </div>

          </div>

        ) : !phonepeShowPinPage ? (

          <>

            <div className="phonepe-bank-header">

              <div
                className="phonepe-back-btn"
                onClick={() =>
                  navigate(
                    "/recharge"
                  )
                }
              >

                <FaArrowLeft />

              </div>

              <div className="phonepe-bank-header-center">

                <img
                  src="/upi1.png"
                  alt="upi"
                  className="phonepe-bank-upi-logo"
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

            <div className="phonepe-amount-box">

              <span>

                Amount

              </span>

              <h1>

                {amount}

              </h1>

            </div>

            <div className="phonepe-dropdown-container">

              <div
                className="phonepe-dropdown-selected"
                onClick={() =>
                  setPhonepeShowDropdown(
                    !phonepeShowDropdown
                  )
                }
              >

                {phonepeSelectedBank ? (

                  <div className="phonepe-selected-bank-info">

                    <div className="phonepe-selected-left">

                      <img
                        src={phonepeSelectedBank.logo}
                        alt="bank"
                        className="phonepe-bank-logo"
                      />

                      <div>

                        <h3>

                          {phonepeSelectedBank.name}

                        </h3>

                        <p>

                          {phonepeSelectedBank.number}

                        </p>

                      </div>

                    </div>

                  </div>

                ) : (

                  <div className="phonepe-choose-bank-text">

                    <span>

                      Select your bank account

                    </span>

                  </div>

                )}

                <FaChevronDown
                  className={`phonepe-dropdown-arrow ${
                    phonepeShowDropdown
                      ? "phonepe-rotate-arrow"
                      : ""
                  }`}
                />

              </div>

              {phonepeShowDropdown && (

                <div className="phonepe-dropdown-list">

                  {phonepeBanks.map(
                    (
                      bank,
                      index
                    ) => (

                      <div
                        className="phonepe-dropdown-item"
                        key={index}
                        onClick={() => {

                          setPhonepeShowDropdown(false);

                          setTimeout(() => {

                            setPhonepeSelectedBank(bank);

                          }, 300);
                        }}
                      >

                        <img
                          src={bank.logo}
                          alt="bank"
                          className="phonepe-bank-logo"
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

            <div className="phonepe-message-box">

              <label>

                Additional Message

              </label>

              <textarea
                placeholder="Enter your message..."
              />

            </div>

            <button
              className="phonepe-continue-btn"
              onClick={() => {

                if(
                  !phonepeSelectedBank
                ){

                  alert(
                    "Please select your bank account"
                  );

                  return;
                }

                setPhonepeShowPinPage(true);

              }}
            >

              Proceed Payment

            </button>

          </>

        ) : phonepeShowProcessingPage ? (

          <div className="phonepe-processing-page">

            <h2 className="phonepe-processing-title">

              Processing Payment

            </h2>

            <p className="phonepe-processing-subtitle">

              Please wait while securing your payment

            </p>

            <div className="phonepe-processing-image-circle">

              <img
                src="/secure-payment.webp"
                alt="secure"
                className="phonepe-processing-image"
              />

            </div>

            <div className="phonepe-processing-dots">

              {[0,1,2,3,4].map(
                (dot) => (

                  <div
                    key={dot}
                    className={`phonepe-dot ${
                      phonepeActiveDot === dot
                        ? "phonepe-active-dot"
                        : ""
                    }`}
                  />

                )
              )}

            </div>

            <div className="phonepe-secure-box">

              <img
                src="/secure.png"
                alt="secure"
                className="phonepe-secure-icon"
              />

              <span>

                100% Secure

              </span>

            </div>

          </div>

        ) : (

          <div className="phonepe-pin-page">

            <h2 className="phonepe-pin-title">

              Enter UPI PIN

            </h2>

            <div className="phonepe-pin-bank-card">

              <img
                src={phonepeSelectedBank.logo}
                alt="bank"
                className="phonepe-pin-bank-logo"
              />

              <div>

                <h3>

                  {phonepeSelectedBank.name}

                </h3>

                <p>

                  UPI ID:
                  {" "}
                  {phonepeSelectedBank.upi}

                </p>

              </div>

            </div>

            <p className="phonepe-pin-label">

              Enter 6 digit UPI PIN

            </p>

            <div className="phonepe-pin-box-container">

              {[...Array(6)].map(
                (_, index) => (

                  <div
                    key={index}
                    className="phonepe-pin-box"
                  >

                    {phonepePin[index]
                      ? "•"
                      : ""}

                  </div>

                )
              )}

            </div>

            <div className="phonepe-pin-keypad">

              {[1,2,3,4,5,6,7,8,9].map(
                (num) => (

                  <button
                    key={num}
                    className="phonepe-key-btn"
                    onClick={() =>
                      handlePhonepePinInput(
                        num.toString()
                      )
                    }
                  >

                    {num}

                  </button>

                )
              )}

              <button
                className="phonepe-key-btn"
                onClick={
                  handlePhonepeBackspace
                }
              >

                <FaBackspace />

              </button>

              <button
                className="phonepe-key-btn"
                onClick={() =>
                  handlePhonepePinInput("0")
                }
              >

                0

              </button>

              <button
                className="phonepe-key-btn phonepe-success-btn"
                onClick={() => {

                  setTimeout(() => {

                    handlePhonepeVerifyPin();

                  }, 200);

                }}
              >

                <FaCheck />

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default PhonePe;