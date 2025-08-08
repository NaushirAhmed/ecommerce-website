import React, { use } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useContext, useState,useEffect } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
     const {products ,search, showSearch}= useContext(ShopContext) ;{/* products from context */}

    {/* State to manage filter visibility, filtered products, categories, and subcategories */}
    const [showFilter, setShowFilter] = useState(false);{/* filter visibility */}
    const [filteredProducts, setFilteredProducts] = useState([]);{/* product to display product */}
    const [category, setCategory] = useState([]); {/* category to filter products */}
    const [subCategory, setSubCategory] = useState([]);{/* subcategory to filter products */}
    const [sortType, setSortType] = useState('revelant');


    {/* Function to store the value of category checkbox */}
    const toggleCategory = (e) => {
      if(category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item=> item !== e.target.value));
    }else{

        setCategory(prev=> [...prev, e.target.value]);
    }
  }
    {/* Function to store the value of subCategory checkbox */}
  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item=> item !== e.target.value));
    }else{
      setSubCategory(prev=> [...prev, e.target.value]);
    }
  }
   {/* Function to apply filters based on selected categories and subcategories */}
  const applyFilter = () => {
    let productCopy = products.slice();
    
    {/* here we use to display search term */}
    if(showSearch && search){
     
      productCopy = productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))

    }


    if(category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    // Update the filtered products state
    setFilteredProducts(productCopy);
  }

  {/*filter to sort price accordingly  */}
  const sortProducts = () => {
  let fpCopy = filteredProducts.slice()

  switch (sortType) {
    case 'Low to High':
      setFilteredProducts(fpCopy.sort((a, b) => (a.price - b.price)));
      break;
    case 'High to Low':
      setFilteredProducts(fpCopy.sort((a, b) => (b.price - a.price)));
      break; 
    default:
      applyFilter();
      break;  
  } 
}

      
  {/*using useeffect to displat the products  */}
    useEffect(() => {
        setFilteredProducts(products);
    }, []);

    {/*using useeffect to apply filter when category or subCategory changes */} 
    useEffect(() => {
      applyFilter();
    }, [category, subCategory, search,showSearch,products]);

    useEffect(()=>{
       sortProducts();
    },[sortType])


  return (
    <div className='flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters Option*/}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" :""}`} src={assets.dropdown_icon} alt=''/>
        </p>
        {/* catagory filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "":"hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
             </p>
             </div>
        </div>
        {/* Subcatagory filter  */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "":"hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
             </p>
             </div>
        </div>
      </div>
      {/*Right side  Products  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl px-2'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* SORT PART*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 mb-3'>
            <option value='revelant'>Sort By : Revelant</option>
            <option value='Low to High'>Sort By : Low to High</option>
            <option value='High to Low'>Sort By : High to Low</option>
          </select>
        </div>

        {/*Map Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {
                filteredProducts.map((item, index) => (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
              }
            </div>
      </div>
    </div>
  )
}

export default Collection