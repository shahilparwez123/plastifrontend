import React,{useEffect} from 'react'
import OurProducts from '../../components/OurProducts/OurProducts'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Products = ()=>{

useEffect(() => {
    window.scrollTo(0,0);
}, []);

    return(
         <>
        <Navbar/>
        <OurProducts />
        <Footer />
        </>
    )
}





export default Products

