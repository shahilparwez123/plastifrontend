import React, {useEffect, useState} from 'react'
import {iconClass, inputBase} from '../../assets/dummydata'
import { FaCheckCircle, FaEyeSlash, FaUser, FaEye, FaLock, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import { useLocation } from 'react-router-dom';

const url = 'https://plastibackend.onrender.com';
const Login =({onLoginSuccess, onClose})=>{
    //const location = useLocation();
    const [showToast, setShowToast] = useState({visible: false, message:'', isError: false});
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: '', password: '', rememberMe: false});


useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const error = params.get("error");

    // ✅ LOGIN SUCCESS
    if (token) {
    localStorage.setItem("authToken", token);

    // ✅ SHOW SAME TOAST LIKE NORMAL LOGIN
    setShowToast({
        visible: true,
        message: "Login Successful!",
        isError: false
    });

    setTimeout(() => {
        setShowToast({ visible: false, message: '', isError: false});
    
        onLoginSuccess && onLoginSuccess(token); // optional
    }, 1500);
}

    // ❌ USER NOT REGISTERED
    if (error === "user_not_registered") {
        alert("User not registered. Please sign up first.");
    }

    if (error === "google_failed") {
        alert("Google login failed");
    }

}, []);



    useEffect(() =>{
        const stored = localStorage.getItem('loginData');
        if(stored) setFormData(JSON.parse(stored));
    }, []);


   




const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const res = await axios.post(`${url}/api/user/login`, {
            email:formData.email,
            password: formData.password,
        })
        console.log('Axios Res:',res)

        if(res.status === 200 && res.data.success && res.data.token){
            localStorage.setItem('authToken', res.data.token);

            //REMEMBER ME
            formData.rememberMe ? localStorage.setItem('loginData', JSON.stringify(formData)) 
            : localStorage.removeItem('loginData');

            setShowToast({visible: true, message: 'Login Successful!', isError: false});
            setTimeout(() => {
                setShowToast({ visible: false, message: '', isError: false});
                onLoginSuccess(res.data.token);
            },1500)
        }
        else{
            console.warn('Unexpected Err:', res.data)
            throw new Error(res.data.message || 'Login Failed');
        }
    }
    catch(err){
        console.error('Axios error: ', err);
        if(err.response){
            console.error('Server res:', err.response.status, err.response.data );

}

const msg = err.response?.data?.message || err.message || 'Login Failed';
        setShowToast({visible: true, message: msg, isError: true});
        setTimeout(() => {
            setShowToast({ visible: false, message: '', isError: false});
          //  onLoginSuccess(res.data.token)
        }, 2000);

    }
}

const handleChange = ({ target: {name, value, type, checked}}) => 
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value}));

const toggleShowPassword = () => setShowPassword(prev => !prev);


    return (
        <div className="space-y-6 relative">
            <div className= {` fixed top-4 right-4 z-50 transition-all duration-300
            ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>

            <div className={` px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm ${showToast.isError ? 'bg-red-600 text-white'
            : 'bg-green-600 text-white'}`}>

            </div>



                <div className=' bg-green-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center
                gap-2 text-sm'>
                    <FaCheckCircle className=' flex-shrink-0' />
                    <span>{showToast.message}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className=' space-y-5'>
                <div className=' relative'>
                    <FaUser className={iconClass}/>
                    <input 
                    type="email"
                     name='email'
                      placeholder= 'Email' 
                      value={formData.email || ''}
                    onChange={handleChange} className={`${inputBase} pl-10 pr-4 py-3`}/>
                </div>
                <div className=' relative'>
                    <FaLock className={iconClass}/>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder= 'Password' value={formData.password || ''}
                    onChange={handleChange} className={`${inputBase} pl-10 pr-10 py-3`}/>
                    <button type='button' onClick={toggleShowPassword} className=' absolute right-3
                    top-1/2 transform -translate-y-1/2 text-amber-400'>
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>


                <div className=' flex items-center'>
                    <label className=' flex items-center'>
                        <input type="checkbox" name='rememberMe' checked={formData.rememberMe} onChange={handleChange}
                        className=' form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 rounded
                        focus:ring-amber-600' />

                        <span className=' ml-2 text-amber-100'>Remember Me
                        </span>
                    </label>
                </div>

                {/* OR Divider */}
<div className="flex items-center gap-3 my-2">
  <div className="flex-1 h-[1px] bg-amber-600/30"></div>
  <span className="text-amber-300 text-sm">OR</span>
  <div className="flex-1 h-[1px] bg-amber-600/30"></div>
</div>

{/* Google Button */}
<button
  type="button"
  onClick={() => window.location.href = "https://plastibackend.onrender.com/auth/google"}
  className="w-full py-3 bg-[#2D1B0E] text-amber-100 font-semibold rounded-lg 
  border border-amber-500/40 hover:bg-amber-600 hover:text-black 
  transition-all flex items-center justify-center gap-3"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="google"
    className="w-5 h-5"
  />
  Signup / Login with Google
</button>

<button
  type="submit"
  className="w-full py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-all"
>
  Login
</button>
            </form>

            <div className=' text-center'>
                <Link to='/signup'  className=' inline-flex items-center gap-2
                text-amber-400 hover:text-amber-600 transition-colors'>
                    <FaUserPlus /> Create New Account
                </Link>
            </div>
        </div>
    )
}


export default Login