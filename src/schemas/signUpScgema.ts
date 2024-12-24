import {z} from 'zod'
 
export  const signUpSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    mobile: z.string().length(10, "Mobile number must be 10 digits").regex(/^\d+$/, "Mobile number must contain only digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    location: z.string().min(2, "Location is required"),
})