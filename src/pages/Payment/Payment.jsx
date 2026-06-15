import React,{
  useState,
} from "react";

import "./Payment.css";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaInfoCircle,
  FaQuestionCircle,
  FaHome,
} from "react-icons/fa";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const Payment=()=>{

  const navigate=useNavigate();

  const location=useLocation();

  const {
    plan,
    price,
  }=location.state||{};

  const [cardNumber,setCardNumber]=
    useState("");

  const [cardHolder,setCardHolder]=
    useState("");

  const [expiryDate,setExpiryDate]=
    useState("");

  const [cvv,setCvv]=
    useState("");

  const [
    paymentSuccess,
    setPaymentSuccess,
  ]=useState(false);

  const [
    loadingPayment,
    setLoadingPayment,
  ]=useState(false);

  const [
    transactionId,
    setTransactionId,
  ]=useState("");

  const [
    paymentDate,
    setPaymentDate,
  ]=useState("");

  const handleCardNumber=(e)=>{

    let value=
      e.target.value.replace(/\D/g,"");

    value=value
      .replace(/(.{4})/g,"$1 ")
      .trim();

    setCardNumber(value);
  };

  const handleCvv=(e)=>{

    let value=
      e.target.value.replace(/\D/g,"");

    setCvv(
      value.substring(0,3)
    );
  };

  const handlePayment=()=>{

    if(
      !cardNumber||
      !cardHolder||
      !expiryDate||
      !cvv
    ){

      alert(
        "Please enter all card details"
      );

      return;
    }

    if(cardNumber.length<19){

      alert(
        "Please enter valid card number"
      );

      return;
    }

    if(cvv.length<3){

      alert(
        "Please enter valid CVV"
      );

      return;
    }

    setLoadingPayment(true);

    const generatedTransactionId=
      "TXN"+
      Math.floor(
        100000000+
        Math.random()*900000000
      );

    setTransactionId(
      generatedTransactionId
    );

    const currentDateTime=
      new Date().toLocaleString(
        "en-GB",
        {
          day:"2-digit",
          month:"short",
          year:"numeric",
          hour:"numeric",
          minute:"2-digit",
        }
      );

    setPaymentDate(
      currentDateTime
    );

    const loggedUser=
      JSON.parse(
        localStorage.getItem(
          "loggedUser"
        )
      );

    const today=new Date();

    const oldExpiry=
      new Date(
        loggedUser?.expiryDate
      );

    let newRechargeDate;

    let newExpiryDate;

    if(oldExpiry>=today){

      newRechargeDate=
        loggedUser?.rechargeDate;

      newExpiryDate=
        new Date(oldExpiry);

      newExpiryDate.setDate(
        newExpiryDate.getDate()+30
      );

    }else{

      newRechargeDate=
        today.toISOString();

      newExpiryDate=
        new Date(today);

      newExpiryDate.setDate(
        newExpiryDate.getDate()+30
      );
    }

    const updatedUser={

      ...loggedUser,

      rechargeDate:
        newRechargeDate,

      expiryDate:
        newExpiryDate.toISOString(),
    };

    localStorage.setItem(
      "loggedUser",
      JSON.stringify(updatedUser)
    );

    const storedUsers=
      JSON.parse(
        localStorage.getItem("users")
      )||[];

    const updatedUsers=
      storedUsers.map((user)=>{

        if(
          user.serial===
          updatedUser.serial
        ){

          return updatedUser;
        }

        return user;
      });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const oldPayments=
      JSON.parse(
        localStorage.getItem(
          "paymentHistory"
        )
      )||[];

    const newPayment={

      serial:
        updatedUser.serial,

      username:
        updatedUser.username,

      transactionId:
        generatedTransactionId,

      amount:
        price,

      plan:
        plan||"Basic Plan",

      paymentMethod:
        "Credit / Debit Card",

      paymentIcon:
        "/visarupay.png",

      bankName:
        "Credit / Debit Card",

      bankLogo:
        "/visarupay.png",

      status:
        "Success",

      validity:
        "30 Days",

      date:
        currentDateTime,
    };

    const alreadyExists=
      oldPayments.some(
        (payment)=>
          payment.transactionId===
          generatedTransactionId
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

    setTimeout(()=>{

      setLoadingPayment(false);

      setPaymentSuccess(true);

    },4000);
  };

  return(

    <div className="payment-main-container">

      <div className="payment-wrapper">

        {loadingPayment&&(

          <div className="payment-loading-container">

            <div className="payment-loader"></div>

            <h2>
              Processing Payment...
            </h2>

            <p>
              Please wait securely processing your transaction
            </p>

          </div>

        )}

        {!loadingPayment&&
         paymentSuccess&&(

          <div className="ss-payment-success-wrapper">

            <div className="payment-steps-container">

              <div className="step-box active-step">

                <div className="step-circle">

                  <FaCheckCircle />

                </div>

                <span>
                  Select Method
                </span>

              </div>

              <div className="step-line"></div>

              <div className="step-box active-step">

                <div className="step-circle">

                  <FaCheckCircle />

                </div>

                <span>
                  Make Payment
                </span>

              </div>

              <div className="step-line"></div>

              <div className="step-box active-step">

                <div className="step-circle">
                  3
                </div>

                <span>
                  Payment Status
                </span>

              </div>

            </div>

            <div className="ss-payment-success-header">

              <div className="ss-payment-check-icon-box">

                <FaCheckCircle />

              </div>

              <h1>
                Payment Successful!
              </h1>

              <p>
                Your payment has been received successfully.
              </p>

            </div>

            <div className="ss-payment-details-box">

              <div className="ss-payment-detail-item">

                <span>
                  Transaction ID
                </span>

                <h3>
                  {transactionId}
                </h3>

              </div>

              <div className="ss-payment-detail-item">

                <span>
                  Amount Paid
                </span>

                <h3 className="ss-payment-amount-green">

                  {price}

                </h3>

              </div>

              <div className="ss-payment-detail-item">

                <span>
                  Date & Time
                </span>

                <h3>
                  {paymentDate}
                </h3>

              </div>

              <div className="ss-payment-detail-item">

                <span>
                  Payment Method
                </span>

                <h3>
                  Credit / Debit Card
                </h3>

              </div>

            </div>

            <div className="ss-payment-message-box">

              <FaCheckCircle className="ss-payment-message-icon" />

              <p>

                Your connection will be active immediately.
                Thank you for choosing SS Cable Network!

              </p>

            </div>

            <button
              className="ss-payment-dashboard-button"
              onClick={()=>{

                setTimeout(()=>{

                  navigate("/dashboard");

                },200);

              }}
            >

              <FaHome />

              Go to Dashboard

            </button>

          </div>

        )}

        {!loadingPayment&&
         !paymentSuccess&&(

          <>

            <div className="payment-steps-container">

              <div className="step-box active-step">

                <div className="step-circle">

                  <FaCheckCircle />

                </div>

                <span>
                  Select Method
                </span>

              </div>

              <div className="step-line"></div>

              <div className="step-box active-step">

                <div className="step-circle">
                  2
                </div>

                <span>
                  Make Payment
                </span>

              </div>

              <div className="step-line"></div>

              <div className="step-box">

                <div className="step-circle">
                  3
                </div>

                <span>
                  Payment Status
                </span>

              </div>

            </div>

            <div className="payment-card-container">

              <div className="payment-header">

                <div
                  className="payment-back"
                  onClick={()=>
                    navigate("/recharge")
                  }
                >

                  <FaArrowLeft />

                  <h2>
                    Credit / Debit Card
                  </h2>

                </div>

                <img
                  src="/visarupay.png"
                  alt="visa"
                  className="visa-logo"
                />

              </div>

              <div className="payment-form-container">

                <div className="payment-input-group">

                  <label>
                    Card Number
                  </label>

                  <div className="payment-input-box">

                    <FaCreditCard className="input-icon" />

                    <input
                      type="text"
                      placeholder="Enter card number"
                      value={cardNumber}
                      onChange={handleCardNumber}
                      maxLength="19"
                      autoComplete="off"
                    />

                  </div>

                </div>

                <div className="payment-input-group">

                  <label>
                    Card Holder Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter card holder name"
                    value={cardHolder}
                    onChange={(e)=>
                      setCardHolder(
                        e.target.value
                      )
                    }
                    className="simple-input"
                  />

                </div>

                <div className="payment-row">

                  <div className="payment-input-group">

                    <label>
                      Expiry Date
                    </label>

                    <div
                      className="expiry-select-row"
                    >

                      <select
                        className="expiry-select"
                        value={
                          expiryDate.split("-")[1]||""
                        }
                        onChange={(e)=>{

                          const year=
                            expiryDate.split("-")[0]||"";

                          setExpiryDate(
                            `${year}-${e.target.value}`
                          );
                        }}
                      >

                        <option value="">
                          Month
                        </option>

                        {Array.from(
                          { length:12 },
                          (_,i)=>
                            String(i+1).padStart(2,"0")
                        ).map((month)=>(

                          <option
                            key={month}
                            value={month}
                          >

                            {month}

                          </option>

                        ))}

                      </select>

                      <select
                        className="expiry-select"
                        value={
                          expiryDate.split("-")[0]||""
                        }
                        onChange={(e)=>{

                          const month=
                            expiryDate.split("-")[1]||"";

                          setExpiryDate(
                            `${e.target.value}-${month}`
                          );
                        }}
                      >

                        <option value="">
                          Year
                        </option>

                        {Array.from(
                          { length:91 },
                          (_,i)=>1990+i
                        ).map((year)=>(

                          <option
                            key={year}
                            value={year}
                          >

                            {year}

                          </option>

                        ))}

                      </select>

                    </div>

                  </div>

                  <div className="payment-input-group">

                    <label>
                      CVV
                    </label>

                    <div className="payment-input-box">

                      <input
                        type="text"
                        placeholder="Enter your CVV"
                        value={cvv}
                        onChange={handleCvv}
                        maxLength="3"
                        autoComplete="off"
                      />

                      <FaQuestionCircle className="input-right-icon" />

                    </div>

                  </div>

                </div>

                <div className="payment-plan-box">

                  <div className="plan-left">

                    <span>
                      Recharge Amount
                    </span>

                    <h3>
                      {price}
                    </h3>

                  </div>

                  <div className="plan-right">

                    <span>
                      Your Plan
                    </span>

                    <h3>
                      {plan}
                    </h3>

                  </div>

                </div>

                <div className="payment-info-box">

                  <FaInfoCircle className="payment-info-icon" />

                  <p>
                    After successful payment,
                    your connection will be
                    active immediately.
                  </p>

                </div>

                <button
                  className="payment-btn"
                  onClick={handlePayment}
                >

                  <img
                    src="/lock.png"
                    alt="lock"
                    className="lock-image"
                  />

                  Pay {price} Securely

                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default Payment;