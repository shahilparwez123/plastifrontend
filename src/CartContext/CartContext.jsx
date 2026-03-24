import React, { createContext, useCallback, useContext, useReducer, useEffect} from 'react'
import axios from 'axios';

const CartContext = createContext();

// reducer handling cart action like add, remove , update and item

const cartReducer = (state, action) => {
    switch (action.type){
        case 'HYDRATE_CART': 
            return action.payload;

        case 'ADD_ITEM': {
            const {_id, item, quantity} = action.payload;
            const exists = state.find(ci => ci._id === _id);
            if(exists) {
                return state.map(ci => ci._id === _id ? { ...ci, quantity: ci.quantity + quantity}: ci)
            }

            return [...state, { _id, item, quantity}];
        }

        case 'REMOVE_ITEM': {
            return state.filter(ci => ci._id !== action.payload);
        } 
        case 'UPDATE_ITEM' :{
            const { _id, quantity} = action.payload;
            return state.map(ci => ci._id === _id ? { ...ci, quantity} : ci)

        }
        case 'CLEAR_CART': 
        return [];

        default: return state;

    }
}

//Initialize cart from localstorage 
const intializer = () => {
    const token = localStorage.getItem('authToken');

    if (!token) return []; // ✅ hide cart if not logged in

    try {
        return JSON.parse(localStorage.getItem('cart') || '[]').filter(ci => ci.item);
    } catch {
        return [];
    }
};




export const CartProvider = ({ children}) => {

    const [cartItems, dispatch] = useReducer(cartReducer, [], intializer);
    
    //persist cart state to localstorage

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    //Hydrate form server api
    useEffect(() => {
  const token = localStorage.getItem('authToken');

  if (!token) return;

  axios.get('https://plastibackend.onrender.com/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => dispatch({ type: 'HYDRATE_CART', payload: res.data.filter(ci => ci.item) }))
  .catch(err => console.error(err));

}, []); // ✅ IMPORTANT



    //calculate total cost and total item count 
    const cartTotal = cartItems.reduce((total, ci)=> total + (ci?.item?.price || 0) * ci.quantity, 0);
    const totalItemsCount = cartItems.reduce((sum, item)=> sum + item.quantity, 0 );


    //format total items in power from
    const formatTotalitems = (num) => {
        if(num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'
        }

        return num;
    }


    //dispatch wrapping with usecallback for perfromance
    const addToCart = useCallback(async (item, qty)=> {
        const token = localStorage.getItem('authToken');

        if(!item?._id){
        console.error("Item ID missing");
        return;
    }

    if(!qty){
        console.error("Quantity missing");
        return;
    }
    

        const res = await axios.post('https://plastibackend.onrender.com/api/cart', 
            {itemId: item._id, quantity: Number(qty)},
            {
                //withCredentials: true,
                headers:{ Authorization: `Bearer ${token}`}
            }
        )
        dispatch({
        type: 'ADD_ITEM',
        payload: {
        _id: res.data._id,
        item: res.data.item,
        quantity: res.data.quantity
    }
})
    }, [])



    const removeFromCart = useCallback(async _id => {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            `https://plastibackend.onrender.com/api/cart/${_id}`,
            {
               // withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            
        dispatch({ type: 'REMOVE_ITEM' , payload: _id})
    }, [])


    const updateQuantity = useCallback(async (_id ,qty) => {
        const token = localStorage.getItem('authToken');
        const res = await axios.put(
             `https://plastibackend.onrender.com/api/cart/${_id}`,
             { quantity: qty},
            {
               // withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        dispatch({ type: 'UPDATE_ITEM', payload: res.data})
    }, [])

    const clearCart = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        await axios.post(
            'https://plastibackend.onrender.com/api/cart/clear',
            {},
        {
           // withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    dispatch({ type: 'CLEAR_CART' })
}, [])

const totalItems = cartItems
.filter(ci => ci.item)
.reduce((sum, ci) => sum + ci.quantity, 0);
const totalAmount = cartItems.reduce((sum,ci) => {
    const price = ci?.item?.price || 0;
    return sum + price * ci.quantity;
},0)


    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalAmount,
            totalItems,

        }}>
            {children}
            </CartContext.Provider>
    )
}


export const useCart = () => useContext(CartContext);