"use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from "lucide-react";
import { MdEmail} from "react-icons/md";
import {FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function HelpPage () {

    const [words, setWords] = useState<number>(0);
    const [Message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isSubmitting, setisSubmitting] = useState(false);
    const {toast} = useToast()


    const SendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();   
        setisSubmitting(true);
        try {      
          const response = await axios.post("/api/help",{
            firstName,
            email,
            Message,
          });
      
          toast({
            title: "Success",
            description: response.data.message,
          });
      
        } catch (error) {
          console.error("Error:", error);
          toast({
            title: "Submission failed",
            variant: "destructive",
          });
        } finally {
          setisSubmitting(false);
        }
      };




  return (
    <>
          <div>
{/* Back Button and Page Header */}
<div className="items-center mt-10 mx-4">
  <button
    className="text-3xl text-orange-500 hover:text-orange-700 dark:text-white flex items-center ml-8  m-2"
    onClick={() => history.back()}
  >
    <IoMdArrowRoundBack className=""/>
  </button>
  <h1 className="ml-8 font-bold text-xl text-gray-800 dark:text-white">
    HELP-DESK
  </h1>
</div>

{/* Main Content */}
<div className="flex flex-col lg:flex-row flex-wrap w-full lg:w-3/4 h-auto justify-center border shadow-lg mx-auto mt-10 lg:mt-20 rounded-xl">
  {/* Left Section */}
  <div className="w-full lg:w-2/5 h-auto bg-gradient-to-br from-orange-500 to-red-800 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md font-medium shadow-lg p-10 m-4">
    <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
    <p className="text-lg mb-8">
    We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hi, we&apos;re here for you.

    </p>
    <div className="flex items-center text-lg mb-8">
      <MdEmail className="mr-3" />
      <span>gyanvendras2004@gmail.com</span>
    </div>
    <div className="flex items-center text-lg mb-8">
      <Link
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:text-pink-400"
      >
        <FaInstagram className="mr-3" aria-label="Instagram" />
        <span>gyanvendra_2004</span>
      </Link>
    </div>
  </div>

  {/* Right Section (Form) */}
  <div className="w-full lg:w-1/2 bg-white dark:bg-black rounded-md p-8 m-4">
    <form className="space-y-6" onSubmit={SendEmail}>
      {/* First Name and Last Name */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="firstname" className="text-lg">First Name</Label>
          <Input
            id="firstname"
            type="text"
            placeholder="Tyler"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="bg-gray-200"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname" className="text-lg">Last Name</Label>
          <Input
            id="lastname"
            type="text"
            placeholder="Durden"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-200"
          />
        </LabelInputContainer>
      </div>

      {/* Email Address */}
      <LabelInputContainer>
        <Label htmlFor="email" className="text-lg">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="projectmayhem@fc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-200"
        />
      </LabelInputContainer>

      {/* Mobile Number */}
      <LabelInputContainer>
        <Label htmlFor="mobile" className="text-lg">Mobile No.</Label>
        <Input
          id="mobile"
          type="tel"
          maxLength={10}
          placeholder="80******89"
          pattern="\d{10}"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="bg-gray-200"
        />
      </LabelInputContainer>

      {/* Message */}
      <LabelInputContainer>
        <Label htmlFor="message" className="text-lg">Message</Label>
        <textarea
          id="message"
          placeholder="Your message..."
          value={Message}
          onChange={(e) => { setMessage(e.target.value); setWords(e.target.value.length); }}
          maxLength={200}
          required
          className="bg-gray-200 rounded-md p-2 h-40 w-full"
        />
        <p className="text-right text-sm mt-2">{words}/200</p>
      </LabelInputContainer>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-br from-gray-950 to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md h-10 font-medium shadow-lg flex items-center justify-center hover:opacity-90 transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2 text-white" />
            <span>Please wait...</span>
          </div>
        ) : (
          'SEND MESSAGE'
        )}
        <BottomGradient/>
      </button>
    </form>
  </div>
</div>
</div> 
  </>
  )
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

