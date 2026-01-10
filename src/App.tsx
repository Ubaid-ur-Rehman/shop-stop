import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './Pages/HomePage'
import OrderPage from './Pages/OrderPage'
import CheckoutPage from './Pages/CheckoutPage'
import TrackingPage from './Pages/TrackingPage'
import { useEffect, useState } from 'react'

function App() {
  const [cart,setCart] = useState([]);
  useEffect(() => {
        fetch('http://localhost:3000/api/cart-items?expand=product')
        .then(response => response.json())
        .then(data => {
            // Update the products state with the fetched data
            setCart(data);
            console.log(data);
        });
    },[]);
  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage cart={cart} />} />
    <Route path='orders' element={<OrderPage  cart={cart} />} />
    <Route path='checkout' element={<CheckoutPage cart={cart} />} />
    <Route path='tracking' element={<TrackingPage  />} />
   </Routes>
   </>
  )
}

export default App
