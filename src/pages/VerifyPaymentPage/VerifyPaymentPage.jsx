import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useCart } from "../../CartContext/CartContext";

const VerifyPaymentPage = () => {

    const { clearCart } = useCart();
    const {search} = useLocation();
    const navigate = useNavigate();
    const [statusMsg, setStatusMsg] = useState('Verifying payment...');
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};


    useEffect(() => {
            const params = new URLSearchParams(search);
            const success = params.get('success');
            const session_id = params.get('session_id');


            //MISSING OR CANCELLED
            if(success !== 'true' || !session_id){
                if(success === 'false'){
                    navigate('/checkout', { replace: true });
                    return;
                }
                setStatusMsg('Payment failed but order placed for completion')
                return;

            }

            //SsTRIPE VERIFY
            axios.get('https://plastibackend.onrender.com/api/orders/confirm', {
                params: { session_id },
                headers: authHeaders
            })
            .then( () => {
                clearCart();
                navigate('/myorders', { replace: true });
            })
            .catch(err => {
                console.log('Confirmation Error:', err);
                setStatusMsg('There was an error')
                clearCart(false);
            })

            
    }, [search, navigate, clearCart, authHeaders])


    return (
        <div className=' min-h-screen flex items-center justify-center text-white'>
            <p>{statusMsg}</p>

        </div>
    )
}


export default VerifyPaymentPage