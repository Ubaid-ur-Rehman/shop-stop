import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './Pages/Home/HomePage'
import OrderPage from './Pages/OrderPage'
import CheckoutPage from './Pages/Checkout/CheckoutPage'
import TrackingPage from './Pages/TrackingPage'
import { useEffect, useState } from 'react'
import ProductDetails from './Pages/Home/ProductDetails'
import axios from 'axios'

function App() {
  const [cart,setCart] = useState([]);
  function fetchCartItems() {
    axios.get('http://localhost:3000/api/cart-items?expand=product')
        .then((response:any ) => {
          setCart(response.data);
  })
  }
  useEffect(() => {
        fetchCartItems();
    },[]);
  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage cart={cart} fetchCartItems={fetchCartItems} />} />
    <Route path='orders' element={<OrderPage  cart={cart} />} />
    <Route path='checkout' element={<CheckoutPage cart={cart} fetchCartItems={fetchCartItems} />} />
    <Route path='tracking' element={<TrackingPage  />} />
    <Route path='product/:id' element={<ProductDetails  />} />
   </Routes>
   </>
  )
}

export default App
