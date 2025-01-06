"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import cities from "@/cities.json";
import { useSession } from 'next-auth/react';
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function BookSellingPage() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCityFound, setCityFound] = useState(false);
  const [message, setMessage] = useState('');
  const [edition, setEdition] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]); // Handle multiple files here
  const { toast } = useToast();
  const { data: session } = useSession();
  const email = session?.user.email;
  const [words, setWords] = useState<number>(0);
  const userId = session?.user.id;


  // Categories and conditions for books
  const bookCategories = ["Education", "Fiction", "Non-Fiction", "Biography", "Self-Help", "Science", "Technology", "History"];
  const bookConditions = ["New", "Used", "Like New", "Acceptable"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    // First, run the city search to make sure the city is valid
    const cityValidationResult =  citySearch();
    
    if (!cityValidationResult.isCityFound) {
      setIsSubmitting(false);
      return; // Stop submission if city is not found
    }
  
    try {
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("authorName", authorName || "");
      formData.append("price", price);
      formData.append("category", category);
      formData.append("condition", condition);
      formData.append("edition", edition || "");
      formData.append("description", description || "");
      formData.append("location", city);
      formData.append("email", email || "");
      formData.append("userId", userId || "");
  
      // Append each file to FormData
      files.forEach((file) => {
        formData.append("images", file); 
      });
  
      const response = await axios.post("/api/sellbook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast({
        title: "Success",
        description: response.data.message,
      });
  
      // Optionally redirect after success
      // router.push("/book-listing");
  
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Submission failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // City search function
  const citySearch = (): { isCityFound: boolean, message: string } => {
    let cityFound = false;
    let message = '';
    
    // Loop through the list of cities to find a match
    for (const City of cities.cities) {
      if (city.trim().toLowerCase() === City.City.toLowerCase()) {
        cityFound = true;
        message = 'City found';
        setCity(city); // Set the city if found
        break;
      }
    }
  
    if (!cityFound) {
      message = 'City not found';
      setCityFound(false);
    } else {
      setCityFound(true);
    }
  
    setMessage(message); // Update the message
  
    return { isCityFound: cityFound, message };
  };
  

  return (
    <>
   <div className="items-center mt-10 mx-4">
  <button
    className="text-3xl text-orange-500 hover:text-orange-700 dark:text-white flex items-center ml-8 m-2"
    onClick={() => history.back()}
  >
    <IoMdArrowRoundBack />
  </button>
  <h1 className="ml-8 font-bold text-xl text-gray-800 dark:text-white">
    SELL-BOOKS
  </h1>
</div>

<div className="flex flex-col md:flex-row flex-wrap w-full md:w-3/4 h-auto justify-center border shadow-lg mx-auto mt-10 lg:mt-20 rounded-xl p-4">

  {/* Information Section */}
  <div className="md:w-2/5 w-full md:h-auto h-1/3 mt-8 md:mt-24 bg-gradient-to-br from-orange-500 to-red-800 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md font-medium shadow-lg p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Sell?</h2>
    <p className="text-sm md:text-base mb-4">
      Provide the book details. Share a good description and pictures to make it appealing to buyers.
    </p>
    <h3 className="text-xl md:text-2xl font-semibold mb-4">Info About Condition</h3>
    <ul className="list-disc ml-6 space-y-2">
      <li><strong>Like New:</strong> The book looks almost brand new with minimal signs of wear.</li>
      <li><strong>Good:</strong> Great condition with minor signs of use (e.g., slight page yellowing).</li>
      <li><strong>Acceptable:</strong> Noticeable wear but readable (e.g., dog-eared pages).</li>
    </ul>
  </div>

  {/* Form Section */}
  <div className="w-full lg:w-1/2 bg-white dark:bg-black rounded-md p-6 md:p-8 m-4">
    <form className="my-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Book Name and Author */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="bookname">Book Name*</Label>
          <Input
            id="bookname"
            placeholder="Book Title"
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="bg-gray-200 p-2 rounded-md"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="authorname">Author (optional)</Label>
          <Input
            id="authorname"
            placeholder="Author Name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="bg-gray-200 p-2 rounded-md"
          />
        </LabelInputContainer>
      </div>

      {/* Edition and Price */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="edition">Edition (optional)</Label>
          <Input
            id="edition"
            placeholder="Edition"
            type="text"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="bg-gray-200 p-2 rounded-md"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="price">Price (₹)*</Label>
          <Input
            id="price"
            placeholder="₹250"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-200 p-2 rounded-md"
          />
        </LabelInputContainer>
      </div>

      {/* Category */}
      <LabelInputContainer>
        <Label htmlFor="category">Category*</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 bg-gray-200 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">Select a Category</option>
          {bookCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </LabelInputContainer>

      {/* Description */}
      <LabelInputContainer>
        <Label htmlFor="description">Description (optional)</Label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setWords(e.target.value.length) }}
          className="bg-gray-200 rounded-md p-2 h-40 w-full"
          maxLength={250}
        />
        <p className="text-right text-sm mt-2">{words}/250</p>
      </LabelInputContainer>

      {/* Condition */}
      <LabelInputContainer>
        <Label>Select Book Condition*</Label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus:ring-2 bg-gray-200 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">Select Condition</option>
          {bookConditions.map((condition, index) => (
            <option key={index} value={condition}>{condition}</option>
          ))}
        </select>
      </LabelInputContainer>

      {/* City */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="city">City*</Label>
          <Input
            id="city"
            placeholder="City Name"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value.toLowerCase())}
            className="bg-gray-200 p-2 rounded-md"
          />
          <p className={`${isCityFound ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="files">Images*</Label>
          <Input
            id="files"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="bg-gray-200 p-2 rounded-md"
          />
        </LabelInputContainer>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center space-x-2">
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

      {/* Submit Button */}
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
          'Submit'
        )}
        <BottomGradient />
      </button>
    </form>
  </div>
</div>

    </>
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