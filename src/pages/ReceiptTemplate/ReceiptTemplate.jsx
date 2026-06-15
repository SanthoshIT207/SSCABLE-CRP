import React from "react";
import "./ReceiptTemplate.css";

import {
  FaCheckCircle,
  FaUser,
  FaIdCard,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaDownload,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const ReceiptTemplate=()=>{

  const location=
    useLocation();

  const navigate=
    useNavigate();

  const payment=
    location.state?.payment;

  const loggedUser=
    JSON.parse(
      localStorage.getItem(
        "loggedUser"
      )
    )||{};

  const downloadReceipt=()=>{

    window.print();
  };

  if(!payment){

    return(

      <div className="ssr-main-wrapper">

        <div className="ssr-error-box">

          <h2>

            Receipt Not Found

          </h2>

          <button
            onClick={()=>
              navigate(
                "/payment-history"
              )
            }
          >

            Go Back

          </button>

        </div>

      </div>

    );
  }

  const receiptNumber=
    "RCP"+
    payment.transactionId;

  const splitDate=
    payment.date?.split(",");

  const transactionDate=
    splitDate?.[0]||"";

  const transactionTime=
    splitDate?.[1]||"";

  return(

    <div className="ssr-page-wrapper">

      <div className="ssr-main-receipt">

        <div className="ssr-main-wrapper">

          <div className="ssr-receipt-container">

            <div className="ssr-top-section">

              <div className="ssr-company-section">

                <img
                  src="/logo.png"
                  alt="logo"
                  className="ssr-company-logo"
                />

                <div>

                  <h1>

                    SS CABLE NETWORK

                  </h1>

                  <p>

                    CONNECTING YOU, ENTERTAINING YOU

                  </p>

                </div>

              </div>

              <div className="ssr-receipt-right">

                <h2>

                  PAYMENT RECEIPT

                </h2>

                <div className="ssr-top-details">

                  <div>

                    <span>

                      Receipt No.

                    </span>

                    <h4>

                      {receiptNumber}

                    </h4>

                  </div>

                  <div>

                    <span>

                      Date & Time

                    </span>

                    <h4>

                      {payment.date}

                    </h4>

                  </div>

                </div>

              </div>

            </div>

            <div className="ssr-line"></div>

            <div className="ssr-success-main-box">

              <div className="ssr-payment-success-box">

                <div className="ssr-green-icon">

                  <FaCheckCircle />

                </div>

                <div>

                  <h3>

                    Payment Successful!

                  </h3>

                  <p>

                    Thank you. Your payment has been received successfully.

                  </p>

                  <p>

                    We appreciate your trust in SS Cable Network.

                  </p>

                </div>

              </div>

              <div className="ssr-amount-box">

                <span>

                  Total Amount Paid

                </span>

                <h1>

                  {payment.amount}

                </h1>

                <p>

                  ( Payment Received Successfully )

                </p>

              </div>

            </div>

            <div className="ssr-grid-section">

              <div className="ssr-card-box">

                <h3>

                  <FaUser />

                  CUSTOMER DETAILS

                </h3>

                <div className="ssr-detail-row">

                  <span>

                    <FaUser />

                    Customer Name

                  </span>

                  <p>

                    {loggedUser.username}

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaIdCard />

                    Customer ID

                  </span>

                  <p>

                    {loggedUser.serial}

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaPhoneAlt />

                    Mobile

                  </span>

                  <p>

                    {loggedUser.phone}

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaMapMarkerAlt />

                    Address

                  </span>

                  <p>

                    {loggedUser.address}

                  </p>

                </div>

              </div>

              <div className="ssr-card-box">

                <h3>

                  <FaBoxOpen />

                  RECHARGE DETAILS

                </h3>

                <div className="ssr-detail-row">

                  <span>

                    <FaBoxOpen />

                    Plan Name

                  </span>

                  <p>

                    {payment.plan}

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaCalendarAlt />

                    Plan Validity

                  </span>

                  <p>

                    {payment.validity}

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaUsers />

                    Connections

                  </span>

                  <p>

                    1

                  </p>

                </div>

                <div className="ssr-detail-row">

                  <span>

                    <FaCheckCircle />

                    Amount Paid

                  </span>

                  <p>

                    {payment.amount}

                  </p>

                </div>

              </div>

            </div>

            <div className="ssr-transaction-box">

              <h3>

                <FaIdCard />

                TRANSACTION DETAILS

              </h3>

              <div className="ssr-transaction-grid">

                <div>

                  <div className="ssr-detail-row">

                    <span>

                      Transaction ID

                    </span>

                    <p>

                      {payment.transactionId}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Payment Method

                    </span>

                    <p>

                      {payment.paymentMethod}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Bank Name

                    </span>

                    <p>

                      {payment.bankName}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Payment Status

                    </span>

                    <p className="ssr-success-text">

                      {payment.status}

                    </p>

                  </div>

                </div>

                <div>

                  <div className="ssr-detail-row">

                    <span>

                      Transaction Date

                    </span>

                    <p>

                      {transactionDate}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Transaction Time

                    </span>

                    <p>

                      {transactionTime}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Reference No.

                    </span>

                    <p>

                      REF{payment.transactionId}

                    </p>

                  </div>

                  <div className="ssr-detail-row">

                    <span>

                      Bank Transaction ID

                    </span>

                    <p>

                      BNK{payment.transactionId}

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="ssr-footer-section">

              <div className="ssr-footer-left">

                <h2>

                  Thank you!

                </h2>

                <p>

                  For choosing SS Cable Network.

                </p>

              </div>

              <div className="ssr-footer-center">

                <p>

                  <FaPhoneAlt />

                  944-37-37-239

                </p>

                <p>

                  <FaGlobe />

                  www.sscable.com

                </p>

                <p>

                  <FaEnvelope />

                  sscable@gmail.com

                </p>

                <p>

                  <FaMapMarkerAlt />

                  5/701, Amaravathy Nagar, 3rd Street
                  Peruntholuvu Post, Tiruppur - 641665

                </p>

              </div>

              <img
                src="/logo.png"
                alt="logo"
                className="ssr-footer-logo"
              />

            </div>

            <div className="ssr-bottom-actions">

              <button
                className="ssr-download-btn"
                onClick={downloadReceipt}
              >

                <FaDownload />

                Download Receipt

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ReceiptTemplate;