"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import cities from "@/cities.json"
import Link from "next/link";

export default function SignupForm() {


  const [location, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isCityFound, setCityFound] = useState(false);
  const {toast} = useToast()
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter()
  let cityFound = false;

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  
    // setCity(e.target.location.value);
    e.preventDefault();
    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setisSubmitting(true)
    citySearch(e);
  
    try {
          if(cityFound ){
            const response = await axios.post('/api/signup',{
              userFirstName:firstName,
              userLastName:lastName,
              email,
              mobileNo:mobile,
              password,
              location
          })
          toast({
            title:'success',
            description:response.data.message
          })
          if(response.data.success){
            router.replace(`/verify/${email}`)
          //   router.replace(`/signin`)
          }
          }
        setisSubmitting(false)
      } catch (error) {
        console.log("Error in sign up of user",error);
        toast({
          title:"Signup failed",     
          variant:"destructive",
        })
        setisSubmitting(false)
      }
    console.log("Form submitted");
  };




  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCity(event.target.value);
  };

  // city found or not
  const citySearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitting(true)

    
    for (const city of cities.cities) {
      if (location.trim().toLowerCase() === city.City.toLowerCase()) {
        setCity(city.City);
        setMessage('City found');
        setCityFound(true);
        cityFound = true;
        break;
      }
    }

    if (!cityFound) {
      setMessage('City not found');
      setCityFound(false);
    }

    setisSubmitting(false);
   }


    // const name = 'agra';  
    // const url = 'https://api.api-ninjas.com/v1/city?name=' + location.trim();
  
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'X-Api-Key': 'wQU9X7ekDYMX3yrBRq65PA==TxkTLEcUkZLVDmpd',
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     console.log(response);
      
  //     return response.json();
  //   })
  //   .then(result => {
  //   //   console.log(result[0].name);  
  //        if(location.trim().length === result[0].name.length){
  //           setCity(result[0].name)
  //           console.log(location);
  //           setMessage('City found');
  //           setCityFound(true);
  //           setisSubmitting(false)
  //        }
  //       else{
  //           setMessage('City not found');
  //           console.log('City not found');
  //           setisSubmitting(false)
  //       } 
  //   })
  //   .catch(error => {
  //     console.error('error', error); 
  //     setMessage('City not found');
  //     setisSubmitting(false)
  //   });
  

 
return (
    
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 m-10  md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Welcome to BookAdda
      </h2>
      <p className="text-neutral-600  text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to Buy and Sell Books
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" >First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Mobile No.</Label>
          <Input id="password" placeholder="80******89" type="tel" maxLength={10} pattern="\d{10}" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Location</Label>
          <Input id="password" placeholder="Agra" type="search" value={location}
           onChange={handleInputChange} />
            <p className={`${isCityFound === true ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
        </LabelInputContainer>
 

        {/* terms and conditions */}

        <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="terms" className="text-sm text-neutral-600 dark:text-neutral-300">
              I agree to the <Link href="/terms-conditions" className="text-blue-600 underline">Terms and Conditions</Link>
            </label>
          </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" 
        >
          {isSubmitting ? (
           <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
               <span>Please wait...</span>
                </div>
            ) : (
                 'Sign Up'
                )}

          <BottomGradient />
        </button>

        {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
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

