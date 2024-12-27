import  "next-auth";
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User{
        _id?:string;
        isVerifiedEmail?:boolean;
        userFirstName?:string;
        userLastName?:string;
        email?:string;
    }
    interface Session{
        user:{
             id?:string;
             isVerifiedEmail?:boolean;
             userFirstName?:string;
             userLastName?:string;
             email?:string;
        }  & DefaultSession;['user']

    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?:string;
        isVerifiedEmail?:boolean;
        userFirstName?:string;
        userLastName?:string;
        email?:string;
    }
}