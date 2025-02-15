import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/User";

export async function PUT(request: Request) {
    await connectDB()
    try {
        const {userFirstName, userLastName} = await request.json()
        const url = new URL(request.url); // Get the full URL
            const _id = url.searchParams.get('_id');
            // console.log("hi 1");
            // console.log(_id)
        
        const user = await UserModel.findOne({_id})
        // console.log(user);
        
        if(!user){
            // console.log(user);
            return Response.json({
                success: false,
                message:'No user found'
            },{status:404})       
        }
        else{
            user.userFirstName = userFirstName;
            user.userLastName = userLastName;
            await user.save()
            return Response.json({
                success: true,
                message:'User updated successfully',
                data:user
            },{status:200})
        }

    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message:'Server error'
        },{status:500})
        
    }
}