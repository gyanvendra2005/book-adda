import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendContsactEmail } from "@/sendContactDetails/sendContact";
import connectDB from "@/lib/dbConnect";
import { BookModel, UserModel } from "@/models/User";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
    await connectDB();

  const { orderId, razorpayPaymentId, razorpaySignature,bookId } =
    await request.json();
  console.log(bookId);
  
  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // Probably some database calls here to update order or add premium status to user
  else{
     const res = await BookModel.findOne({_id:bookId})
     console.log(res);
     
     const userId = res?.userId
     console.log(userId);
     
     const user = await UserModel.findOne({_id:userId})
     if (user) {
        console.log("hi u ser milla");
        
       sendContsactEmail(user.userFirstName, user.email, user.mobileNo);
       return NextResponse.json(
        { message: "payment verified successfully and contact details send", isOk: true },
        { status: 200 }
      );
     } else {
       return NextResponse.json(
         { message: "User not found", isOk: false },
         { status: 404 }
       );
     }
  }
//   return NextResponse.json(
//     { message: "payment verified successfully", isOk: true },
//     { status: 200 }
//   );
}