// "use client";
// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import axios from "axios";
// import cities from "@/cities.json"
// import {useSession } from 'next-auth/react'

// export default function BookSellingPage() {
//   const [bookName, setBookName] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [condition, setCondition] = useState("");
//   const [city, setCity] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isCityFound, setCityFound] = useState(false);
//   const [message, setMessage] = useState('');
//   const [edition, setEdition] = useState('');
//   const [description, setDescription] = useState('');
//   // const [images, setImages] = useState<[]>([]);
//   const [file,setFile] = useState<File[]>();
//   const { toast } = useToast();
//   const router = useRouter();
//   let cityFound = false;
//   const{data:session} = useSession()
// //   console.log(cover1);
// const email = session?.user.email
// console.log(file);

// // const formData = new FormData();
// // console.log(images[0]);
// // console.log({...images});
// // let image=[];
// // const book  =images.map((image)=>{console.log(image);
// // })
// // console.log(book);
// // images.forEach((file) => {

  
// // });

// // // console.log(image);
// // console.log(images.forEach((file) => console.log(file)
// // ));
// // console.log({...images});


//   // Categories and conditions for books
//   const bookCategories = ["Education", "Fiction", "Non-Fiction", "Biography", "Self-Help", "Science", "Technology", "History"];
//   const bookConditions = ["New", "Used", "Like New", "Acceptable"];

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       toast({
//         title: "Terms and Conditions",
//         description: "You must agree to the terms and conditions before submitting.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       // Simulate submitting form data to backend
//       citySearch(e)
//       if (cityFound) {
//         const formData = new FormData();
//         formData.append("bookName", bookName);
//         formData.append("authorName", authorName || "");
//         formData.append("price", price);
//         formData.append("category", category);
//         formData.append("condition", condition);
//         formData.append("edition", edition || "");
//         formData.append("description", description || "");
//         formData.append("location", city);
//         formData.append("email", email || "");
    
//         // Append each file object to FormData
//         // files.map((file)=>{
//           formData.set("images", file); // Key name 'images' matches backend
//         // });
//       const response = await axios.post("/api/sellbook",formData
//       , {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     );
//       toast({
//         title: "Success",
//         description: response.data.message,
//       });
//       // router.push("/book-listing");  
//     }
//     setIsSubmitting(false);
//     } catch (error) {
//       console.log("Error:", error);
//       toast({
//         title: "Submission failed",
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };


 
//   // city found or not
//   const citySearch = (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true)

    
//     for (const City of cities.cities) {
//       if (city.trim().toLowerCase() === City.City.toLowerCase()) {
//         setCity(City.City);
//         setMessage('City found');
//         setCityFound(true);
//         cityFound = true;
//         break;
//       }
//     }

//     if (!cityFound) {
//       setMessage('City not found');
//       setCityFound(false);
//     }

//     setIsSubmitting(false);
//    }

//   return (
//     <div className="max-w-7xl mx-auto py-16 px-4">
//       {/* Header Section with Banner Image */}
//       <div className="text-center mb-12">
//         <img src="" alt="Books Banner" className="w-full h-64 object-cover rounded-md mb-6" />
//         <h1 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-200">Welcome to BookAdda</h1>
//         <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-4">A place to buy, sell, and exchange books with ease.</p>
//       </div>

//       {/* Book Selling Form */}
//       <div className="max-w-md w-full mx-auto rounded-lg p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-xl mt-12">
//         <h2 className="font-bold text-3xl text-center text-neutral-800 dark:text-neutral-200">Sell Your Book</h2>
//         <form className="my-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Book Name and Author */}
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//             <div className="flex flex-col space-y-2 w-full">
//               <Label htmlFor="bookname">Book Name*</Label>
//               <Input
//                 id="bookname"
//                 placeholder="Book Title"
//                 type="text"
//                 value={bookName}
//                 onChange={(e) => setBookName(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div className="flex flex-col space-y-2 w-full">
//               <Label htmlFor="authorname">Author(optional)</Label>
//               <Input
//                 id="authorname"
//                 placeholder="Author Name"
//                 type="text"
//                 value={authorName}
//                 onChange={(e) => setAuthorName(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col space-y-2 w-full">
//               <Label htmlFor="authorname">Edition(optional)</Label>
//               <Input
//                 id="authorname"
//                 placeholder="Author Name"
//                 type="text"
//                 value={edition}
//                 onChange={(e) => setEdition(e.target.value)}
//                 className="input-style"
//               />
//             </div>

//           {/* Price */}
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="price">Price (₹)*</Label>
//             <Input
//               id="price"
//               placeholder="₹250"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="input-style"
//             />
//           </div>

//           {/* Category */}
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="category">Category*</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
//             >
//               <option value="">Select a Category</option>
//               {bookCategories.map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
          
//           {/* {description} */}
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="description">Description(optional)</Label>
//             <Input
//               id="description"
//               placeholder="Description"
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="input-style"
//               maxLength={150}
//             />
//           </div>

//           {/* Condition */}
//           <div>
//             <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Select Book Condition*</h3>
//             <select
//               id="condition"
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
//             >
//               <option value="">Select Condition</option>
//               {bookConditions.map((condition, index) => (
//                 <option key={index} value={condition}>{condition}</option>
//               ))}
//             </select>
//           </div>

//           {/* City */}
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="city">City*</Label>
//             <Input
//               id="city"
//               placeholder="City Name"
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="input-style"
//             />
//              <p className={`${isCityFound === true ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
//           </div>

//           {/* Images */}
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="files">Images*</Label>
//             <Input
//   id="files"
//   type="file"
//   name="images"
//   multiple
//   accept="image/*" // Ensure only images are allowed
//   onChange={(e) => {
//     setFile(e.target.files)
//   }}
//   className="input-style"
// />
//           </div>
        


//           {/* Terms and Conditions Checkbox */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={termsAccepted}
//               onChange={() => setTermsAccepted(!termsAccepted)}
//               className="w-4 h-4 text-blue-600 rounded"
//             />
//             <label htmlFor="terms" className="text-sm text-neutral-600 dark:text-neutral-300">
//               I agree to the <a href="/terms-and-conditions" className="text-blue-600 underline">Terms and Conditions</a>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white w-full h-12 rounded-md transform transition-all duration-300 hover:scale-105"
//             disabled={!termsAccepted}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <Loader2 className="h-5 w-5 animate-spin mr-2" />
//                 <span>Submitting...</span>
//               </div>
//             ) : (
//               "Submit"
//             )}
//             <BottomGradient />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };



"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import cities from "@/cities.json";
import { useSession } from 'next-auth/react';

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
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user.email;

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
    try {
      citySearch(e);
      if (isCityFound) {
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

        // Append each file to FormData
        files.forEach((file) => {
          formData.append("images", file); // Key 'images' should match backend expectation
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
        // router.push("/book-listing"); // Uncomment to navigate after successful submission
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Submission failed",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // City search function
  const citySearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let cityFound = false;
    for (const City of cities.cities) {
      if (city.trim().toLowerCase() === City.City.toLowerCase()) {
        setCity(City.City);
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

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-200">Welcome to BookAdda</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-4">A place to buy, sell, and exchange books with ease.</p>
      </div>

      {/* Form */}
      <div className="max-w-md w-full mx-auto rounded-lg p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-xl mt-12">
        <h2 className="font-bold text-3xl text-center text-neutral-800 dark:text-neutral-200">Sell Your Book</h2>
        <form className="my-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Book Name and Author */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

            {/* book name */}
            <LabelInputContainer>
              <Label htmlFor="bookname">Book Name*</Label>
              <Input
                id="bookname"
                placeholder="Book Title"
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="input-style"
              />
            </LabelInputContainer>

            {/* author */}
            <LabelInputContainer>
              <Label htmlFor="authorname">Author(optional)</Label>
              <Input
                id="authorname"
                placeholder="Author Name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="input-style"
              />
             </LabelInputContainer>
          </div>


          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* estiton */}
          <LabelInputContainer>
           <Label htmlFor="authorname">Edition(optional)</Label>
             <Input
                id="authorname"
                placeholder="Author Name"
                type="text"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="input-style"
              />
            </LabelInputContainer>

          {/* Price */}
          <LabelInputContainer>
            <Label htmlFor="price">Price (₹)*</Label>
            <Input
              id="price"
              placeholder="₹250"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-style"
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
              className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            >
              <option value="">Select a Category</option>
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            </LabelInputContainer>

          {/* Description */}
           <LabelInputContainer>
            <Label htmlFor="description">Description(optional)</Label>
            <Input
              id="description"
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-style"
              maxLength={150}
            />
           </LabelInputContainer>

          {/* Condition */}
          <LabelInputContainer>
          <Label>Select Book Condition*</Label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            >
              <option value="">Select Condition</option>
              {bookConditions.map((condition, index) => (
                <option key={index} value={condition}>{condition}</option>
              ))}
            </select>
            </LabelInputContainer>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* City */}
          <LabelInputContainer>
            <Label htmlFor="city">City*</Label>
            <Input
              id="city"
              placeholder="City Name"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-style"
            />
            <p className={`${isCityFound ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
            </LabelInputContainer>

          {/* Images */}
          <LabelInputContainer>
            <Label htmlFor="files">Images*</Label>
            <Input
              id="files"
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="input-style"
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
              I agree to the <a href="/terms-and-conditions" className="text-blue-600 underline">Terms and Conditions</a>
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