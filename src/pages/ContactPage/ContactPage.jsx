import React, {useEffect} from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";


const ContactPage = () => {
useEffect(() => {
    window.scrollTo(0,0);
}, []);

    return (
        <>
            <Navbar />
            <Contact />
            <Footer />
        </>
    )
}

export default ContactPage
