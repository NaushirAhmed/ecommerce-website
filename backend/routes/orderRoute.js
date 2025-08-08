import express from 'express'
import { placedOrder,placedOrderRazorpay,placedOrderStripe,allOrders,userOrders,upadateStatus} from '../controllers/orderContriller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'



const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,upadateStatus)


//payment features
orderRouter.post('/place',authUser,placedOrder)
orderRouter.post('/stripe',authUser,placedOrderStripe)
orderRouter.post('/razorpay',authUser,placedOrderRazorpay)

//user features
orderRouter.post('/userorders',authUser,userOrders)
//verify stripe payment

//orderRouter.post('/verfiyStripe',authUser,verifyStripe)

export default orderRouter;