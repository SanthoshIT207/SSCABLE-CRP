import React, { useState } from "react";

import "./ViewPackages.css";

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
  FaEye,
  FaTv,
} from "react-icons/fa";

const ViewPackages = () => {

  const navigate = useNavigate();

  const [selectedChannels, setSelectedChannels] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const packages = [

     {
    id: 1,

    name: "TCCL PREMIUM HD PACK",

    amount: "₹ 549.60",

    channelsCount: 105,

    status: "Advance",

    channelsPreview: [
      "Sun TV",
      "Star Vijay",
      "Zee Tamil",
      "Colors Tamil",
      "KTV",
    ],

    allChannels: [
      "ADITHYA TV",
      "SUN TV HD",
      "CHUTTI TV",
      "KTV HD",
      "SUN LIFE",
      "SUN MUSIC HD",
      "SUN NEWS",
      "JAYA TV HD",
      "J MOVIES",
      "JAYA MAX",
      "JAYA PLUS",
      "SONY BBC EARTH HD",
      "SONY YAY",
      "SONY PIX HD",
      "SONY TEN 1 HD",
      "SONY MAX 1",
      "SONY MAX 2",
      "SONY MAX HD",
      "SONY AATH",
      "SONY MARATHI",
      "COLORS INFINITY HD",
      "HISTORY TV18 HD",
      "NAT GEO WILD HD",
      "NGC HD",
      "DISNEY JUNIOR",
      "HUNGAMA TV",
      "NICK",
      "NICK HD",
      "NICK JUNIOR",
      "SONIC",
      "SUPER HUNGAMA",
      "STAR MOVIES HD",
      "STAR MOVIES SELECT HD",
      "CNBC TV 18",
      "CNBC TV18 PRIME HD",
      "CNN NEWS 18",
      "STAR SPORTS 1 HD",
      "STAR SPORTS 2 HD",
      "Star Sports 2 Tamil HD",
      "STAR SPORTS 3",
      "STAR SPORTS KHEL",
      "STAR SPORTS SELECT HD 1",
      "STAR SPORTS SELECT HD 2",
      "DISNEY CHANNEL HD",
      "STAR SPORTS 1 TAMIL HD",
      "VIJAY SUPER HD",
      "VIJAY TAKKAR",
      "COLORS TAMIL HD",
      "NEWS18 TAMILNADU",
      "BBC CBEEBIES",
      "BBC WORLD NEWS",
      "DISCOVERY SCIENCE",
      "ANIMAL PLANET HD",
      "DISCOVERY HD WORLD",
      "DISCOVERY TURBO",
      "TLC HD",
      "CARTOON NETWORK",
      "CARTOON NETWORK HD PLUS",
      "DISCOVERY KIDS",
      "POGO",
      "DISCOVERY TAMIL",
      "ETV BAL BHARAT",
      "MN PLUS HD",
      "MNX HD",
      "MOVIES NOW HD",
      "ROMEDY NOW",
      "ET NOW SWADESH",
      "MIRROR NOW",
      "TIMES NOW",
      "TIMES NOW WORLD HD",
      "ZOOM TV",
      "ET NOW",
      "Times Now Navbharath HD",
      "INDIA TODAY",
      "AAJ TAK HD",
      "UNITE8 SPORTS 1 HD",
      "UNITE8 SPORTS 2 HD",
      "ZEE ZEST HD",
      "ZEE TV HD",
      "& PICTURES HD",
      "ZEE BOLLYWOOD",
      "ZEE CINEMA HD",
      "ZING",
      "ZEE TAMIL HD",
      "ZEE THIRAI HD",
      "NDTV GOOD TIMES",
      "NDTV 24X7",
      "NDTV PROFIT",
      "NDTV INDIA",
      "RAJ NAGAICHUVAI",
      "RAJ TV",
      "RAJ DIGITAL PLUS",
      "RAJ MUSIX",
      "RAJ NEWS",
      "MEGA 24",
      "MEGA TV",
      "MEGA MUSIC",
      "TRAVEL XP HD",
      "GUBBARE",
      "SIRIPOLI",
      "KALAIGNAR TV",
      "CHITHIRAM",
      "ISAI ARUVI",
      "MURASU TV",
      "SEITHIGAL",
    ],
  },

  {
    id: 2,

    name: "TCCL CLASSIC PACK",

    amount: "₹ 210.94",

    channelsCount: 92,

    status: "Base Pack",

    channelsPreview: [
      "DD Podhigai",
      "Mega TV",
      "Jaya TV",
      "Polimer News",
      "News18 Tamil",
    ],

    allChannels: [
      "EUROSPORT",
      "ET NOW",
      "ZOOM TV",
      "TIMES NOW",
      "MIRROR NOW",
      "ET NOW SWADESH",
      "ROMEDY NOW",
      "MOVIES NOW",
      "MNX",
      "ETV BAL BHARAT",
      "DISCOVERY TAMIL",
      "INDIA TODAY",
      "TLC",
      "DISCOVERY",
      "ANIMAL PLANET",
      "POGO",
      "DISCOVERY KIDS",
      "CARTOON NETWORK",
      "INVESTIGATION DISCOVERY",
      "ADITHYA TV",
      "DISCOVERY SCIENCE",
      "BBC WORLD NEWS",
      "NDTV PROFIT",
      "GUBBARE",
      "MEGA MUSIC",
      "MEGA TV",
      "MEGA 24",
      "RAJ NEWS",
      "RAJ MUSIX",
      "RAJ DIGITAL PLUS",
      "RAJ TV",
      "RAJ NAGAICHUVAI",
      "NDTV INDIA",
      "DISCOVERY TURBO",
      "NDTV 24X7",
      "NDTV GOOD TIMES",
      "ZEE THIRAI",
      "ZEE TAMIL",
      "ZING",
      "ZEE BOLLYWOOD",
      "UNITE8 SPORTS 2",
      "ZEE ZEST",
      "UNITE8 SPORTS 1",
      "SONY PIX",
      "SONY BBC EARTH",
      "SONY MARATHI",
      "SONY MAX 2",
      "SONY MAX 1",
      "SONY MAX",
      "SONY SAB",
      "SONY ENTERTAINMENT",
      "SONY TEN 4",
      "SONY TEN 3",
      "SONY TEN 2",
      "SONY TEN 1",
      "SONY SIX",
      "NAT GEO WILD",
      "SONY YAY",
      "JAYA PLUS",
      "JAYA MAX",
      "J MOVIES",
      "JAYA TV HD",
      "SUN NEWS",
      "SUN MUSIC",
      "SUN LIFE",
      "KTV",
      "CHUTTI TV",
      "SUN TV",
      "HISTORY TV18",
      "NEWS18 TAMILNADU",
      "VIJAY TV",
      "VIJAY SUPER",
      "COLORS TAMIL",
      "VIJAY TAKKAR",
      "STAR SPORTS KHEL",
      "STAR SPORTS 3",
      "STAR SPORTS 2 TAMIL",
      "STAR SPORTS 1 TAMIL",
      "CNN NEWS 18",
      "CNBC TV 18",
      "BBC CBEEBIES",
      "SONIC",
      "NICK JUNIOR",
      "NICK",
      "HUNGAMA TV",
      "NGC",
      "SIRIPOLI",
      "KALAIGNAR TV",
      "CHITHIRAM",
      "ISAI ARUVI",
      "MURASU TV",
      "SEITHIGAL",
    ],
  },

  {
    id: 3,

    name: "TCCL CLASSIC HD PACK",

    amount: "₹ 451.60",

    channelsCount: 96,

    status: "Classic HD Pack",

    channelsPreview: [
      "SUN TV HD",
      "ZEE TAMIL HD",
      "STAR SPORTS 1 TAMIL HD",
      "DISCOVERY HD WORLD",
    ],

    allChannels: [
      "MN PLUS HD",
      "INDIA TODAY",
      "Times Now Navbharath HD",
      "ET NOW",
      "ZOOM TV",
      "TIMES NOW WORLD HD",
      "TIMES NOW",
      "MIRROR NOW",
      "ET NOW SWADESH",
      "ROMEDY NOW",
      "MOVIES NOW HD",
      "MNX HD",
      "AAJ TAK HD",
      "ETV BAL BHARAT",
      "DISCOVERY TAMIL",
      "POGO",
      "DISCOVERY KIDS",
      "CARTOON NETWORK HD PLUS",
      "CARTOON NETWORK",
      "TLC HD",
      "ADITHYA TV",
      "DISCOVERY TURBO",
      "DISCOVERY HD WORLD",
      "NDTV INDIA",
      "GUBBARE",
      "TRAVEL XP HD",
      "MEGA MUSIC",
      "MEGA TV",
      "MEGA 24",
      "RAJ NEWS",
      "RAJ MUSIX",
      "RAJ DIGITAL PLUS",
      "RAJ TV",
      "RAJ NAGAICHUVAI",
      "INVESTIGATION DISCOVERY",
      "NDTV PROFIT",
      "NDTV 24X7",
      "NDTV GOOD TIMES",
      "ZEE THIRAI HD",
      "ZEE TAMIL HD",
      "ZING",
      "ZEE BOLLYWOOD",
      "ZEE ZEST HD",
      "UNITE8 SPORTS 2 HD",
      "UNITE8 SPORTS 1 HD",
      "SONY PIX HD",
      "NICK",
      "HUNGAMA TV",
      "DISNEY JUNIOR",
      "NGC HD",
      "NAT GEO WILD HD",
      "HISTORY TV18 HD",
      "SONY MARATHI",
      "SONY AATH",
      "SONY MAX HD",
      "SONY MAX 2",
      "SONY MAX 1",
      "SONY TEN 1 HD",
      "NICK HD",
      "SONY YAY",
      "SONY BBC EARTH HD",
      "JAYA PLUS",
      "JAYA MAX",
      "J MOVIES",
      "JAYA TV HD",
      "SUN NEWS",
      "SUN MUSIC HD",
      "SUN LIFE",
      "KTV HD",
      "CHUTTI TV",
      "SUN TV HD",
      "NICK JUNIOR",
      "DISCOVERY SCIENCE",
      "BBC WORLD NEWS",
      "BBC CBEEBIES",
      "NEWS18 TAMILNADU",
      "COLORS TAMIL HD",
      "VIJAY TAKKAR",
      "VIJAY SUPER HD",
      "STAR SPORTS 1 TAMIL HD",
      "DISNEY CHANNEL HD",
      "STAR SPORTS KHEL",
      "STAR SPORTS 3",
      "Star Sports 2 Tamil HD",
      "CNN NEWS 18",
      "CNBC TV18 PRIME HD",
      "CNBC TV 18",
      "SUPER HUNGAMA",
      "SONIC",
      "ANIMAL PLANET HD",
      "ISAI ARUVI",
      "CHITHIRAM",
      "KALAIGNAR TV",
      "SIRIPOLI",
      "MURASU TV",
      "SEITHIGAL",
    ],
  },

  {
    id: 4,

    name: "TCCL RURAL PACK",

    amount: "₹ 150.72",

    channelsCount: 33,

    status: "Budget Rural Pack",

    channelsPreview: [
      "SUN TV",
      "KTV",
      "JAYA TV HD",
      "RAJ TV",
      "KALAIGNAR TV",
    ],

    allChannels: [
      "SUN TV",
      "MEGA MUSIC",
      "MEGA TV",
      "MEGA 24",
      "RAJ NEWS",
      "RAJ MUSIX",
      "RAJ DIGITAL PLUS",
      "RAJ TV",
      "RAJ NAGAICHUVAI",
      "NDTV INDIA",
      "NDTV PROFIT",
      "NDTV 24X7",
      "NDTV GOOD TIMES",
      "INDIA TODAY",
      "JAYA PLUS",
      "ADITHYA TV",
      "CHUTTI TV",
      "KTV",
      "SUN LIFE",
      "SUN MUSIC",
      "SUN NEWS",
      "JAYA TV HD",
      "J MOVIES",
      "JAYA MAX",
      "BBC CBEEBIES",
      "BBC WORLD NEWS",
      "ETV BAL BHARAT",
      "SIRIPOLI",
      "SEITHIGAL",
      "MURASU TV",
      "ISAI ARUVI",
      "CHITHIRAM",
      "KALAIGNAR TV",
    ],
  },

  {
    id: 5,

    name: "TCCL TAMIL SD",

    amount: "₹ 131.94",

    channelsCount: 58,

    status: "Budget Tamil Pack",

    channelsPreview: [
      "SUN TV",
      "VIJAY TV",
      "ZEE TAMIL",
      "KTV",
      "STAR SPORTS 1 TAMIL",
    ],

    allChannels: [
      "ZEE THIRAI",
      "VIJAY TV",
      "NEWS18 TAMILNADU",
      "ADITHYA TV",
      "BBC WORLD NEWS",
      "ETV BAL BHARAT",
      "INDIA TODAY",
      "UNITE8 SPORTS 1",
      "ZEE ZEST",
      "UNITE8 SPORTS 2",
      "ZEE BOLLYWOOD",
      "ZING",
      "ZEE TAMIL",
      "BBC CBEEBIES",
      "NDTV GOOD TIMES",
      "NDTV 24X7",
      "NDTV PROFIT",
      "NDTV INDIA",
      "RAJ NAGAICHUVAI",
      "RAJ TV",
      "RAJ DIGITAL PLUS",
      "RAJ MUSIX",
      "RAJ NEWS",
      "MEGA 24",
      "MEGA TV",
      "MEGA MUSIC",
      "SONIC",
      "SUN TV",
      "CHUTTI TV",
      "KTV",
      "SUN LIFE",
      "SUN MUSIC",
      "SUN NEWS",
      "JAYA TV HD",
      "J MOVIES",
      "JAYA MAX",
      "JAYA PLUS",
      "NAT GEO WILD",
      "NGC",
      "HUNGAMA TV",
      "NICK",
      "NICK JUNIOR",
      "VIJAY SUPER",
      "HISTORY TV18",
      "CNBC TV 18",
      "CNN NEWS 18",
      "STAR SPORTS 1 TAMIL",
      "STAR SPORTS 2 TAMIL",
      "STAR SPORTS 3",
      "STAR SPORTS KHEL",
      "VIJAY TAKKAR",
      "COLORS TAMIL",
      "SEITHIGAL",
      "MURASU TV",
      "ISAI ARUVI",
      "CHITHIRAM",
      "KALAIGNAR TV",
      "SIRIPOLI",
    ],
  },
  {
  id: 6,

  name: "TCCL PREMIUM PACK",

  amount: "₹ 217.74",

  channelsCount: 95,

  status: "Add-on Pack",

  channelsPreview: [
    "Sun TV",
    "Star Vijay",
    "KTV",
    "Zee Tamil",
    "STAR SPORTS 1 TAMIL",
  ],

  allChannels: [
    "DISCOVERY",
    "ZOOM TV",
    "TIMES NOW",
    "MIRROR NOW",
    "ET NOW SWADESH",
    "ROMEDY NOW",
    "MOVIES NOW",
    "MNX",
    "ETV BAL BHARAT",
    "DISCOVERY TAMIL",
    "EUROSPORT",
    "TLC",
    "ET NOW",
    "ANIMAL PLANET",
    "POGO",
    "DISCOVERY KIDS",
    "CARTOON NETWORK",
    "INVESTIGATION DISCOVERY",
    "DISCOVERY TURBO",
    "DISCOVERY SCIENCE",
    "ADITHYA TV",
    "BBC CBEEBIES",
    "NEWS18 TAMILNADU",
    "NDTV PROFIT",
    "GUBBARE",
    "MEGA MUSIC",
    "MEGA TV",
    "MEGA 24",
    "RAJ NEWS",
    "RAJ MUSIX",
    "RAJ DIGITAL PLUS",
    "RAJ TV",
    "RAJ NAGAICHUVAI",
    "NDTV INDIA",
    "BBC WORLD NEWS",
    "NDTV 24X7",
    "NDTV GOOD TIMES",
    "ZEE THIRAI",
    "ZEE TAMIL",
    "ZING",
    "ZEE BOLLYWOOD",
    "UNITE8 SPORTS 2",
    "ZEE ZEST",
    "UNITE8 SPORTS 1",
    "INDIA TODAY",
    "SONY PIX",
    "NAT GEO WILD",
    "SONY BBC EARTH",
    "SONY MARATHI",
    "SONY MAX 2",
    "SONY MAX",
    "SONY SAB",
    "SONY ENTERTAINMENT",
    "SONY TEN 4",
    "SONY TEN 3",
    "SONY TEN 2",
    "SONY TEN 1",
    "SONY SIX",
    "NGC",
    "SONY YAY",
    "JAYA PLUS",
    "JAYA MAX",
    "J MOVIES",
    "JAYA TV HD",
    "SUN NEWS",
    "SUN MUSIC",
    "SUN LIFE",
    "KTV",
    "CHUTTI TV",
    "SUN TV",
    "SONIC",
    "VIJAY SUPER",
    "COLORS TAMIL",
    "VIJAY TAKKAR",
    "STAR SPORTS KHEL",
    "STAR SPORTS 3",
    "STAR SPORTS 2 TAMIL",
    "STAR SPORTS 1 TAMIL",
    "CNN NEWS 18",
    "CNBC TV 18",
    "STAR MOVIES",
    "HISTORY TV18",
    "SUPER HUNGAMA",
    "VIJAY TV",
    "NICK JUNIOR",
    "NICK",
    "HUNGAMA TV",
    "DISNEY JUNIOR",
    "DISNEY CHANNEL",
    "SIRIPOLI",
    "KALAIGNAR TV",
    "CHITHIRAM",
    "ISAI ARUVI",
    "MURASU TV",
    "SEITHIGAL",
  ],
},
{
  id: 7,

  name: "TCCL CLASSIC PACK 6 MONTH",

  amount: "₹ 399.66",

  channelsCount: 196,

  status: "Bundle Pack",

  channelsPreview: [
    "SUN TV",
    "VIJAY TV",
    "ZEE TAMIL HD",
    "STAR SPORTS 1 TAMIL",
    "SONY MAX",
  ],

  allChannels: [
    "UNITE8 SPORTS 1",
    "SONY SAB",
    "ADITHYA TV",
    "SUN TV",
    "CHUTTI TV",
    "KTV",
    "SUN LIFE",
    "SUN MUSIC",
    "SUN NEWS",
    "NAT GEO WILD",
    "NGC",
    "HUNGAMA TV",
    "NICK",
    "NICK JUNIOR",
    "SONIC",
    "HISTORY TV18",
    "CNBC TV 18",
    "CNN NEWS 18",
    "STAR SPORTS 1 TAMIL",
    "STAR SPORTS 2 TAMIL",
    "STAR SPORTS 3",
    "STAR SPORTS KHEL",
    "VIJAY TAKKAR",
    "COLORS TAMIL",
    "VIJAY SUPER",
    "VIJAY TV",
    "NEWS18 TAMILNADU",
    "UNITE8 SPORTS 1 HD",
    "ZEE ZEST",
    "UNITE8 SPORTS 2 HD",
    "& PRIVE HD",
    "ZEE ZEST HD",
    "ZEE BOLLYWOOD",
    "ZING",
    "ZEE TAMIL",
    "ZEE TAMIL HD",
    "ZEE THIRAI",
    "ZEE THIRAI HD",
    "DISCOVERY SCIENCE",
    "DISCOVERY TURBO",
    "INVESTIGATION DISCOVERY",
    "DISCOVERY KIDS",
    "ANIMAL PLANET",
    "DISCOVERY",
    "TLC",
    "EUROSPORT",
    "DISCOVERY TAMIL",
    "CARTOON NETWORK",
    "POGO",
    "MNX",
    "MOVIES NOW",
    "ROMEDY NOW",
    "ET NOW SWADESH",
    "MIRROR NOW",
    "TIMES NOW",
    "ZOOM TV",
    "ET NOW",
    "RAJ TV",
    "JAYA TV",
    "J MOVIES",
    "JAYA MAX",
    "JAYA PLUS",
    "MEGA 24",
    "MEGA TV",
    "MEGA MUSIC",
    "INDIA TODAY",
    "UNITE8 SPORTS 2",
    "SONY MARATHI",
    "SONY MAX",
    "SONY TEN 3",
    "SONY TEN 2",
    "SONY YAY",
    "SONY PIX",
    "SONY TEN 1",
    "SONY ENTERTAINMENT",
    "SONY MAX 2",
    "SONY BBC EARTH",
    "SONY TEN 4",
    "ETV BAL BHARAT",
    "GUBBARE",
    "NDTV GOOD TIMES",
    "NDTV 24X7",
    "NDTV PROFIT",
    "BBC CBEEBIES",
    "BBC WORLD NEWS",
    "SONY MAX 1",
    "1 YES CHANNEL",
    "KAPPA TV",
    "KASTHURI TV",
    "KERELA VISION",
    "PTC PUNJABI",
    "SAFARI",
    "SUN BANGLA",
    "VENDHAR TV",
    "FASHION TV HD",
    "CVR HEALTH",
    "FASHION TV",
    "MUSIC ZONE",
    "PUBLIC MUSIC",
    "CGTN",
    "MADHIMUGAM",
    "MALAI MURASU",
    "NEWS J",
    "NHK WORLD HD",
    "REPORTER",
    "REPUBLIC TV",
    "STAR SUVARNA NEWS",
    "TV9 KANNADA",
    "CARE WORLD",
    "ENTERR 10",
    "MANORANJAN TV",
    "CINEMA TV",
    "WOW CINEMA",
    "MASTII",
    "MUSIC INDIA",
    "ABP NEWS",
    "DW ASIA",
    "DY 365",
    "FRANCE 24",
    "RUSSIA TODAY",
    "TV5 MONDE",
    "AMRITA",
    "JEEVAN",
    "KAUMUDY",
    "MANORAMA NEWS",
    "MAZHAVIL MANORAMA",
    "MAZHAVIL MANORAMA HD",
    "NEPAL 1",
    "AASTHA BHAJAN",
    "AASTHA TV",
    "ARADANA TV",
    "ARIHANT TV",
    "BHAKTHI TV",
    "DIVYA",
    "GOODNESS",
    "JANAM TV",
    "PARAS TV",
    "PEACE OF MIND",
    "SHALOM TV",
    "ABN ANDHRA JHOTI",
    "N TV",
    "SAKSHI TV",
    "SUBHAVAARTHA",
    "TV 1",
    "TV 5 NEWS",
    "TV9 TELUGU",
    "VANITHA TV",
    "DHEERAN TV",
    "SUPER TV",
    "VELICHAM TV",
    "WIN TV",
    "7S MUSIC",
    "LOTUS NEWS",
    "MATHRUBHUMI NEWS",
    "NEWS 7 TAMIL",
    "THANTHI TV",
    "ANGEL TV",
    "MADHA TV",
    "NAMBIKAI TV",
    "SAI TV",
    "SALVATION",
    "SRI SANKARA",
    "SVBC - TTD",
    "ASIANET NEWS",
    "VASANTH TV",
    "TAMILAN TV",
    "SATHIYAM TV",
    "SANSKAR",
    "POLIMER TV",
    "POLIMER NEWS",
    "PUTHUYUGAM",
    "PUTHIYA THALAIMURAI",
    "KASTHURI NEWS",
    "KAIRALI PEOPLE",
    "KAIRALI TV",
    "KAIRALI WE",
    "MAKKAL TV",
    "FIRANGI",
    "SAHARA ONE",
    "FILMY",
    "CHITHIRAM",
    "ASEERVATHAM",
    "IMAYAM TV",
    "CAPTAIN TV",
    "CAPTAIN NEWS",
    "B4U MOVIES",
    "B4U MUSIC",
    "9X JALWA",
    "9X M",
    "9X JHAKAAS",
    "NT 2",
    "SIRIPOLI",
    "KALAIGNAR TV",
    "ISAI ARUVI",
    "MURASU TV",
    "SEITHIGAL",
  ],
},

  ];

  const handleLogout = () => {

    localStorage.removeItem("loggedUser");

    navigate("/");
  };

  // VIEW CHANNELS
  const handleViewChannels = (channels) => {

    setSelectedChannels(channels);

    setShowModal(true);
  };

  return (

    <div className="view-main-container">

      <div className="view-wrapper">

        {/* SIDEBAR */}
        <div className="view-sidebar">

          <div className="view-logo-section">

            <img
              src="/logo.png"
              alt="logo"
              className="view-dashboard-logo"
            />

          </div>

          <div className="view-sidebar-menu">

            <button
              className="view-menu-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >

              <FaHome />

              Dashboard

            </button>

           <button
            className="view-menu-btn"
             onClick={() =>
               navigate("/recharge")
             }
           >
           
             <FaWallet />
           
             Recharge
           
           </button>

            <button className="view-menu-btn view-active-menu">

              <FaGift />

              View Packages

            </button>

           <button
  className="view-menu-btn"
  onClick={() => navigate("/payment-history")}
>
  <FaHistory /> Payment History
</button>

           <button
  className="view-menu-btn"
  onClick={() =>
    navigate("/tic-internet")
  }
>

  <FaWifi />

  TIC - INTERNET

</button>
            <button
  className="view-menu-btn"
  onClick={() =>
    navigate("/contact-support")
  }
>

  <FaHeadset />

  Contact Us

</button>

            <button
className="view-menu-btn view-logout-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

        <div className="view-content">

          <div className="view-topbar">

            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="6"
            >

              Connecting You...
              Entertaining You...

            </marquee>

            <FaBell className="view-bell-icon" />

          </div>

          <div className="view-title">

            <h1>View Packages</h1>

            <p>
              Here are your package details.
            </p>

          </div>

          <div className="package-header">

            <span>#</span>

            <span>Package Details</span>

            <span>Amount (₹)</span>

            <span>Channels Included</span>

          </div>

          <div className="package-list">

            {packages.map((pack) => (

              <div
                className="package-card"
                key={pack.id}
              >

                <div className="package-number">

                  {String(pack.id).padStart(2, "0")}

                </div>

                <div className="package-details">

                  <h2>{pack.name}</h2>

                  <p>
                    {pack.channelsCount}
                    {" "}Channel(s)
                  </p>

                  <span
                    className={
                      pack.status === "Active"
                        ? "active-pack"
                        : "addon-pack"
                    }
                  >

                    {pack.status}

                  </span>

                </div>

                <div className="package-amount">

                  {pack.amount}

                </div>

                <div className="channels-section">

                  <div className="tv-icon">

                    <FaTv />

                  </div>

                  <div className="channel-preview">

                    {pack.channelsPreview.join(", ")}...

                  </div>

                  <button
                    className="view-btn"
                    onClick={() =>
                      handleViewChannels(
                        pack.allChannels
                      )
                    }
                  >

                    <FaEye />

                    View All

                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="total-packages">

            Total Packages:
            {" "}
            {packages.length}

          </div>

          <div className="view-dashboard-footer">

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

      {showModal && (

        <div className="modal-overlay">

          <div className="channel-modal">

            <h2>All Channels</h2>

            <div className="channel-list">

              {selectedChannels.map(
                (channel, index) => (

                  <p key={index}>
                    • {channel}
                  </p>

                )
              )}

            </div>

            <button
              className="close-btn"
              onClick={() =>
                setShowModal(false)
              }
            >

              Close

            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ViewPackages;