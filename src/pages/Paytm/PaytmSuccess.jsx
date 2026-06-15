import React,{
  useState,
} from "react";

import "./Paytm.css";

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

const PaytmSuccess=()=>{

  const navigate=useNavigate();

  const location=useLocation();

  const paytmStateData=
    location?.state||{};

  const amount=
    paytmStateData?.amount||
    "₹0";

  const transactionId=
    paytmStateData?.transactionId||
    "N/A";

  const bank=
    paytmStateData?.bank||{

      logo:
        "/sbi.png",

      name:
        "State Bank Of India",

      upi:
        "sbi@upi",
    };

  const [
    showDetailsPage,
    setShowDetailsPage,
  ]=useState(false);

  const copyTransactionId=()=>{

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

    <div className="paytm-main-container">

      {!showDetailsPage?(

        <div className="paytm-success-card">

          <div className="paytm-success-top">

            <div className="paytm-success-icon-circle">

              <FaCheckCircle className="paytm-success-icon" />

            </div>

            <h2 className="paytm-success-title">

              Payment Successful

            </h2>

            <h1 className="paytm-success-amount">

              {amount}

            </h1>

            <p className="paytm-paid-to-text">

              Paid to

            </p>

            <h3 className="paytm-paid-company">

              SS Cable Network

            </h3>

          </div>

          <div className="paytm-success-bottom">

            <div className="paytm-transaction-box">

              <div className="paytm-transaction-top">

                <div>

                  <p className="paytm-transaction-label">

                    Transaction ID

                  </p>

                  <h4 className="paytm-transaction-id">

                    {transactionId}

                  </h4>

                </div>

                <FaRegCopy
                  className="paytm-copy-icon"
                  onClick={
                    copyTransactionId
                  }
                />

              </div>

              <div className="paytm-transaction-divider" />

              <div className="paytm-paid-from-text">

                Paid from

              </div>

              <div className="paytm-paid-bank-box">

                <div className="paytm-paid-bank-left">

                  <img
                    src={
                      bank?.logo||
                      "/sbi.png"
                    }
                    alt="bank"
                    className="paytm-paid-bank-logo"
                  />

                  <div>

                    <h4>

                      {
                        bank?.name||
                        "Bank Account"
                      }

                    </h4>

                    <p>

                      UPI ID:
                      {" "}

                      {
                        bank?.upi||
                        "upi@bank"
                      }

                    </p>

                  </div>

                </div>

                <FaChevronDown />

              </div>

            </div>

            <button
              className="paytm-view-details-btn"
              onClick={()=>
                setShowDetailsPage(true)
              }
            >

              VIEW DETAILS

            </button>

            <button
              className="paytm-done-btn"
              onClick={()=>{

                setTimeout(()=>{

                  navigate("/dashboard");

                },100);

              }}
            >

              DONE

            </button>

          </div>

        </div>

      ):(

        <div className="paytm-details-success-card">

          <div className="paytm-details-success-icon-circle">

            <FaCheckCircle className="paytm-details-success-icon" />

          </div>

          <h2 className="paytm-details-success-title">

            Payment Successful!

          </h2>

          <p className="paytm-details-success-subtitle">

            Your recharge has been updated.

          </p>

          <div className="paytm-details-box">

            <div className="paytm-details-row">

              <p className="paytm-details-label">

                Transaction ID

              </p>

              <h4 className="paytm-details-value">

                {transactionId}

              </h4>

            </div>

            <div className="paytm-details-divider" />

            <div className="paytm-details-row">

              <p className="paytm-details-label">

                Amount

              </p>

              <h4 className="paytm-details-value">

                {amount}

              </h4>

            </div>

            <div className="paytm-details-divider" />

            <div className="paytm-details-row">

              <p className="paytm-details-label">

                Date & Time

              </p>

              <h4 className="paytm-details-value">

                {currentDateTime}

              </h4>

            </div>

          </div>

          <button
            className="paytm-dashboard-btn"
            onClick={()=>{

              setTimeout(()=>{

                navigate("/dashboard");

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
export default PaytmSuccess;