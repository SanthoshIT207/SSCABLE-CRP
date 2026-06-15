import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewPackages from "./pages/ViewPackages/ViewPackages";
import TicInternet from "./pages/TicInternet/TicInternet";
import ContactUs from "./pages/ContactUs/ContactUs";
import Recharge from "./pages/Recharge/Recharge";
import Payment from "./pages/Payment/Payment";
import PhonePe from "./pages/PhonePe/PhonePe";
import PhonePeSuccess from "./pages/PhonePe/PhonePeSuccess";
import Paytm from "./pages/Paytm/Paytm";
import PaytmSuccess from "./pages/Paytm/PaytmSuccess";
import GooglePay from "./pages/GooglePay/GooglePay";
import GooglePaySuccess from "./pages/GooglePay/GooglePaySuccess";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import ReceiptTemplate from "./pages/ReceiptTemplate/ReceiptTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/view-packages"
          element={<ViewPackages />}
        />
        <Route
          path="/tic-internet"
          element={<TicInternet />}
        />
        <Route
          path="/contact-support"
          element={<ContactUs />}
        />
        <Route
          path="/recharge"
          element={<Recharge />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
          path="/phonepe"
          element={<PhonePe />}
        />
        <Route
          path="/phonepe-success"
          element={<PhonePeSuccess />}
        />
        <Route
          path="/paytm"
          element={<Paytm />}
        />
        <Route
          path="/paytm-success"
          element={<PaytmSuccess />}
        />
        <Route
          path="/googlepay"
          element={<GooglePay />}
        />
        <Route
          path="/googlepay-success"
          element={<GooglePaySuccess />}
        />
        <Route
          path="/payment-history"
          element={<PaymentHistory />}
        />
        <Route
          path="/receipt-template"
          element={<ReceiptTemplate />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;