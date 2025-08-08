
import {createContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets";
import {  toast } from 'react-toastify';
import axios  from "axios"


export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const Currency = "$";
    const Delivery_fees = 10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();


     const AddToCart = async(itemId,size)=>{

        if (!size) {
            toast.error("Please Select Size")
            return;
        }

    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+= 1;

        }else{
            cartData[itemId][size]=1;
        }
    }else{
        cartData[itemId]={};
        cartData[itemId][size]=1;
    }   
    setCartItems(cartData);

      if(token){
        try {
             await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
        } catch (error) {
            console.log(error)
        toast.error(error.message)
        }
      }

}

  const getCartCount=()=>{
    let totalCount = 0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
  }

  const getproductData = async ()=>{
    try {
        const response = await axios.get(backendUrl + "/api/product/list")
        if(response.data.sucess){
            setProducts(response.data.products)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  } 

   const getUserCart = async (token)=>{
    try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
        
             if(response.data.success){
                setCartItems(response.data.cartData)
             }
        } catch (error) {
            console.log(error) 
        toast.error(error.message)
        }
   }
 useEffect(()=>{
     getproductData();
 },[])

 useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }
 },[])

  const updateQantity = async(itemId,size,quantity)=>{
            const cartData =structuredClone(cartItems)
            cartData[itemId][size]=quantity
            setCartItems(cartData);

             if(token){
        try {
             await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
        } catch (error) {
            console.log(error)
        toast.error(error.message)
        }
      }
  }

  const getCartAmount =() => { 
       let totalAmount =0
       for(const items in cartItems){
        let itemInfo =products.find((product)=> product._id === items)
        for(const item in cartItems[items]){
            try {
                totalAmount += itemInfo.price * cartItems[items][item]
            } catch (error) {
                
            }
        }
    }
       return totalAmount;
  }



    const value = {
        products, Currency, Delivery_fees,search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,AddToCart,getCartCount,updateQantity,getCartAmount,navigate,
        backendUrl,setToken,token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;