import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div >
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={'US'}/>
      </div>

     <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img src={assets.about_img} className='w-full md:max-w-[450px]'/> 
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, assumenda illum distinctio voluptatum ipsa beatae consequatur quasi non nihil cumque iusto sunt temporibus officiis laboriosam dignissimos corrupti. A, nihil perferendis?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consequuntur, obcaecati provident quaerat reiciendis, ipsum quos non inventore impedit magnam repudiandae nihil labore laboriosam nobis.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, provident earum quam fuga eum illum aliquid fugiat veniam numquam veritatis nisi expedita vel doloribus nemo necessitatibus odit? Voluptate, voluptas modi.</p>
      </div>
     </div>
     <div className='text-xl py-4'>
      <Title text1={"WHY"} text2={"CHOOSE US"}/>
     </div>
     <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border border-gray-300  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Accurence:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ab vel exercitationem beatae, et inventore mollitia incidunt a eos voluptatum culpa. Ab alias, eos minus cumque velit ipsam maiores vero.</p>
      </div>
      <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convinience:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ab vel exercitationem beatae, et inventore mollitia incidunt a eos voluptatum culpa. Ab alias, eos minus cumque velit ipsam maiores vero.</p>
      </div>
      <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Services:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ab vel exercitationem beatae, et inventore mollitia incidunt a eos voluptatum culpa. Ab alias, eos minus cumque velit ipsam maiores vero.</p>
      </div>
     </div>
     <NewsletterBox/>
    </div>
  )
}

export default About