import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());
app.use('/api/user',userRoute);
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


// api endpoint

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})