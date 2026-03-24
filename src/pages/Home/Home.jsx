import React, { useEffect, useState } from 'react'
import Login from '../../components/Login/Login';
import Navbar from "../../components/Navbar/Navbar";
import Banner from '../../components/Banner/Banner';
import AboutHome from '../../components/AboutHome/AboutHome';
import OurHomeMenu from '../../components/OurHomeMenu/OurHomeMenu';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';


const Home =() =>{
const location = useLocation();
const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
  const params = new URLSearchParams(location.search);

  const token = params.get("token");
  const showLoginParam = params.get("showLogin");

  if (token && token !== "undefined") {
    localStorage.setItem("authToken", token);
    window.location.href = "/";
  }

  if (showLoginParam === "true") {
    setShowLogin(true);

    // ✅ remove param so refresh won't reopen popup
    window.history.replaceState({}, document.title, "/");
  }

}, [location.search]); // 🔥 THIS IS THE MAIN FIX


  return(
<>
    <Navbar />
    <Banner />
    <AboutHome />
    <OurHomeMenu/>

    {showLogin && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-full max-w-md bg-gradient-to-br from-[#4a372a] p-8 rounded-xl shadow-lg border-4 border-amber-700/30 relative">
      
      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-2 right-2 text-white"
      >
        ✖
      </button>

      <Login
        onLoginSuccess={() => {
          setShowLogin(false);
          window.location.href = "/cart";
        }}
      />
    </div>
  </div>
)}

    <Footer/>

</>
  )
}

export default Home;