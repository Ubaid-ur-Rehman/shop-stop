import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react'

export default function OrderSummary({cart,deliveryOptions , fetchCartItems}:any) {
    let deliveryOption  = cart.map((cartItem:any) => {
        return deliveryOptions.find((option:any) => option.id == cartItem.id)
    })
  
  return (
     <div className="order-summary">
       {cart.map((cartItem:any) => {
        function onDelete() {
            axios.delete(`/api/cart-items/${cartItem.productId}`)
            .then(() => {
                fetchCartItems();
            });
        }
        return (
          <div className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('MMMM D')}
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
                  <span className="delete-quantity-link link-primary" onClick={onDelete}>
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
                   async  function changeDliveryOption(cartItem:any) {
                         console.log(option.id);
                           await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: option.id
                    });
                      fetchCartItems();
                     }
                  return(
                <div className="delivery-option" key={option.id} onClick={() => changeDliveryOption(cartItem)}>
                  <input type="radio" checked={option.id == cartItem.deliveryOptionId}
                    className="delivery-option-input"
                    name={`delivery-option-${cartItem.productId}`} />
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
