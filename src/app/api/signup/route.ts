import connectDB from "@/lib/dbConnect";
import {UserModel} from "@/models/User";
import { sendVerificationEmail } from "@/sendVerificationEmail/sendEmail";
// import bcrypt from "bcryptjs";
import bcrypt from 'bcryptjs';

export async function POST(request:Request) {
     await connectDB();
    try {
        const {userFirstName,userLastName,email,password, mobileNo,location} = await request.json();
        console.log(userFirstName);
        console.log(userLastName);
        console.log(email);
        console.log(password);
        console.log(mobileNo);
        
        const existingUser = await UserModel.findOne({
            email,mobileNo
        });
        if(existingUser){
            return Response.json(
                {
                success:false,
                message: "user already exists",
                },
                {
                    status:400
                }
        )
        }
        else{
            const verifyEmailCode = Math.floor(100000+Math.random()*900000).toString();
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate =new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
             
            const newUser = new UserModel({
                userFirstName,
                userLastName,
                email,
                password:hashedPassword,
                mobileNo,
                location,
                verifyEmailCode,
                verifyEmailCodeExpiry:expiryDate,
                isVerifiedEmail:false,
                bookSelling:[],
            })
            console.log(newUser);
            
            console.log("hi");
            await newUser.save();

            try {
                sendVerificationEmail(email,userFirstName,verifyEmailCode)
                return Response.json(
                    {
                        success:true,
                        message:"user created successfully and email is sent"
                    },
                    {
                        status:200
                    }
                )
            } catch (error) {
                return Response.json(
                    {
                        success:true,
                        message:"User creates successfully but email is not sent"
                    },
                    {
                        status:200
                    }
                )
            }
            
        }
    } catch (error) {
        console.log(error);
        
        return Response.json(
            {
             success:false,
             message:"User not created"
            },
            {
                status:404
            }
    )
    }
}

