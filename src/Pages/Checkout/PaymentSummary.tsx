import axios from 'axios'
import { useNavigate } from 'react-router'
import React from 'react'

export default function PaymentSummary({paymentSummary}:any) {
    let navigation = useNavigate();
    async function placeOrder() {
        await axios.post('/api/orders')
        navigation('/orders');


    }
  return (
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

            <button className="place-order-button button-primary" onClick={placeOrder}>
              Place your order
            </button></>
              ) }
            
        </div>
  )
}
