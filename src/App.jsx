import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import MyOrderPage from './pages/MyOrderPage/MyOrderPage';
import Login from './components/Login/Login';

const App =() =>{
  return(
<Routes>
  <Route path='/' element={<Home />} />
   <Route path='/contact' element={<ContactPage />} />
    <Route path='/about' element={<AboutPage />} />
     <Route path='/products' element={<Products />} />
      

<Route path='/signup' element={<SignUp/>}/>
<Route path='/login' element={
  <div className="min-h-screen flex items-center justify-center bg-[#1a120b]">
    <div className="w-full max-w-md bg-gradient-to-br from-[#4a372a] p-8 rounded-xl shadow-lg border-4 border-amber-700/30">
      <Login />
    </div>
  </div>
} />

{/* Payment verification  */}
<Route path='/myorder/verify' element={< VerifyPaymentPage/>}/>



<Route path='/cart' element={
  <PrivateRoute>
    <Cart/>
    </PrivateRoute>  }/>
  
  <Route path='/checkout' element={<PrivateRoute>< CheckoutPage/></PrivateRoute>}/>
  <Route  path='/myOrder' element={<PrivateRoute><MyOrderPage/></PrivateRoute>}/>


</Routes>
  )
}

export default App