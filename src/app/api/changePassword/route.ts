import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { sendNewPasswordEmail } from "@/sendNewPasswordEmail/sendEmail";


export async function PUT(request: Request) {
     await connectDB()
    try {
        const {email,userFirstName} = await request.json()
        const url = new URL(request.url); // Get the full URL
            const _id = url.searchParams.get('_id');
        
        const user = await UserModel.findOne({_id})
        if(!user){
            return Response.json({
                success: false,
                message:'No user found'
            },{status:404})
        }
        else{
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
              try {
                sendNewPasswordEmail(email, userFirstName, verifyCode);
                user.verifyEmailCode = verifyCode;
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);
                user.verifyEmailCodeExpiry = expiryDate;
                await user.save();
                return Response.json({
                    success: true,
                    message: "Email sent successfully",
                });
              }
              catch (error) {
                console.log(error);
                return Response.json({
                    success: false,
                    message: "Server error",
                },{status:500})
              }
        }

    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message:'Server error'
        },{status:500})
        
    }
}