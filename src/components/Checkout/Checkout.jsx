import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
//import { use } from 'react';
//import { set } from 'mongoose';
import axios from 'axios';
//import { clearCart } from '../../../../backend/controllers/cartController';
//import { form } from 'framer-motion/client';

const Checkout = () => {

    const {totalAmount, cartItems, clearCart} = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '',
        email: '', address: '', city: '',
        zipCode: '', paymentMethod: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //GRAB TOKEN
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};


    //PAYMENT GATEWAY
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentStatus = params.get('payment_status');
        const sessionId = params.get('session_id');

        if(paymentStatus){
            setLoading(true);


            if(paymentStatus === 'success' && sessionId) {
                axios.get(`https://plastibackend.onrender.com/api/orders/confirm?session_id=${sessionId}`, {
                 headers: authHeaders
                    })
                .then(({ data})=> {
                    clearCart();
                    navigate('/myorder', { state: { order: data.order } });
                })
                .catch(err => {
                    console.error('Payment consirmation error:', err);
                    setError('Payment confirmation failed. Please contact support.');
                })
                .finally(() => setLoading(false));
            
        }
        else if(paymentStatus === 'cancel') {
            setError('Payment was cancelled or failed. Please contact support.');
            setLoading(false);
        }
    }
}, [location.search, navigate])



const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
}

//SUBMIT FUNCTION
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!cartItems || cartItems.length === 0) {
    setError("Your cart is empty");
    setLoading(false);
    return;
}

    //CALCULATE PRICING
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    if (!Array.isArray(cartItems)) {
    setError("Cart data is invalid");
    setLoading(false);
    return;
}

if (!formData.paymentMethod) {
    setError("Please select payment method");
    setLoading(false);
    return;
}
    const payload = {
        
        ...formData,
        subtotal,
        tax,
        total: Number((subtotal + tax).toFixed(2)),
        items: cartItems
        .filter(ci => ci.item && ci.item.price > 0 && ci.quantity > 0)
        .map(({ item, quantity }) => ({
            name: item.name,
            price: Number(item.price),
            quantity: Number(quantity),
            imageUrl: item.imageUrl || ''
        }))
        
    };
    console.log("FINAL PAYLOAD:", payload);
try{
    if(formData.paymentMethod === 'online') {
        const {data} = await axios.post('https://plastibackend.onrender.com/api/orders', 
            payload, 
            { headers: authHeaders }
        );

        
        window.location.href = data.checkoutUrl;
    } else {
        //COD
        const {data} = await axios.post('https://plastibackend.onrender.com/api/orders',
            payload,
            { headers: authHeaders }
        );
        

        clearCart();
        navigate('/myorder', { state: { order: data.order } });

    }

} catch(err) {
    console.error('Order submission error:', err);
    setError(err.response?.data?.message || 'Failed to submit order');

    }
    finally {
        setLoading(false);
    }
}




    return (
        <div className='min-h-screen bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4'>
            <div className=' mx-auto max-w-4xl'>
                <Link className=' flex items-center gap-2 text-amber-400 mb-8' to='/cart'>
                <FaArrowLeft/> Back to Cart
                </Link>
                <h1 className=' text-4xl font-bold text-center mb-8'>
                    Checkout

                </h1>
                <form className=' grid lg:grid-cols-2 gap-12' onSubmit={handleSubmit}>
                < div className = "bg-[#4b3b3b]/80 p-6 rounded-3xl space-y-6 shadow-lg" >
                        <h2 className="text-2xl font-bold">Personal Information</h2>
                        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                        <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                        <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
                        <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div >

                    {/* PAYMENT DETAILS  */}
                    <div className='bg-[#4b3b3b]/80 p-6 rounded-3xl space-y-6 shadow-xl border border-amber-700/20'>
                    <h2 className=' text-2xl font-bold text-amber-200 pb-2 border-b border-amber-700/20'>Payment Details</h2>


                    {/* ORDER ITEMS   */}
                    <div className='bg-[#2a1e1e] p-5 rounded-xl space-y-4 border border-amber-700/20'>
                        <h3 className=' text-lg font-semibold text-amber-100'>Your Order Summary</h3>

                        {cartItems.map(({ _id, item, quantity}) => (
                            <div key={_id} className=' flex justify-between items-center bg-[#1f1515] px-4 py-3 rounded-xl border border-amber-700/20 shadow-sm'>
                                <div className='flex-1'>
                                    <span className=' text-amber-200 font-medium tracking-wide'> {item.name}
                                    </span>

                                    <span className=' ml-2 text-amber-500/80 text-sm font-semibold'>x{quantity}</span>

                                </div>
                                <span className='text-amber-400 font-semibold'>
                                    ₹{(item.price * quantity).toFixed(2)}
                                </span>
                            </div>

))}
                    </div>


                    <div className='mt-6'>
                    <PaymentSummary totalAmount={totalAmount} />
                       </div>

                    {/*  PYMENT METHOD  */}
            <div className='mt-6'> 
                <label className=' block mb-2 text-amber-200 font-medium'>Payment Method</label>
                <select name = 'paymentMethod' value={formData.paymentMethod}
                onChange={handleInputChange} required className=' w-full bg-[#3a2b2b]/50 rounded-xl px-4 py-3 text-amber-100 border border-amber-700/30'>
                    <option value="">Select a payment method</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                </select>

            </div>

            {error && <p className=' text-red-500'>{error}</p>}
            <button type='submit' disabled={loading} className='w-full mt-6 bg-gradient-to-r from-red-600 to-amber-600 py-4
            rounded-xl font-bold flex justify-center items-center shadow-lg hover:scale-[1.02] transition-all duration-300'>
                <FaLock className=' mr-2 '/> {loading ? 'Processing...' : 'Complete Order'}
                


            </button>
            
            </div>
            </form>
                    
            </div>
            
        </div>

    )
}

const Input = ({ label, name, type = "text", value, onChange }) => (
    <div>
        <label className=' block mb-1'>{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} required
        className=' w-full bg-[#3a2b2b]/50 rounded-xl px-4 py-3 text-amber-100 border border-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-500'/>
    </div>
);

const PaymentSummary = ({ totalAmount }) => {
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    return (
        <div className='bg-[#3a2b2b]/40 p-4 rounded-xl space-y-3 mt-4 border border-amber-600/20 shadow-inner'>
            <div className=' flex justify-between text-amber-100/80 text-sm'>
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>


            </div>

            <div className=' flex justify-between text-amber-100/80'>
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className=' flex justify-between font-bold border-t border-amber-700/30 pt-3 text-lg text-amber-200'>
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
            </div>

        </div>
    )

}
export default Checkout;