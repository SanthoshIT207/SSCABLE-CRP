import React,{
  useState,
  useEffect,
} from "react";

import "./TicInternet.css";

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
  FaTachometerAlt,
  FaShieldAlt,
  FaInfinity,
  FaUsers,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";

const TicInternet=()=>{

  const navigate=
    useNavigate();

  const [
    customerCount,
    setCustomerCount,
  ]=useState(0);

  useEffect(()=>{

    let count=0;

    const interval=
      setInterval(()=>{

        count++;

        setCustomerCount(
          count
        );

        if(count>=50){

          clearInterval(
            interval
          );
        }

      },40);

    return()=>
      clearInterval(
        interval
      );

  },[]);

  const internetPlans=[

    {
      id:1,
      plan:
        "TIC_WOT_20MBPS_UL_299_12M",
      status:"Active",
      customers:4,
    },

    {
      id:2,
      plan:
        "TIC_93M_150Mbps_UL_999",
      status:"Active",
      customers:3,
    },

    {
      id:3,
      plan:
        "TIC_RE_93_200Mbps_UL_999",
      status:"Active",
      customers:5,
    },

    {
      id:4,
      plan:
        "TIC_SILVER_40MBPS_UL_399_6M",
      status:"Active",
      customers:6,
    },

    {
      id:5,
      plan:
        "TIC_NEW_30Mbps_UL_399",
      status:"Active",
      customers:7,
    },

    {
      id:6,
      plan:
        "TIC_NEW_150Mbps_UL_999",
      status:"Active",
      customers:8,
    },

    {
      id:7,
      plan:
        "TIC_NEW_50Mbps_UL_499",
      status:"Active",
      customers:5,
    },

    {
      id:8,
      plan:
        "TIC_DIAMOND_100MBPS_UL_599",
      status:"Active",
      customers:12,
    },

    {
      id:9,
      plan:
        "TIC_PLATINUM_150MBPS_UL_666",
      status:"Active",
      customers:4,
    },

    {
      id:10,
      plan:
        "TIC_SILVER_40MBPS_UL_399",
      status:"Active",
      customers:10,
    },

  ];

  const handleLogout=()=>{

    localStorage.removeItem(
      "loggedUser"
    );

    navigate("/");
  };

  return(

    <div className="tic-main-container">

      <div className="tic-wrapper">

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
                navigate("/dashboard")
              }
            >

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

            <button className="menu-btn active-menu">

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

        <div className="tic-content">

          <div className="topbar">

            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="6"
            >

              Connecting You...
              Entertaining You...

            </marquee>

            <FaBell className="bell-icon" />

          </div>

          <div className="banner-container">

            <div className="banner-scroll">

              <div className="banner-track">

                <img
                  src="/bannertic.png"
                  alt="tic-banner"
                  className="tic-banner"
                />

                <img
                  src="/ticplan.png"
                  alt="tic-plan"
                  className="tic-banner"
                />

                <img
                  src="/bannertic.png"
                  alt="tic-banner"
                  className="tic-banner"
                />

                <img
                  src="/ticplan.png"
                  alt="tic-plan"
                  className="tic-banner"
                />

              </div>

            </div>

          </div>

          <div className="internet-info-box">

            <div className="info-left">

              <div className="info-icon">

                <FaWifi />

              </div>

              <div>

                <h2>

                  More Than Just Cable TV!

                </h2>

                <p>

                  We provide high-speed
                  internet connectivity to
                  keep you connected,
                  entertained, and ahead
                  in the digital world.

                </p>

              </div>

            </div>

            <div className="info-right">

              <div className="customer-icon">

                <FaUsers />

              </div>

              <div>

                <h1>

                  {customerCount}+

                </h1>

                <h3>

                  Happy Customers

                </h3>

                <p>

                  are already enjoying
                  our high-speed internet
                  services!

                </p>

              </div>

            </div>

          </div>

          <div className="features-box">

            <div className="feature-card">

              <div className="feature-icon">

                <FaTachometerAlt />

              </div>

              <div>

                <h3>

                  High Speed

                </h3>

                <p>

                  Experience blazing
                  fast internet.

                </p>

              </div>

            </div>

            <div className="feature-card">

              <div className="feature-icon">

                <FaShieldAlt />

              </div>

              <div>

                <h3>

                  Reliable Connection

                </h3>

                <p>

                  Stable and
                  uninterrupted
                  connectivity.

                </p>

              </div>

            </div>

            <div className="feature-card">

              <div className="feature-icon">

                <FaInfinity />

              </div>

              <div>

                <h3>

                  Unlimited Data

                </h3>

                <p>

                  Enjoy seamless
                  browsing.

                </p>

              </div>

            </div>

            <div className="feature-card">

              <div className="feature-icon">

                <FaHeadset />

              </div>

              <div>

                <h3>

                  24/7 Support

                </h3>

                <p>

                  We're here for you
                  anytime.

                </p>

              </div>

            </div>

          </div>

          <div className="plans-container">

            <h1>

              Internet Plans

            </h1>

            <div className="plan-header">

              <span>#</span>

              <span>Plan</span>

              <span>Status</span>

              <span>

                No Of Customers

              </span>

            </div>

            {internetPlans.map(
              (plan)=>(

                <div
                  className="plan-row"
                  key={plan.id}
                >

                  <span>

                    {String(
                      plan.id
                    ).padStart(
                      2,
                      "0"
                    )}

                  </span>

                  <span>

                    {plan.plan}

                  </span>

                  <span className="active-badge">

                    {plan.status}

                  </span>

                  <span>

                    {plan.customers}

                  </span>

                </div>

              )
            )}

          </div>

          <div className="bottom-info-box">

            <div className="bottom-item">

              <FaFileAlt className="bottom-icon" />

              <h2>

                Total Plans:
                {" "}
                {internetPlans.length}

              </h2>

            </div>

            <div className="join-section">

              <div>

                <h2>

                  Want to join with us?

                </h2>

                <p>

                  Experience the best
                  internet connection
                  with SS Cable Network
                  today!

                </p>

              </div>

              <button
                className="join-btn"
                onClick={()=>
                  navigate(
                    "/contact-support"
                  )
                }
              >

                Join With Us

                <FaArrowRight />

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

export default TicInternet;