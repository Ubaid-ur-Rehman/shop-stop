import './checkout.css';
import './checkout-header.css';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CheckoutPage({cart}:any) {
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
      },[]);
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
        <div className="order-summary">
       {cart.map((cartItem:any) => {
        return (
          <div className="cart-item-container">
            <div className="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  ${cartItem.product.priceCents / 100}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((option:any) => {
                      console.log(option.id == cartItem.id);
                  let shipping = 'FREE Shipping';
                  if(option.priceCents > 0){
                    shipping = `$${(option.priceCents / 100).toFixed(2)} - Shipping`;
                  }
                  return(
                <div className="delivery-option">
                  <input type="radio" checked={option.id == cartItem.id}
                    className="delivery-option-input"
                    name={`delivery-option-${option.id}`} />
                  <div>
                    <div className="delivery-option-date">
                      {dayjs(option.estimatedDeliveryTimeMs).format('DD, MMMM YY')}
                    </div>
                    <div className="delivery-option-price">
                      {shipping}
                    </div>
                  </div>
                </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
       })}
        </div>

        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

              {paymentSummary && (
                <>
                <div className="payment-summary-row">
              <div>Items ({paymentSummary && paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">${(paymentSummary && paymentSummary?.productCostCents / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div> 
              <div className="payment-summary-money">${(paymentSummary && paymentSummary?.shippingCostCents / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${(paymentSummary && paymentSummary?.totalCostBeforeTaxCents / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${(paymentSummary && paymentSummary?.taxCents / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${(paymentSummary && paymentSummary?.totalCostCents / 100).toFixed(2)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button></>
              ) }
            
        </div>
      </div>
    </div>
    </div>
  )
}
