// "use client";
// import React, { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useToast } from '@/hooks/use-toast'
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { signIn } from 'next-auth/react';


// export default function SignupForm() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isSubmitting, setisSubmitting] = useState(false);
//     const {toast} = useToast()
//     const router = useRouter()

    

//     const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

//         setisSubmitting(true)
//         const response =  await signIn('credentials',{
//             redirect:false,
//             email: email,
//             password: password
//         })
//         console.log(response);
        
//         if(response?.error){
//             toast({
//                 title:"Login Failed",
//                 description:"Invalid Credentials"
//             })
//         }
//         else{
//             toast({
//                 title:"Login Successfull"
//             })
//         }
//         if(response?.url){
//             router.replace('/');
//         }
//         setisSubmitting(false)



//       console.log("submitting");
      
//     }


//     return (
//     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 m-10  md:p-8 shadow-input bg-white dark:bg-black">
//     <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
//       Welcome to BookAdda
//     </h2>
//     <p className="text-neutral-600  text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
//       SignIn to Buy and Sell Books
//     </p>

//     <form className="my-8" onSubmit={handleSubmit}>

//       <LabelInputContainer className="mb-4">
//         <Label htmlFor="email">Email Address</Label>
//         <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
//       </LabelInputContainer>

//       <LabelInputContainer className="mb-4">
//         <Label htmlFor="password">Password</Label>
//         <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
//       </LabelInputContainer>

//       <button
//         className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//         type="submit" 
//       >
//         {isSubmitting ? (
//          <div className="flex items-center justify-center">
//             <Loader2 className="h-4 w-4 animate-spin mr-2" />
//              <span>Please wait...</span>
//               </div>
//           ) : (
//                'SignIn'
//               )}

//         <BottomGradient />
//       </button>

//     </form>
//   </div> 
  
// );
// }

// const BottomGradient = () => {
// return (
//   <>
//     <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//     <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//   </>
// );
// };

// const LabelInputContainer = ({
// children,
// className,
// }: {
// children: React.ReactNode;
// className?: string;
// }) => {
// return (
//   <div className={cn("flex flex-col space-y-2 w-full", className)}>
//     {children}
//   </div>
// );
// };

"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!email || !password) {
            toast({
                title: "Error",
                description: "Both email and password are required",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        const response = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });

        console.log(response);
        

        if (response?.error) {
            toast({
                title: "Login Failed",
                description: "Invalid Credentials",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
        }

        if (response?.url) {
            router.replace('/home');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 m-10 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
                Welcome to BookAdda
            </h2>
            <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
                SignIn to Buy and Sell Books
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Please wait...</span>
                        </div>
                    ) : (
                        'Sign In'
                    )}
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};



// 'use client'

// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/hooks/use-toast';
// // import { signInSchema } from '@/schemas/signInSchema';
// import { zodResolver } from '@hookform/resolvers/zod';
// // import axios from 'axios';
// import { Loader2 } from 'lucide-react';
// import { signIn } from 'next-auth/react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

// const SigninPage = () => {
//     const [isSubmitting, setisSubmitting] = useState(false)
//     const { toast } = useToast()
//     const router = useRouter()

//     // zod implementation
//     const form = useForm()

//     const onSubmit = async (data:any) => {
//          setisSubmitting(true)
//         const response =  await signIn('credentials',{
//             redirect:false,
//             identifier: data.identifier,
//             password: data.password
//         })
//         console.log(response);
        
//         if(response?.error){
//             toast({
//                 title:"Login Failed",
//                 description:"Invalid Credentials"
//             })
//         }
//         else{
//             toast({
//                 title:"Login Successfull"
//             })
//         }
//         if(response?.url){
//             router.replace('/');
//         }
//         setisSubmitting(false)
//     }


//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//     <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg my-10">
//       <div className="text-center">
//         <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight lg:text-5xl mb-4">
//           Join Mystery Message
//         </h1>
//         <p className="text-gray-500 mb-6">
//           Sign In to start your anonymous adventure
//         </p>
//       </div>
  
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="identifier"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel htmlFor="username" className="text-sm font-medium text-gray-700">
//                   Email
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     id="username"
//                     placeholder="Enter username"
//                     {...field}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
    
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel htmlFor="password" className="text-sm font-medium text-gray-700">
//                   Password
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Enter password"
//                     {...field}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
  
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
//           >
//             { isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait...
//               </>
//             ) : (
//               'Sign In'
//             )}
//           </Button>
//         </form>
  
//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Not have an Account?{' '}
//             <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </Form>
//     </div>
//   </div>
  
//   )
// }


// export default  SigninPage



