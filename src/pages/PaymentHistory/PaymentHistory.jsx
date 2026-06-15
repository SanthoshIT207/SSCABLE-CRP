import React,{
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./PaymentHistory.css";

import {
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaDownload,
  FaArrowLeft,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PaymentHistory=()=>{

  const navigate=
    useNavigate();

  const loggedUser=
    JSON.parse(
      localStorage.getItem(
        "loggedUser"
      )
    )||{};

  const [
    allPayments,
    setAllPayments,
  ]=useState([]);

  useEffect(()=>{

    const savedPayments=
      JSON.parse(
        localStorage.getItem(
          "paymentHistory"
        )
      )||[];

    setAllPayments(
      savedPayments
    );

  },[]);

  const userPayments=
    useMemo(()=>{

      return allPayments.filter(
        (payment)=>
          payment.serial===
          loggedUser.serial
      );

    },[
      allPayments,
      loggedUser.serial,
    ]);

  const [
    phSearch,
    setPhSearch,
  ]=useState("");

  const [
    phStatusFilter,
    setPhStatusFilter,
  ]=useState("All");

  const [
    phShowFilter,
    setPhShowFilter,
  ]=useState(false);

  const [
    phCurrentPage,
    setPhCurrentPage,
  ]=useState(1);

  const [
    phSelectedDate,
    setPhSelectedDate,
  ]=useState(()=>{

    const savedDate=
      localStorage.getItem(
        "phSelectedDate"
      );

    if(!savedDate){

      return null;
    }

    const parsedDate=
      new Date(savedDate);

    const today=
      new Date();

    const isToday=

      parsedDate.getDate()===

      today.getDate()

      &&

      parsedDate.getMonth()===

      today.getMonth()

      &&

      parsedDate.getFullYear()===

      today.getFullYear();

    if(isToday){

      localStorage.removeItem(
        "phSelectedDate"
      );

      return null;
    }

    return parsedDate;

  });

  const [
    phShowCalendar,
    setPhShowCalendar,
  ]=useState(false);

  const phCalendarRef=
    useRef(null);

  const phItemsPerPage=6;

  useEffect(()=>{

    if(phSelectedDate){

      localStorage.setItem(
        "phSelectedDate",
        phSelectedDate.toISOString()
      );

    }else{

      localStorage.removeItem(
        "phSelectedDate"
      );
    }

  },[phSelectedDate]);

  useEffect(()=>{

    const handleClickOutside=
      (event)=>{

        if(
          phCalendarRef.current&&
          !phCalendarRef.current.contains(
            event.target
          )
        ){

          setPhShowCalendar(false);

        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  },[]);

  const filteredPayments=
    useMemo(()=>{

      return userPayments.filter(
        (payment)=>{

          const searchText=
            `${payment.plan}
            ${payment.transactionId}
            ${payment.amount}
            ${payment.paymentMethod}`
              .toLowerCase();

          const matchesSearch=
            searchText.includes(
              phSearch.toLowerCase()
            );

          const matchesStatus=
            phStatusFilter==="All"
              ? true
              : payment.status===
                phStatusFilter;

          let matchesDate=true;

          if(phSelectedDate){

            const paymentDate=
              new Date(payment.date);

            matchesDate=
              paymentDate
                .toDateString()===

              phSelectedDate
                .toDateString();
          }

          return(
            matchesSearch&&
            matchesStatus&&
            matchesDate
          );

        }
      );

    },[
      userPayments,
      phSearch,
      phStatusFilter,
      phSelectedDate,
    ]);

  const totalPages=
    Math.ceil(
      filteredPayments.length/
      phItemsPerPage
    );

  const startIndex=
    (phCurrentPage-1)*
    phItemsPerPage;

  const currentPayments=
    filteredPayments.slice(
      startIndex,
      startIndex+
      phItemsPerPage
    );

  useEffect(()=>{

    setPhCurrentPage(1);

  },[
    phSearch,
    phStatusFilter,
    phSelectedDate,
  ]);

  const totalTransactions=
    userPayments.length;

  const successCount=
    userPayments.filter(
      (payment)=>
        payment.status===
        "Success"
    ).length;

  const pendingCount=
    userPayments.filter(
      (payment)=>
        payment.status===
        "Pending"
    ).length;

  const failedCount=
    userPayments.filter(
      (payment)=>
        payment.status===
        "Failed"
    ).length;

  const downloadReceipt=
    (payment)=>{

      navigate(
        "/receipt-template",
        {
          state:{
            payment,
          },
        }
      );

    };

  return(

    <div className="phs-main-wrapper">

      <div className="phs-history-container">

        <div className="phs-header-section">

          <div className="phs-header-left">

            <button
              className="phs-back-button"
              onClick={()=>
                navigate("/dashboard")
              }
            >

              <FaArrowLeft />

            </button>

            <h2 className="phs-main-title">

              Transaction History

            </h2>

          </div>

          <button
            className="phs-filter-button"
            onClick={()=>
              setPhShowFilter(
                !phShowFilter
              )
            }
          >

            <FaFilter />

          </button>

          {phShowFilter&&(

            <div className="phs-filter-dropdown">

              <button
                onClick={()=>{

                  setPhStatusFilter("All");

                  setPhSelectedDate(null);

                  setPhSearch("");

                  setPhShowFilter(false);

                }}
              >

                All

              </button>

              <button
                onClick={()=>{

                  setPhStatusFilter("Success");

                  setPhShowFilter(false);

                }}
              >

                Success

              </button>

              <button
                onClick={()=>{

                  setPhStatusFilter("Pending");

                  setPhShowFilter(false);

                }}
              >

                Pending

              </button>

              <button
                onClick={()=>{

                  setPhStatusFilter("Failed");

                  setPhShowFilter(false);

                }}
              >

                Failed

              </button>

            </div>

          )}

        </div>

        <div className="phs-stats-grid">

          <div className="phs-stat-card">

            <p>
              Total Transactions
            </p>

            <h3>
              {totalTransactions}
            </h3>

          </div>

          <div className="phs-stat-card">

            <p>
              Successful
            </p>

            <h3 className="phs-success-text">

              {successCount}

            </h3>

          </div>

          <div className="phs-stat-card">

            <p>
              Pending
            </p>

            <h3 className="phs-pending-text">

              {pendingCount}

            </h3>

          </div>

          <div className="phs-stat-card">

            <p>
              Failed
            </p>

            <h3 className="phs-failed-text">

              {failedCount}

            </h3>

          </div>

        </div>

        <div className="phs-search-calendar-row">

          <div className="phs-search-box">

            <input
              type="text"
              placeholder="Search transaction..."
              value={phSearch}
              onChange={(e)=>
                setPhSearch(
                  e.target.value
                )
              }
            />

            <FaSearch />

          </div>

          <div
            className="phs-datepicker-wrapper"
            ref={phCalendarRef}
          >

            <button
              className="phs-calendar-trigger-btn"
              onClick={()=>
                setPhShowCalendar(
                  !phShowCalendar
                )
              }
            >

              <FaCalendarAlt />

            </button>

            {phShowCalendar&&(

              <div className="phs-calendar-popup-box">

                <DatePicker
                  inline
                  selected={phSelectedDate}
                  onChange={(date)=>{

                    setPhSelectedDate(date);

                    setPhShowCalendar(false);

                  }}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={6}
                  minDate={
                    new Date(
                      2025,
                      0,
                      1
                    )
                  }
                  maxDate={
                    new Date(
                      2030,
                      11,
                      31
                    )
                  }
                />

              </div>

            )}

          </div>

        </div>

        <div className="phs-payment-list">

          {currentPayments.length>0?(

            currentPayments.map(
              (payment,index)=>(

                <div
                  className="phs-payment-card"
                  key={index}
                >

                  <div className="phs-payment-left">

                    <img
                      src={
                        payment.paymentIcon||
                        "/gpay.png"
                      }
                      alt="payment"
                      className="phs-payment-icon"
                    />

                    <div className="phs-payment-info">

                      <h3>
                        {payment.plan}
                      </h3>

                      <p>

                        Txn ID:
                        {" "}

                        {
                          payment.transactionId
                        }

                      </p>

                      <span>
                        {payment.date}
                      </span>

                    </div>

                  </div>

                  <div className="phs-payment-right">

                    <h4>
                      {payment.amount}
                    </h4>

                    <div
                      className={
                        payment.status===
                        "Success"

                          ? "phs-success-badge"

                          : payment.status===
                            "Pending"

                          ? "phs-pending-badge"

                          : "phs-failed-badge"
                      }
                    >

                      {payment.status}

                    </div>

                    <button
                      className="phs-download-button"
                      onClick={()=>
                        downloadReceipt(
                          payment
                        )
                      }
                    >

                      <FaDownload />

                    </button>

                  </div>

                </div>

              )
            )

          ):(

            <div className="phs-no-payment-box">

              <h3>
                No Transactions Found
              </h3>

              <p>
                Your payment history
                will appear here.
              </p>

            </div>

          )}

        </div>

        {totalPages>1&&(

          <div className="phs-pagination-wrapper">

            <button
              disabled={
                phCurrentPage===1
              }
              onClick={()=>
                setPhCurrentPage(
                  phCurrentPage-1
                )
              }
            >

              {"<"}

            </button>

            {
              Array.from(
                {
                  length:
                    totalPages,
                },
                (_,index)=>(

                  <button
                    key={index}
                    className={
                      phCurrentPage===
                      index+1

                        ? "phs-active-page"

                        : ""
                    }
                    onClick={()=>
                      setPhCurrentPage(
                        index+1
                      )
                    }
                  >

                    {index+1}

                  </button>

                )
              )
            }

            <button
              disabled={
                phCurrentPage===
                totalPages
              }
              onClick={()=>
                setPhCurrentPage(
                  phCurrentPage+1
                )
              }
            >

              {">"}

            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default PaymentHistory;