import { NextAuthOptions, User, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/User";


export const authOptions : NextAuthOptions = {
    // console.log("Hello");
    
    providers:[
        CredentialsProvider({
            name: "Credentials",
            id:"credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {
                await connectDB()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.email},
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    if(!user.isVerifiedEmail){
                        throw new Error('Email is not verified, Please verify it')
                    }
                    const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('Password is incorrect')
                    }

                } catch (error:any) {
                    throw new error
                }
              }
        })
    ],
    callbacks:{
                 
    
          
           async jwt({ token, user,trigger,session  }) {
            if(user){
                token._id = user._id?.toString();
                token.isVerifiedEmail = user.isVerifiedEmail;
                token.userFirstName =  user.userFirstName;
                token.userLastName = user.userLastName;
                token.email = user.email;
                token.location = user.location;
                token.avatar = user.avatar;
                token.mobileNo = user.mobileNo;
            }
            if(trigger === 'update'){
                return { ...token,  ...session?.user }
            }
            return token
          },
          async session({ session, token }) {
            if(token){
                session.user.id = token._id?.toString();
                session.user.isVerifiedEmail = token.isVerifiedEmail;
                session.user.userFirstName =  token.userFirstName;
                session.user.email = token.email;
                session.user.location = token.location;
                session.user.userLastName = token.userLastName;
                session.user.avatar = token.avatar;
                session.user.mobileNo = token.mobileNo;
            }
            return session
          }
    },
    pages:{
        signIn: '/signin'

    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "gyani2004"
}