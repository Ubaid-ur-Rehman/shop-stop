import dayjs from 'dayjs';
import React from 'react'

export default function OrderSummary({cart,deliveryOptions}:any) {
  return (
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
  )
}
