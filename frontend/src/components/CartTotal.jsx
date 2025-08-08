import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {Currency,Delivery_fees,getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTAL'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{Currency}{getCartAmount()}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{Currency}{Delivery_fees}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{Currency} {getCartAmount() === 0 ? 0 : getCartAmount() + Delivery_fees }.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal