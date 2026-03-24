import React, { useState } from 'react'
import { FaDownload, FaPlay, FaSearch,FaTimes } from "react-icons/fa";
import { bannerAssets } from '../../assets/dummydata';
import { useNavigate } from 'react-router-dom';
const Banner =()=>{

const [searchQuery, setSearchQuery] = useState('');
const [showVideo, setShowVideo] = useState(false);
const{bannerImage, video} = bannerAssets
const navigate = useNavigate();
const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/products?search=${searchQuery}`);
}


    return(
        <div className='relative'>
        <div className=' bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white
        py-16 px-4 sm:px-8 relative overflow-hidden'>
            <div className=' absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10' />
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10'>
            
            
            {/* Left Content  */}
            <div className=' flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left'>
                <h1 className=' text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif
                drop-shadow-md'>
                    We're Here <br/>

                    <span className=' text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text'>
                    Serve with Style & Care
                    </span>

                </h1>
                <p className=' text-lg md:text-lg lg:text-xl font-playfair italic sm:text-xl text-amber-100
                max-w-xl opacity-90 mx-auto md:mx-0'>
                
                We craft eco-friendly paper plates and crockery that deliver strength, hygiene, and confidence in every serving.
                </p>
                <form onSubmit={handleSearch} className=' relative max-w-2xl mx-auto md:mx-0 group'>
                    <div className='relative flex items-center bg-amber-900/30 rounded-xl border-2
                    border-amber-500 shadow-2xl hover:bg-amber-400/50 transition-all duration-300'>
                        <div className=' pl-6 pr-3 py-4'>
                        <FaSearch className=' text-xl text-amber-400/80' />
                    </div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Discover our products...'
                    className=' w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg
                    font-medium tracking-wide ' />

                    <button type='submit' className=' mr-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300
                    rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200
                    transition-all duration-300 shadow-lg hover:shadow-amber-300/20'>
                    Search
                    </button>
                    </div>
                     

                </form>

                <div className=' flex flex-wrap gap-4 justify-center md:justify-start mt-6'>
                    <button className=' group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6
                    py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm'>
                        <FaDownload className=' text-xl text-amber-400 group-hover:animate-bounce'/>
                        <span className=' text-lg'>Download Catalogue </span>
                    </button>

                    <button onClick={() => setShowVideo(true)} className=' group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300
                    hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg
                    hover:shadow-amber-300/30'>
                        <FaPlay className= ' text-xl text-amber-900' />
                        <span className='text-lg text-amber-900 font-semibold'>Watch Vedio</span>
                    </button>
                </div>

            </div>          


           
            {/* image container */}
<div className="flex-1 flex justify-center md:justify-end">
  <div
    className="relative rounded-full
    w-[250px] h-[250px]
    xs:w-[300px] xs:h-[300px]
    sm:w-[350px] sm:h-[350px]
    bg-gradient-to-br from-amber-700 via-amber-800 to-amber-400
    shadow-2xl flex items-center justify-center"
  >
    <img
  src={bannerImage}
  alt="Logo"
  className="
    w-full h-full rounded-full object-contain
    scale-[1.35] sm:scale-[1.4] lg:scale-[1.45]
  "
/>





  </div>
</div>

            </div>       
        </div>

        {/* Video Model  */}
        {showVideo &&(
            <div className=' fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4'>
                <button onClick={() => setShowVideo(false)}
                    className=' absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all'>
                    <FaTimes/>
                </button>
                <div className=' w-full max-w-4xl mx-auto'>
                <video
                controls autoPlay className=' w-full aspect-video object-contain rounded-lg
                shadow-2xl'>
                    <source src ={video} type='video/mp4'/>

                </video>
                </div>
            </div>
        )}


        </div>
    )
}

export default Banner
