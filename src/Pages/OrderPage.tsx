import './orders.css';
import { Link } from 'react-router';
import Header from '../Components/Header';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function OrderPage({cart}:any) {
    let [orders,setOrders] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/api/orders?expand=products')
        .then(response => {
            setOrders(response.data);
        });
    } , []);
    let count = 0;
    cart.forEach((cartItem:any) => {
        count += cartItem.quantity;
    });
  return (
    <div>
      <Header />

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">
        {orders.map((order) => {
          return (
            <div className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                  </div>
                </div>
                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>
              <div className="order-details-grid">
              {order.products.map((orderProduct:any) => {
                return (
                  <Fragment key={orderProduct.id}>
                  <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.deliveryDateMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
            </Fragment>
                )
              })}
          </div>
        </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}
