import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';
import { MdVerified } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
//import { FaHandshake } from "react-icons/fa";
//import { FaLeaf } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";



import l1 from './l1.png';
import l2 from './l2.jpeg';
import l3 from './l3.jpeg';


import t1 from './t1.png';
import t2 from './t2.png';
import t3 from './t3.jpg';
//import Kebab from "./Kebab.png";
//import ChickenTikka from "./ChickenTikka.png";

import Video from "./Video.mp4";
import Logo from "./Logo.png";

// ABOUT PAGE
export const features = [
    {
       id: 1,
       title: "Assured Quality",
        text: "Every product is crafted to meet strict quality standards",
        icon: MdVerified, // store the component reference
        img: l1,
    },
   {
        id: 2,
       title: "Bulk Supply Capability",
       text: "Reliable capacity to fulfill large business demands",
        icon: FaBoxes,
       img: l2,
    },

    {
        id: 3,
       title: "Trusted Manufacturing",
       text: "Delivering consistency that businesses depend on",
        icon: FaHandshake,
       img: l3,
    },
    
];

export const stats = [
    {
        number: '50k+',
        label: 'Units Produced',
        icon: FaIndustry,
        gradient: 'from-amber-500 via-orange-400 to-yellow-600',
    },
    {
        number: '500+',
        label: 'Business Clients',
        icon: FaHandshake,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },
   


    {
        number: '100%',
        label: 'Sustainable',
        icon: FaLeaf,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },

    {
        number: '10+',
        label: 'Smart Machines',
        icon: FaCogs,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },
   
];



export const teamMembers = [
    {
        name: "Automatic Plate Machine",
        role: "High-Speed Production Unit",
        img: t1,
        bio: "Delivers fast, consistent plate manufacturing",
        delay: 0.1,
        
},
    {
        name: "Advanced Die Press",
        role: "Precision Forming Unit",
        img: t2,
        bio: "Ensures precise shaping with superior finish",
       delay: 0.3,
           

       },

       {
        name: "Quality Testing Unit",
        role: "Safety Verification Process",
        img: t3,
        bio: "Confirms reliability before final dispatch",
       delay: 0.5,
           

       },

   
];




// ABOUT HOMEPAGE
export const aboutfeature = [
    { icon: FaBolt, title: "High-Capacity Production", text: "Efficient manufacturing for bulk and business needs", color: "from-amber-400 to-orange-500" },
    { icon: FaRegClock, title: "Reliable Supply", text: "Consistent output with on-time delivery", color: "from-rose-400 to-pink-600" },
    { icon: FaCalendarCheck, title: "Raw Material Provider", text: "Supplying premium inputs to other manufacturers", color: "from-emerald-400 to-cyan-600" },
    { icon: FaFire, title: "Eco-Friendly Standards", text: "Food-safe, biodegradable, and sustainable solutions", color: "from-purple-400 to-indigo-600" }
];



// SPECIAL MENU
//export const cardData = [
   // { id: 1, title: 'Kebab', rating: 4.5, hearts: 105, description: 'Juicy grilled meat with authentic spices', image: Kebab, popular: true, price: '₹40' },
   // { id: 2, title: 'Chicken Tikka', rating: 5.0, hearts: 155, description: 'Tender chicken marinated in sauce', image: ChickenTikka, bestseller: true, price: '₹140' },
   // { id: 3, title: 'Desi Chowmein', rating: 4.2, hearts: 85, description: 'Spicy Asian noodles with a local twist', image: DesiChowmein, price: '₹60' },
   // { id: 4, title: 'Chicken Chargha', rating: 4.8, hearts: 285, description: 'Crispy golden fried whole chicken', image: ChickenChargha, special: true, price: '₹200' },
//];
//export const additionalData = [
   // { id: 5, title: 'Paneer Tikka', rating: 4.8, hearts: 210, description: 'Cottage cheese marinated in spices', image: PaneerTikka, popular: true, price: '₹220' },
    //{ id: 6, title: 'Masala Dosa', rating: 4.5, hearts: 165, description: 'Crispy rice crepe with potato filling', image: MasalaDosa, price: '₹180' },
    //{ id: 7, title: 'Palak Paneer', rating: 4.7, hearts: 190, description: 'Spinach curry with cottage cheese', image: PalakPaneer, price: '₹200' },
    //{ id: 8, title: 'Gulab Jamun', rating: 4.9, hearts: 275, description: 'Golden dumplings in rose syrup', image: GulabJamun, special: true, price: '₹30' },
//];





// FOOTER 
export const socialIcons = [
    { icon: FaFacebook, link: 'https://www.facebook.com/profile.php?id=61578087302758&sk=directory_intro', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/plas.tipro?igsh=OWVleGpybnd2ZG5r', color: '#E1306C', label: 'Instagram' },
    { icon: FaXTwitter, link: 'https://x.com/ProPlasti', color: '#000', label: 'X' },
    { icon: FaYoutube, link: 'https://www.youtube.com/@Plasti-Pro-o9h', color: '#FF0000', label: 'Youtube' },
];


// LOGIN 
export const inputBase = "w-full rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-400";



// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 12345 67890', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Product Name', name: 'Product', type: 'text', placeholder: 'Enter product name ', Icon: FaUtensils },
];




// BANNER
export const bannerAssets = {
    bannerImage: Logo,
    //orbitImages: [Image1, Image2, Image3, Image4],
    video: Video,
};









