
import express from "express";
import pg from "pg";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import  cors from "cors";




const app=express();
app.use(cors());
app.use(bodyParser.json());




const  razorpay= new Razorpay ({
    key_id:"enter yours",
    key_secret:"enter yours",
});


app.post("/createOrder",async(req,res)=>{

    try {

        const { name ,amount,email }=req.body;

        const option={
            amount : amount*100,
            currency:'INR',
            receipt : Date.now.toString(),
        }

        const order= await razorpay.orders.create(option);

        res.json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
        });
        
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Internal Server Error');
  }

})



app.listen(3000,(req,res)=>{
    console.log("app is listening on port 3000");
})

