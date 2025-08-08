
import orderModel from "../models/orderModel.js";
import userModel from "../models/user.Model.js";
// import Stripe from 'stripe'

//global variable
// const Currency ='inr'
// const deliveryCharge =10;

//gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//place order using COD
const placedOrder = async(req,res)=>{

    try {
        const  {userId,items, amount,address} = req.body;
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:  Date.now()
        }

         const newOrder = new orderModel(orderData);
         await newOrder.save();
         await userModel.findByIdAndUpdate(userId,{cartData:{}})

         res.json({success : true ,message:"order placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    } 

}
//place order using strip
const placedOrderStripe = async(req,res)=>{
    
    // try {
    //     const  {userId,items, amount,address} = req.body;
    //     const {origin}=req.headers;
    //     const orderData ={
    //         userId,
    //         items,
    //         amount,
    //         address,
    //         paymentMethod:"COD",
    //         payment:false,
    //         date:  Date.now()
    //     }

    //      const newOrder = new orderModel(orderData);
    //      await newOrder.save();
    //      const line_items =items.map((item)=>({
    //         price_data :{
    //             Currency:Currency,
    //             product_data:{
    //                 name:item.name
    //             },
    //             unit_amount:item_price * 100
    //         },
    //         quantity:item.quantity
    //      }))

    //      line_items.push({
    //          price_data :{
    //             Currency:Currency,
    //             product_data:{
    //                 name:"Delivery Charges"
    //             },
    //             unit_amount:deliveryCharge * 100
    //         },
    //         quantity:1
             // const session =await stripe.checkout.session.create({
             //success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            // cancel_url:`${origin}/verify?success=false &orderId=${newOrder._id}`,
            // line_items,
            //mode:'payment',  
    //      }) 

         //res.json({success:true,session_url:session_url})
            
    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false,message:error.message})
    // } 
}

//stripe verify payment
//  const verifyStripe =async (req,res) =req.body
///try{
///if(success ==='true'){
/// await orderModel.findByIdAndUpdate(orderId,{payment:true})
/// await userModel.findByIdAndUpdate(userId,{cartData:{}})
/// res.json({success:false})
//}else{ 
//  await orderModel.findByIdAndUpdate(orderId)
// res.json({success:false})
///}
///}
//catch(error){
// console.log(error)
     //   res.json({success:false,message:error.message})
//}



//place order using razorpay
const placedOrderRazorpay = async(req,res)=>{

}
//all order for admin panel
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
            res.json({success:false ,message:error.message})        
    }

}
//place order using COD
const userOrders = async(req,res)=>{
    try {
        const {userId} =req.body
        const orders = await orderModel.find({userId})
        res.json({success :true ,orders})
    } catch (error) {
        console.log(error)
        res.json({success:true,message:error.message})
    }

}

//upadate order status from admil panel

const upadateStatus= async(req,res)=>{
    try {
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"status updated"})
    } catch (error) {
         console.log(error)
        res.json({success:true,message:error.message})
    }


}

export {/** verifyStripe*/placedOrder,placedOrderRazorpay,placedOrderStripe,allOrders,userOrders,upadateStatus}