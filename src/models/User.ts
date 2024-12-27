import mongoose, { Schema, Document } from 'mongoose';
import { string } from 'zod';


export interface Book extends Document{
    bookImages:string
    bookName:string;
    author:string;
    edition:string;
    price:string;
    condition:string;
    description:string;
    category:string;
    // subCategory:string;
    // otherCategory:string;
    location:string;
}

const BookSchema: Schema<Book> = new Schema({
    bookImages:[String],
    bookName:{
        type:String,
        required:true,
    },
    edition:{
        type:String,
        required:false,
    },
    author:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    // subCategory:{
    //     type:String,
    //     required:true
    // },
    // otherCategory:{
    //     type:String,
    //     required:false
    // },
    location:{
        type:String,
        required:true
    }
})

export interface User extends Document {
    userFirstName:string;
    userLastName:string;
    email:string;
    mobileNo:string;
    password:string;
    location:string;
    verifyEmailCode:string;
    verifyEmailCodeExpiry:Date;
    isVerifiedEmail: boolean;
    // verifySmsCode:string;
    // verifySmsCodeExpiry:Date;
    // isVerifiedSms: boolean;
    bookSelling:Book[]
}


const UserSchema:  Schema<User> = new Schema({
           userFirstName:{
            type:String,
            required:true,
            },
           userLastName:{
            type:String,
            requied:true,
           },
           email:{
            type:String,
            requied:true,
            unique:true
           },
           password:{
            type:String,
            requied:true,
            },
            mobileNo:{
                type:String,
                required:true
            },
            location:{
                type:String,
                required:true
            },
            verifyEmailCode:{
                type:String,
                required:true
            },
            verifyEmailCodeExpiry:{
                type:Date,
                required:true
            },
            isVerifiedEmail:{
                type:Boolean,
                required:true
            },
            bookSelling:[BookSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema))
const BookModel = (mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', BookSchema))
export {UserModel,BookModel};


// verifySmsCode:{
//     type:String,
//     required:false
// },
// verifySmsCodeExpiry:{
//     type:Date,
//     required:false
// },
// isVerifiedSms:{
//     type:Boolean,
//     required:false
// },

