import React,{ useState } from "react";

import "./Recharge.css";

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
  FaUser,
  FaIdCard,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Recharge=()=>{

  const navigate=useNavigate();

  const [
    selectedPayment,
    setSelectedPayment,
  ]=useState("");

  const [
    selectedUpiApp,
    setSelectedUpiApp,
  ]=useState("");

  const loggedUser=JSON.parse(
    localStorage.getItem(
      "loggedUser"
    )
  );

  const currentUser=loggedUser;

  const today=new Date();

  const expiryDate=new Date(
    currentUser?.expiryDate
  );

  const rechargeDate=new Date(
    currentUser?.rechargeDate
  );

  const isActive=
    expiryDate>=today;

  const timeDifference=
    expiryDate-today;

  const daysLeft=Math.ceil(
    timeDifference/
      (1000*60*60*24)
  );

  let validityMessage="";

  if(isActive){

    if(daysLeft<=1){

      validityMessage=
        "Recharge Available";

    }else{

      validityMessage=
        `${daysLeft} Days Left`;
    }

  }else{

    validityMessage=
      "Validity Expired";
  }

  const formatDate=(
    dateValue
  )=>{

    const date=new Date(
      dateValue
    );

    return date.toLocaleDateString(
      "en-GB"
    );
  };

  const handleLogout=()=>{

    localStorage.removeItem(
      "loggedUser"
    );

    navigate("/");
  };

  const handleProceedPayment=()=>{

    if(!selectedPayment){

      alert(
        "Please select payment method"
      );

      return;
    }

    if(
      selectedPayment===
        "otherupi"&&
      !selectedUpiApp
    ){

      alert(
        "Please select UPI app"
      );

      return;
    }

    if(
      selectedPayment==="otherupi"&&
      selectedUpiApp==="phonepe"
    ){

      navigate("/phonepe",{

        state:{

          username:
            currentUser?.username,

          plan:
            currentUser?.plan,

          price:
            currentUser?.price,

          serial:
            currentUser?.serial,
        },
      });

      return;
    }

    if(
      selectedPayment==="otherupi"&&
      selectedUpiApp==="paytm"
    ){

      navigate("/paytm",{

        state:{

          username:
            currentUser?.username,

          plan:
            currentUser?.plan,

          price:
            currentUser?.price,

          serial:
            currentUser?.serial,
        },
      });

      return;
    }

    if(
      selectedPayment==="otherupi"&&
      selectedUpiApp==="gpay"
    ){

      navigate("/googlepay",{

        state:{

          username:
            currentUser?.username,

          plan:
            currentUser?.plan,

          price:
            currentUser?.price,

          serial:
            currentUser?.serial,
        },
      });

      return;
    }

    navigate("/payment",{

      state:{

        username:
          currentUser?.username,

        plan:
          currentUser?.plan,

        price:
          currentUser?.price,

        serial:
          currentUser?.serial,
      },
    });
  };

  const handlePaymentSelect=(
    paymentType
  )=>{

    setSelectedPayment(
      paymentType
    );

    if(
      paymentType!==
      "otherupi"
    ){

      setSelectedUpiApp(
        ""
      );
    }
  };

  return(

    <div className="recharge-main-container">

      <div className="recharge-wrapper">

        <div className="sidebar">

          <div className="logo-section">

            <img
              src="/logo.png"
              alt="logo"
              className="dashboard-logo"
            />

          </div>

          <div className="sidebar-menu">

            <button
              className="menu-btn"
              onClick={()=>
                navigate(
                  "/dashboard"
                )
              }
            >

              <FaHome />

              Dashboard

            </button>

            <button className="menu-btn active-menu">

              <FaWallet />

              Recharge

            </button>

            <button
              className="menu-btn"
              onClick={()=>
                navigate(
                  "/view-packages"
                )
              }
            >

              <FaGift />

              View Packages

            </button>

            <button
              className="menu-btn"
              onClick={()=>
                navigate(
                  "/payment-history"
                )
              }
            >

              <FaHistory />

              Payment History

            </button>

            <button
              className="menu-btn"
              onClick={()=>
                navigate(
                  "/tic-internet"
                )
              }
            >

              <FaWifi />

              TIC - INTERNET

            </button>

            <button
              className="menu-btn"
              onClick={()=>
                navigate(
                  "/contact-support"
                )
              }
            >

              <FaHeadset />

              Contact Us

            </button>

            <button
              className="menu-btn logout-btn"
              onClick={
                handleLogout
              }
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

        <div className="recharge-content">

          <div className="topbar">

            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="5"
            >

              Connecting You...
              Entertaining You...

            </marquee>

            <FaBell className="bell-icon" />

          </div>

          <div className="recharge-page-container">

            <div className="connection-card">

              <div className="connection-title-box">

                <FaIdCard className="connection-main-icon" />

                <div>

                  <h2>

                    Connection Information

                  </h2>

                  <div className="title-line"></div>

                </div>

              </div>

              <div className="details-table">

                <div className="detail-row">

                  <div className="detail-label">

                    <FaUser />

                    <span>

                      Customer Name

                    </span>

                  </div>

                  <div className="detail-value blue-text">

                    {currentUser?.username}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaIdCard />

                    <span>

                      Serial / VC Number

                    </span>

                  </div>

                  <div className="detail-value blue-text">

                    {currentUser?.serial}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaPhoneAlt />

                    <span>

                      Phone Number

                    </span>

                  </div>

                  <div className="detail-value blue-text">

                    {currentUser?.phone}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaMapMarkerAlt />

                    <span>

                      Address

                    </span>

                  </div>

                  <div className="detail-value blue-text">

                    {currentUser?.address}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaWifi />

                    <span>

                      Current Plan

                    </span>

                  </div>

                  <div className="detail-value blue-text">

                    {currentUser?.plan}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaRupeeSign />

                    <span>

                      Current Plan Price

                    </span>

                  </div>

                  <div className="detail-value green-text">

                    {currentUser?.price}

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    <FaCalendarAlt />

                    <span>

                      Validity

                    </span>

                  </div>

                  <div className="detail-value validity-flex">

                    <span>

                      {formatDate(
                        rechargeDate
                      )}

                    </span>

                    <span className="to-text">

                      to

                    </span>

                    <span>

                      {formatDate(
                        expiryDate
                      )}

                    </span>

                    <span
                      className={
                        isActive
                          ? "validity-badge active-validity"
                          : "validity-badge expired-validity"
                      }
                    >

                      {validityMessage}

                    </span>

                  </div>

                </div>

                <div className="detail-row">

                  <div className="detail-label">

                    {isActive?(
                      <FaCheckCircle />
                    ):(
                      <FaTimesCircle />
                    )}

                    <span>

                      Connection Status

                    </span>

                  </div>

                  <div className="detail-value">

                    <span
                      className={
                        isActive
                          ? "status-badge active-status"
                          : "status-badge inactive-status"
                      }
                    >

                      {isActive
                        ? "Active"
                        : "Deactive"}

                    </span>

                  </div>

                </div>

              </div>

              <div className="payment-method-container">

                <div className="payment-title">

                  <FaWallet className="payment-title-icon" />

                  <h2>

                    Select Payment Method

                  </h2>

                </div>

                <div className="payment-grid">

                  <label
                    className={`payment-card ${
                      selectedPayment===
                      "upi"
                        ? "active-payment"
                        : ""
                    }`}
                    onClick={()=>
                      handlePaymentSelect(
                        "upi"
                      )
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={
                        selectedPayment===
                        "upi"
                      }
                      onChange={()=>{}}
                    />

                    <img
                      src="/upi.png"
                      alt="upi"
                      className="payment-image"
                    />

                    <h3>

                      UPI Payments

                    </h3>

                    <p>

                      Pay using any UPI app

                    </p>

                  </label>

                  <label
                    className={`payment-card ${
                      selectedPayment===
                      "card"
                        ? "active-payment"
                        : ""
                    }`}
                    onClick={()=>
                      handlePaymentSelect(
                        "card"
                      )
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={
                        selectedPayment===
                        "card"
                      }
                      onChange={()=>{}}
                    />

                    <img
                      src="/creditcard.png"
                      alt="card"
                      className="payment-image"
                    />

                    <h3>

                      Credit / Debit Card

                    </h3>

                    <p>

                      Visa, MasterCard, Rupay

                    </p>

                  </label>

                  <label
                    className={`payment-card ${
                      selectedPayment===
                      "netbanking"
                        ? "active-payment"
                        : ""
                    }`}
                    onClick={()=>
                      handlePaymentSelect(
                        "netbanking"
                      )
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={
                        selectedPayment===
                        "netbanking"
                      }
                      onChange={()=>{}}
                    />

                    <img
                      src="/netbanking.png"
                      alt="netbanking"
                      className="payment-image"
                    />

                    <h3>

                      Net Banking

                    </h3>

                    <p>

                      All major banks supported

                    </p>

                  </label>

                  <label
                    className={`payment-card ${
                      selectedPayment===
                      "otherupi"
                        ? "active-payment"
                        : ""
                    }`}
                    onClick={()=>
                      handlePaymentSelect(
                        "otherupi"
                      )
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      checked={
                        selectedPayment===
                        "otherupi"
                      }
                      onChange={()=>{}}
                    />

                    <img
                      src="/otherupi.png"
                      alt="otherupi"
                      className="payment-image"
                    />

                    <h3>

                      Other UPI

                    </h3>

                    <p>

                      Pay using other UPI apps

                    </p>

                  </label>

                </div>

                {selectedPayment===
                  "otherupi"&&(

                  <div className="upi-apps-container">

                    <h3 className="upi-apps-title">

                      Pay Using UPI Apps

                    </h3>

                    <div className="upi-apps-grid">

                      <label
                        className={`upi-app-card ${
                          selectedUpiApp===
                          "phonepe"
                            ? "active-upi-app"
                            : ""
                        }`}
                        onClick={()=>
                          setSelectedUpiApp(
                            "phonepe"
                          )
                        }
                      >

                        <input
                          type="radio"
                          name="upiapp"
                          checked={
                            selectedUpiApp===
                            "phonepe"
                          }
                          onChange={()=>{}}
                        />

                        <img
                          src="/phonepe.png"
                          alt="phonepe"
                          className="upi-app-image"
                        />

                        <span>

                          PhonePe

                        </span>

                      </label>

                      <label
                        className={`upi-app-card ${
                          selectedUpiApp===
                          "paytm"
                            ? "active-upi-app"
                            : ""
                        }`}
                        onClick={()=>
                          setSelectedUpiApp(
                            "paytm"
                          )
                        }
                      >

                        <input
                          type="radio"
                          name="upiapp"
                          checked={
                            selectedUpiApp===
                            "paytm"
                          }
                          onChange={()=>{}}
                        />

                        <img
                          src="/paytm.png"
                          alt="paytm"
                          className="upi-app-image"
                        />

                        <span>

                          Paytm

                        </span>

                      </label>

                      <label
                        className={`upi-app-card ${
                          selectedUpiApp===
                          "gpay"
                            ? "active-upi-app"
                            : ""
                        }`}
                        onClick={()=>
                          setSelectedUpiApp(
                            "gpay"
                          )
                        }
                      >

                        <input
                          type="radio"
                          name="upiapp"
                          checked={
                            selectedUpiApp===
                            "gpay"
                          }
                          onChange={()=>{}}
                        />

                        <img
                          src="/gpay.png"
                          alt="gpay"
                          className="upi-app-image"
                        />

                        <span>

                          Google Pay

                        </span>

                      </label>

                    </div>

                  </div>

                )}

              </div>

              <div className="payment-info-box">

                <div className="payment-info-left">

                  <FaCheckCircle className="payment-info-icon" />

                  <p>

                    Recharge can be done
                    before one day of expiry
                    or after expiry.

                  </p>

                </div>

              </div>

              <button
                className="pay-now-btn"
                onClick={
                  handleProceedPayment
                }
              >

                <img
                  src="/lock.png"
                  alt="lock"
                  className="pay-lock-icon"
                />

                Proceed to Pay Securely

              </button>

            </div>

          </div>

          <div className="dashboard-footer">

            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="5"
            >

              © SS Cable Network 2026.
              All Rights Reserved.

            </marquee>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Recharge;