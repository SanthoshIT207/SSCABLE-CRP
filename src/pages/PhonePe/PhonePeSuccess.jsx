import React,{
  useState,
} from "react";

import "./PhonePe.css";

import {
  FaCheckCircle,
  FaChevronDown,
  FaRegCopy,
  FaHome,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const PhonePeSuccess=()=>{

  const navigate=
    useNavigate();

  const location=
    useLocation();

  const stateData=
    location?.state||{};

  const amount=
    stateData?.amount||"₹0";

  const transactionId=
    stateData?.transactionId||"N/A";

  const bank=
    stateData?.bank||{
      logo:"/sbi.png",
      name:"State Bank Of India",
      upi:"sbi@upi",
    };

  const [
    phonepeShowDetailsPage,
    setPhonepeShowDetailsPage,
  ]=useState(false);

  const copyPhonepeTransactionId=
    ()=>{

      navigator.clipboard.writeText(
        transactionId
      );

      alert(
        "Transaction ID copied"
      );
    };

  const currentDateTime=
    new Date().toLocaleString(
      "en-IN",
      {
        day:"2-digit",
        month:"short",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
      }
    );

  return(

    <div className="phonepe-main-container">

      {!phonepeShowDetailsPage?(

        <div className="phonepe-success-card">

          <div className="phonepe-success-top">

            <div className="phonepe-success-icon-circle">

              <FaCheckCircle className="phonepe-success-icon" />

            </div>

            <h2 className="phonepe-success-title">

              Payment Successful

            </h2>

            <h1 className="phonepe-success-amount">

              {amount}

            </h1>

            <p className="phonepe-paid-to-text">

              Paid to

            </p>

            <h3 className="phonepe-paid-company">

              SS Cable Network

            </h3>

          </div>

          <div className="phonepe-success-bottom">

            <div className="phonepe-transaction-box">

              <div className="phonepe-transaction-top">

                <div>

                  <p className="phonepe-transaction-label">

                    Transaction ID

                  </p>

                  <h4 className="phonepe-transaction-id">

                    {transactionId}

                  </h4>

                </div>

                <FaRegCopy
                  className="phonepe-copy-icon"
                  onClick={
                    copyPhonepeTransactionId
                  }
                />

              </div>

              <div className="phonepe-transaction-divider" />

              <div className="phonepe-paid-from-text">

                Paid from

              </div>

              <div className="phonepe-paid-bank-box">

                <div className="phonepe-paid-bank-left">

                  <img
                    src={
                      bank?.logo||
                      "/sbi.png"
                    }
                    alt="bank"
                    className="phonepe-paid-bank-logo"
                  />

                 <div>

  <h4>

    {bank?.name || "Bank Account"}

  </h4>

  <p>

    UPI ID: {bank?.upi || "upi@bank"}

  </p>

</div>

                </div>

                <FaChevronDown />

              </div>

            </div>

            <button
              className="phonepe-view-details-btn"
              onClick={()=>
                setPhonepeShowDetailsPage(
                  true
                )
              }
            >

              VIEW DETAILS

            </button>

            <button
              className="phonepe-done-btn"
              onClick={()=>{

                setTimeout(()=>{

                  navigate(
                    "/dashboard"
                  );

                },100);

              }}
            >

              DONE

            </button>

          </div>

        </div>

      ):(

        <div className="phonepe-details-success-card">

          <div className="phonepe-details-success-icon-circle">

            <FaCheckCircle className="phonepe-details-success-icon" />

          </div>

          <h2 className="phonepe-details-success-title">

            Payment Successful!

          </h2>

          <p className="phonepe-details-success-subtitle">

            Your recharge has been updated.

          </p>

          <div className="phonepe-details-box">

            <div className="phonepe-details-row">

              <p className="phonepe-details-label">

                Transaction ID

              </p>

              <h4 className="phonepe-details-value">

                {transactionId}

              </h4>

            </div>

            <div className="phonepe-details-divider" />

            <div className="phonepe-details-row">

              <p className="phonepe-details-label">

                Amount

              </p>

              <h4 className="phonepe-details-value">

                {amount}

              </h4>

            </div>

            <div className="phonepe-details-divider" />

            <div className="phonepe-details-row">

              <p className="phonepe-details-label">

                Date & Time

              </p>

              <h4 className="phonepe-details-value">

                {currentDateTime}

              </h4>

            </div>

          </div>

          <button
            className="phonepe-dashboard-btn"
            onClick={()=>{

              setTimeout(()=>{

                navigate(
                  "/dashboard"
                );

              },100);

            }}
          >

            <FaHome />

            Go to Dashboard

          </button>

        </div>

      )}

    </div>
  );
};

export default PhonePeSuccess;