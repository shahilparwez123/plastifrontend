import React, {useEffect} from 'react'
import CartPage from '../../components/CartPage/CartPage'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Cart = ()=>{

useEffect(() => {
    window.scrollTo(0,0);
}, []);

    return(
        <>
        <Navbar />
        <CartPage />
        
        <Footer />
        
        </>
    )
}





export default Cart

