import { useState } from "react";
import axios from "axios";
import Successfull from "./successfull";
import { useNavigate } from "react-router-dom";
import "./coffeform.css";
import tm from "/assets/tm.png";


export default function CoffeeForme (){
    const navigate = useNavigate();
    let [formdata,setdata]=useState({name:"",
                                     email : "",
                                     amount:"",
                                     message : "",
    });


    const loadRazorpay = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

   async function handleSubmit(e){
       
        e.preventDefault();
        console.log(formdata);
        

        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

        try {
            const response= await axios.post("http://localhost:3000/createOrder",formdata , {
                headers : {
                    "Content-Type":"application/json",
                },

            })

            console.log(response.data);
            const {orderId,currency,amount}=await response.data;

            const options = {
                "key": "enter yours", // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": currency,
                "name": "Coffee_shop", //your business name
                "description": "Test Transaction",
                "image": {tm},
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": formdata.name, //your customer's name
                    "email": formdata.email,
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            navigate('/success',{state : {orderId : orderId}})

            

            
        } catch (error) {
            console.log(error);
            
        }



    }


    function handleChange(e){
        const{name , value}=e.target;
        setdata((prevdata)=>({
            ...prevdata,
            [name]:value

        }));
    }




    return <>
            
      <div className="coffee-container">
        <img src={tm} alt="coffee cup" className="coffee-cup" />
        <div className="form-wrapper">
          <h1>Treat a Coffee !</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter your name here!" value={formdata.name} onChange={handleChange} />
            <input type="text" name="email" placeholder="Enter your email here!" value={formdata.email} onChange={handleChange} />
            <input type="text" name="amount" placeholder="Enter amount here!" value={formdata.amount} onChange={handleChange} />
            <input type="text" name="message" placeholder="Enter your message here!" value={formdata.value} onChange={handleChange} />
            <button type="submit">☕ Pay now!</button>
          </form>
        </div>
      </div>
    </>
  
               

} 
