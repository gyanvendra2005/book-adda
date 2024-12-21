import {z} from 'zod'
 
export  const signUpSchema = z.object({
    email: z.string().email({message:"Invaild email address"}),
    password:z.string().min(8,{message:"Password should have atleast 8 character"}) 
})