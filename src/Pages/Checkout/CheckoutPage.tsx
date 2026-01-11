import './checkout.css';
import './checkout-header.css';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentSummary from './PaymentSummary';
import OrderSummary from './OrderSummary';

export default function CheckoutPage({cart  , fetchCartItems}:any) {
      let [deliveryOptions,setDeliveryOptions] = useState([]);
      let [paymentSummary,setPaymentSummary] = useState({}) as any;
   useEffect(() => {
     axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then((response) => {
        setDeliveryOptions(response.data);
    })
   axios.get('/api/payment-summary')
    .then((response) => {
        setPaymentSummary(response.data);
    })
      },[cart]);
     let count = 0;
    cart.forEach((cartItem:any) => {
        count += cartItem.quantity;
    });
  return (
    <div>
         <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{count} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
       <OrderSummary cart={cart} deliveryOptions={deliveryOptions} fetchCartItems={fetchCartItems} />

       <PaymentSummary paymentSummary={paymentSummary} />
      </div>
    </div>
    </div>
  )
}
