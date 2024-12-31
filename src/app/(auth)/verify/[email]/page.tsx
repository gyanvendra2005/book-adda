"use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'
import { Loader2, Router } from "lucide-react";
import { useParams,useRouter } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const [isSubmitting, setisSubmitting] = useState(false);
  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()

    const submit = async() => {

          console.log(params.email);
          const email = params.email;
          

      try {
        const response = await axios.post(`/api/verify`,{
            email:email,
            code: value
        })
        toast({
            title:"Success",
            description:response.data.message
        })
        router.replace('/signin')
    } catch (error) {
        console.log("Error in sign up of user",error);
          toast({
            title:"Otp Not verified",  
            variant:"destructive",
          })
    }
       console.log("OTP submitted")
    } 


  return (
    <div className="space-y-2">
     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 m-10  md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Welcome to BookAdda
      </h2>
      <p className="text-neutral-600  text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
        Verify your account
      </p>

      <div className="space-y-4">
        <InputOTP
          id="code"
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          className="space-x-2 flex justify-center"
        >
          <InputOTPGroup className="flex justify-between gap-2">
            <InputOTPSlot index={0} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={2} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={3} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={4} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
            <InputOTPSlot index={5} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300" />
          </InputOTPGroup>
        </InputOTP>
  
        <div className="text-center text-sm text-gray-600 mt-4">
            <>Enter your one-time password.</>
        </div>
      </div>
  
      <button
          className="bg-gradient-to-br mt-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={submit}  disabled={value.length < 6? true : false}
      >
        Submit
        <BottomGradient/>
      </button>
      <BottomGradient/>
    </div> 

    </div>
  )
}




const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-950 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
  
  
