import axios from 'axios'
import React, {useState, useEffect } from 'react'
import { backendUrl,Currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async()=>{
    try {
       const response = await axios.get(backendUrl+"/api/product/list")
        console.log(response)
     if(response.data.sucess){
      setList(response.data.products)
     }else{
      toast.error(response.data.message)
     }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
   const productRemove = async (id)=>{
    try {
          const response = await axios.post(backendUrl+"/api/product/remove",{ id },{headers:{token}})

          if(response.data.sucess){
            toast.success(response.data.message)
            await fetchList();
          }else{
            toast.error(response.data.message)
          }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <>
     <p className='mb-2'>All Product List</p>
     <div className='flex flex-col gap-2'>
      {/**-----product list */}

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 sm:text:sm'>
        <b>Image</b>
        <b>Name</b>
        <b>category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/**Product list */}
      {
        list.map((item,index)=>(
         <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_] items-center py-1 px-2 border text-sm' key={index}>
          <img className='w-12' src={item.image[0]}/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{Currency}{item.price}</p>
          <p onClick={()=>productRemove(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
         </div>
        ))
      }
     </div>
    </>
  )
}

export default List