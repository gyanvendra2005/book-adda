"use client";

import axios from "axios";
import Script from "next/script";
import { useState } from "react";




export default function Payment() {
   const [amount, setAmount] = useState<number>(0);
   const createPayment = async () => {
        const response =await axios.post('/api/createPayment', { amount:amount*100 });
        const { data } = response;
        const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Book Swap",
            description: "Payment",
            image: "/logo.png",
            order_id: data.id,
            handler: () => {
                alert("Payment Successful");
            },
            prefill: {
                name: "Book Adda",
                // email: 
        }
     }
        const rzp1 = new (window as any).Razorpay(paymentData);
        rzp1.open();
   }


    return (
        <div>
            <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    )
}