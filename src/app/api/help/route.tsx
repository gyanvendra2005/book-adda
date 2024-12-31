import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { sendMessageEmail } from "@/sendMessageEmail/sendMessageEmail";

export async function POST(request:Request){
        await connectDB();

        try {
            const {firstName,email,Message} = await request.json();
            // console.log(firstName,email,Message);
            
              const response = await sendMessageEmail(firstName,email,Message)
            //  console.log(response);
             
             return Response.json(
                {
                    success:true,
                    message:"Message sent"
                },
                {
                    status:200
                }
            )
        } catch (error) {
            console.log(error);
            return Response.json({
                success: false,
                message:'Message Not Sent'
            })
            
        }

}