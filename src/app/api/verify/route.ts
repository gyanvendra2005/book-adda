import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request:Request){
    await connectDB();

    try {
        const {email,code} = await request.json()
        // const decodeduser = decodeURIComponent(email);
        const user = await UserModel.findOne(email)
        console.log(user?.verifyEmailCode);
        // const isCodeNotExpired = new Date(user?.verifyEmailCodeExpiry) > new Date
        
        if(user){
            if (user?.verifyEmailCode==code ){
                user.isVerifiedEmail= true;
                await user.save()
                return Response.json(
                    {
                    success:true,
                    message: "Email verified",
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