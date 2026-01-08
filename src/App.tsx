import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './Pages/HomePage'
import OrderPage from './Pages/OrderPage'
import CheckoutPage from './Pages/CheckoutPage'
import TrackingPage from './Pages/TrackingPage'

function App() {

  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='orders' element={<OrderPage />} />
    <Route path='checkout' element={<CheckoutPage />} />
    <Route path='tracking' element={<TrackingPage />} />
   </Routes>
   </>
  )
}

export default App
