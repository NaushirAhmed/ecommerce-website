import React, { useContext, useEffect ,useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,showSearch,setSearch,setShowSearch} =useContext(ShopContext);
    const Location=useLocation()
    const [Visible, setVisible] = useState('')

    useEffect(()=>{
         if(location.pathname.includes('collection')){
              setVisible(true)
         }else{
         setVisible(false)
         }
    },[Location])
  return showSearch && Visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div  className='inline-flex items-center justify-center border border-gray-300 py-2 px-5 my-5 mx-3 rounded-full w-3/4 sm:1/2'>
           <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search...'/>
           <img src={assets.search_icon} className='w-4'/>
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon}/>
    </div>
  ):
  null
}

export default SearchBar