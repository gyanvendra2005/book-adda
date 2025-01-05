import connectDB from "@/lib/dbConnect";
import {UserModel} from "@/models/User";
import bcrypt from 'bcryptjs';

export async function PUT(request:Request){
    await connectDB();

    try {
        const {email,code,password} = await request.json()
        const decodedemail = decodeURIComponent(email);
        const user = await UserModel.findOne({email:decodedemail});
        console.log(user?.verifyEmailCode);
        
        if(user){
            if (user?.verifyEmailCode==code ){
                const hashedPassword = await bcrypt.hash(password, 10)
                user.isVerifiedEmail= true;
                user.password = hashedPassword;
                await user.save()
                return Response.json(
                    {
                    success:true,
                    message: "Password updated successfully",
                    },
                    {
                        status:200
                    }
                )
            }
            else{
                return Response.json(
                    {
                    success:false,
                    message: "Invalid otp",
                    },
                    {
                        status:400
                    }
                )
            }
        }
        else{
            return Response.json(
                {
                success:false,
                message: "User not found",
                },
                {
                    status:400
                }
            )
        }  
    } catch (error) {
        console.log(error);
        
        return Response.json(
            {
            success:false,
            message: "Server Error",
            },
            {
                status:400
            }
        )
    }

}