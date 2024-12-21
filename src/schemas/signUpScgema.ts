import {z} from 'zod'
 
export  const signUpSchema = z.object({
    userFirstName: z.string({message:"Enter First Name"}),
    userLastName: z.string({message:"Enter Last Name"}),
    email: z.string().email({message:"Invaild email address"}),
    password:z.string().min(8,{message:"Password should have atleast 8 character"})
    
})