import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import About from '../../components/About/About'
import { useEffect } from 'react';


const AboutPage = ()=>{

useEffect(() => {
    window.scrollTo(0,0);
}, []);

    return(
        <>
        <Navbar />
        <About />

        <Footer />
        </>
    )
}






export default AboutPage