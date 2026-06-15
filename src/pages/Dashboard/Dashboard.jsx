import React,{
  useEffect,
  useState,
} from "react";

import "./Dashboard.css";

import {
  useNavigate,
} from "react-router-dom";

import { HiSparkles } from "react-icons/hi2";

import {
  FaHome,
  FaWallet,
  FaGift,
  FaHistory,
  FaWifi,
  FaHeadset,
  FaSignOutAlt,
  FaBell,
  FaIdCard,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard=()=>{

  const navigate=useNavigate();

  const [loggedUser,setLoggedUser]=
    useState(
      JSON.parse(
        localStorage.getItem(
          "loggedUser"
        )
      )
    );

  useEffect(()=>{

    const updatedUser=
      JSON.parse(
        localStorage.getItem(
          "loggedUser"
        )
      );

    setLoggedUser(updatedUser);

  },[]);

  const formatDate=(date)=>{

    if(!date)return "-";

    return new Date(date)
      .toLocaleDateString(
        "en-GB",
        {
          day:"2-digit",
          month:"long",
          year:"numeric",
        }
      );
  };

  const today=new Date();

  const expiry=new Date(
    loggedUser?.expiryDate
  );

  const status=
    expiry>=today
      ? "Active"
      : "Deactive";

  const handleLogout=()=>{

    localStorage.removeItem(
      "loggedUser"
    );

    navigate("/");
  };

  return(

    <div className="dashboard-main-container">

      <div className="dashboard-wrapper">

        <div className="sidebar">

          <div className="logo-section">

            <img
              src="/logo.png"
              alt="logo"
              className="dashboard-logo"
            />

          </div>

          <div className="sidebar-menu">

            <button className="menu-btn active-menu">

              <FaHome />

              Dashboard

            </button>

            <button
              className="menu-btn"
              onClick={()=>
                navigate("/recharge")
              }
            >

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
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

        <div className="dashboard-content">

          <div className="topbar">

            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="7"
            >

              Connecting You...
              Entertaining You...

            </marquee>

            <FaBell className="bell-icon" />

          </div>

          <div className="dashboard-title">

            <h1>
              Your Entertainment,
              Your Control...
            </h1>

            <p className="welcome-text">

              Welcome back!
              Here are your
              account details.

              <HiSparkles className="welcome-icon" />

            </p>

          </div>

          <div className="dashboard-grid">

            <div className="details-card">

              <h2>
                User Details
              </h2>

              <div className="detail-row">

                <div className="detail-left">

                  <FaIdCard className="detail-icon" />

                  <span>
                    Serial / VC Number
                  </span>

                </div>

                <span className="detail-value">

                  {loggedUser?.serial}

                </span>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaUser className="detail-icon" />

                  <span>
                    Username
                  </span>

                </div>

                <span className="detail-value">

                  {loggedUser?.username}

                </span>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaPhoneAlt className="detail-icon" />

                  <span>
                    Phone Number
                  </span>

                </div>

                <span className="detail-value">

                  {loggedUser?.phone}

                </span>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaMapMarkerAlt className="detail-icon" />

                  <span>
                    Address
                  </span>

                </div>

                <span className="detail-value">

                  {loggedUser?.address}

                </span>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaBoxOpen className="detail-icon" />

                  <span>
                    Your Plan
                  </span>

                </div>

                <span className="detail-value">

                  {loggedUser?.plan}

                </span>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaCheckCircle className="detail-icon" />

                  <span>
                    Status
                  </span>

                </div>

                <div
                  className={
                    status==="Active"
                      ? "active-status"
                      : "deactive-status"
                  }
                >

                  <FaWifi />

                  <span>
                    {status}
                  </span>

                </div>

              </div>

              <div className="detail-row">

                <div className="detail-left">

                  <FaCalendarAlt className="detail-icon" />

                  <span>
                    Validity
                  </span>

                </div>

                <span className="detail-value">

                  {formatDate(
                    loggedUser?.rechargeDate
                  )}

                  {" "}to{" "}

                  {formatDate(
                    loggedUser?.expiryDate
                  )}

                </span>

              </div>

            </div>

            <div className="right-side">

              <div className="status-card">

                <h2>
                  Connection Status
                </h2>

                <div
                  className={
                    status==="Active"
                      ? "connection-active"
                      : "connection-deactive"
                  }
                >

                  <FaWifi />

                  <span>
                    {status}
                  </span>

                </div>

                <p>

                  {status==="Active"
                    ? "Your connection is active and running smoothly."
                    : "Your connection is currently inactive."}

                </p>

              </div>

              <div className="quick-actions">

                <h2>
                  Quick Actions
                </h2>

                <div className="action-grid">

                  <button
                    className="action-btn"
                    onClick={()=>
                      navigate(
                        "/recharge"
                      )
                    }
                  >

                    <FaWallet />

                    Recharge Now

                  </button>

                  <button
                    className="action-btn"
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
                    className="action-btn"
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
                    className="action-btn"
                    onClick={()=>
                      navigate(
                        "/contact-support"
                      )
                    }
                  >

                    <FaHeadset />

                    Contact Support

                  </button>

                </div>

              </div>

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

export default Dashboard;