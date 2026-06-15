import React,{
  useState,
} from "react";

import "./GooglePay.css";

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

const GooglePaySuccess=()=>{

  const googlepayNavigate=
    useNavigate();

  const googlepayLocation=
    useLocation();

  const googlepayStateData=
    googlepayLocation?.state||{};

  const googlepayAmount=
    googlepayStateData?.amount||
    "₹0";

  const googlepayTransactionId=
    googlepayStateData?.transactionId||
    "N/A";

  const googlepayBank=
    googlepayStateData?.bank||{

      logo:
        "/sbi.png",

      name:
        "State Bank Of India",

      upi:
        "sbi@upi",
    };

  const [
    googlepayShowDetailsPage,
    setGooglepayShowDetailsPage,
  ]=useState(false);

  const copyGooglepayTransactionId=
    ()=>{

      navigator.clipboard.writeText(
        googlepayTransactionId
      );

      alert(
        "Transaction ID copied"
      );
    };

  const googlepayCurrentDateTime=
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

    <div className="googlepay-main-container">

      {!googlepayShowDetailsPage?(

        <div className="googlepay-success-card">

          <div className="googlepay-success-top">

            <div className="googlepay-success-icon-circle">

              <FaCheckCircle className="googlepay-success-icon" />

            </div>

            <h2 className="googlepay-success-title">

              Payment Successful

            </h2>

            <h1 className="googlepay-success-amount">

              {googlepayAmount}

            </h1>

            <p className="googlepay-paid-to-text">

              Paid to

            </p>

            <h3 className="googlepay-paid-company">

              SS Cable Network

            </h3>

          </div>

          <div className="googlepay-success-bottom">

            <div className="googlepay-transaction-box">

              <div className="googlepay-transaction-top">

                <div>

                  <p className="googlepay-transaction-label">

                    Transaction ID

                  </p>

                  <h4 className="googlepay-transaction-id">

                    {googlepayTransactionId}

                  </h4>

                </div>

                <FaRegCopy
                  className="googlepay-copy-icon"
                  onClick={
                    copyGooglepayTransactionId
                  }
                />

              </div>

              <div className="googlepay-transaction-divider" />

              <div className="googlepay-paid-from-text">

                Paid from

              </div>

              <div className="googlepay-paid-bank-box">

                <div className="googlepay-paid-bank-left">

                  <img
                    src={
                      googlepayBank?.logo||
                      "/sbi.png"
                    }
                    alt="bank"
                    className="googlepay-paid-bank-logo"
                  />

                  <div>

                    <h4>

                      {
                        googlepayBank?.name||
                        "Bank Account"
                      }

                    </h4>

                    <p>

                      UPI ID:
                      {" "}

                      {
                        googlepayBank?.upi||
                        "upi@bank"
                      }

                    </p>

                  </div>

                </div>

                <FaChevronDown />

              </div>

            </div>

            <button
              className="googlepay-view-details-btn"
              onClick={()=>
                setGooglepayShowDetailsPage(
                  true
                )
              }
            >

              VIEW DETAILS

            </button>

            <button
              className="googlepay-done-btn"
              onClick={()=>{

                setTimeout(()=>{

                  googlepayNavigate(
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

        <div className="googlepay-details-success-card">

          <div className="googlepay-details-success-icon-circle">

            <FaCheckCircle className="googlepay-details-success-icon" />

          </div>

          <h2 className="googlepay-details-success-title">

            Payment Successful!

          </h2>

          <p className="googlepay-details-success-subtitle">

            Your recharge has been updated.

          </p>

          <div className="googlepay-details-box">

            <div className="googlepay-details-row">

              <p className="googlepay-details-label">

                Transaction ID

              </p>

              <h4 className="googlepay-details-value">

                {googlepayTransactionId}

              </h4>

            </div>

            <div className="googlepay-details-divider" />

            <div className="googlepay-details-row">

              <p className="googlepay-details-label">

                Amount

              </p>

              <h4 className="googlepay-details-value">

                {googlepayAmount}

              </h4>

            </div>

            <div className="googlepay-details-divider" />

            <div className="googlepay-details-row">

              <p className="googlepay-details-label">

                Date & Time

              </p>

              <h4 className="googlepay-details-value">

                {googlepayCurrentDateTime}

              </h4>

            </div>

          </div>

          <button
            className="googlepay-dashboard-btn"
            onClick={()=>{

              setTimeout(()=>{

                googlepayNavigate(
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
export default GooglePaySuccess;