"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./ui/product-card";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea, ScrollBar } from "./ui/scrollarea"
import cities from "@/cities.json";
import Link from "next/link";
import  {FaLocationDot } from "react-icons/fa6";
 

export function ExpandableCardDemo() {
  const [active, setActive] = useState<[number] | boolean | null>(
    null
  );
  const ref = useRef<React.RefObject<null>>(null);
  const id = useId();
  const [category,setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 20, max: 10000 });

  const[location,setLocationFilter]=useState('')
  const[condition,setConditionFilter]=useState('')
  const [city, setCity] = useState("");
  const [isCityFound, setCityFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  console.log(location,condition,category,message);
  
  
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/getbooks?category=${category}&location=${location.toLowerCase()}&condition=${condition}`);
      console.log(response.data.books);
      setProducts(response.data.books);

      toast({
        title: "Success",
        description: "Books fetched successfully!",
      });
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed to fetch books",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };
   useEffect(() => {
       fetchProducts()
   }, [])

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

  const applyFilters = ()=>{
    fetchProducts()
  }
  

  return (
    <div className="flex mt-20">
    {/* Sidebar Section (Filter Section) */}
    <div className="hidden lg:block lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow h-full fixed left-0 top-20">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
  
      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>
  
      {/* Price Range Filter */}
      <div className="mb-4">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
          Price Range upto ({priceFilter.min})
        </label>
        <div className="flex space-x-2 items-center">
          <input
            type="range"
            id="priceRange"
            min="20"
            max="10000"
            step="10"
            value={priceFilter.min}
            className="flex-grow"
            onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: e.target.value }))}
          />
        </div>
      </div>
  
      {/* Location Filter */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        {message}
      </div>
  
      {/* Condition Filter */}
      <div className="mb-4">
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
        <select
          id="condition"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setConditionFilter(e.target.value)}
        >
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="Used">Used</option>
          <option value="refurbished">Refurbished</option>
        </select>
      </div>
  
      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
      >
        Apply Filters
      </button>
    </div>
  
    {/* Main Content Section (Books Rendering, Search Bar, and Sort By) */}
    <div className="flex-1 ml-0 lg:ml-80 w-full">
      <div className="mb-6 p-4">
        <input
          type="search"
          placeholder="Search"
          className="w-1/3 px-4 py-2 rounded-lg border"
        />
      </div>
  
      {/* Modal Animation on Active Item */}
      {/* <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
  
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.bookName}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
              aria-label="Close details"
            >
              <CloseIcon />
            </motion.button>
  
            <motion.div
              layoutId={`card-${active.bookName}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* Horizontal Scrollable Image Carousel */}
              {/* <motion.div layoutId={`image-${active.bookImages[0]}-${id}`}>
                <ScrollArea className="w-180 whitespace-nowrap rounded-md border">
                  <div className="flex w-max space-x-4 p-4">
                    {active.bookImages.map((img, index) => (
                      <div key={index} className="overflow-hidden rounded-md">
                        <img
                          src={img}
                          alt={`Book image ${index}`}
                          style={{
                            width: "465px", // Consistent width
                            height: "300px", // Height for proper scaling
                            objectFit: "cover", // Ensures the image covers the area
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </motion.div>
  
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.bookName}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.bookName}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description || "No description available"}
                    </motion.p>
                  </div>
  
                  <motion.a
                    layoutId={`button-${active.bookName}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    aria-label={`Go to ${active.bookName}`}
                  >
                    {active.ctaText || "View Details"}
                  </motion.a>
                </div>
  
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */
}
      <Link href="view-book" target="_blank" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((card) => (
            <motion.div
              key={`card-${card.bookName}-${card._id}`}
              layoutId={`card-${card.bookName}-${card._id}`}
              onClick={() => setActive(card)}
              className="flex flex-col bg-white shadow-lg rounded-xl cursor-pointer p-4 transition-transform transform hover:scale-105 hover:shadow-xl dark:bg-neutral-800"
              aria-label={`View details of ${card.bookName}`}
            >
              {/* Book Image */}
              <motion.div
                layoutId={`image-${card.bookName}-${card._id}`}
                className="w-full h-48 rounded-md overflow-hidden bg-gray-200"
              >
                {card.bookImages?.length > 0 ? (
                  <img
                    src={card.bookImages[0]}
                    alt={card.bookName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500">
                    No Image Available
                  </div>
                )}
              </motion.div>
  
              {/* Book Details */}
              <div className="mt-4">
                <motion.h3
                  layoutId={`title-${card.bookName}-${card._id}`}
                  className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate"
                >
                  {card.bookName}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.price}-${card._id}`}
                  className="text-gray-600 dark:text-gray-400 mt-1"
                >
                  {card.price && card.price > 0
                    ? `₹${Number(card.price).toLocaleString()}`
                    : "Price not available"}
                </motion.p>
                <motion.p
                  layoutId={`description-${card.condition}-${card._id}`}
                  className="text-gray-600 flex dark:text-gray-400 mt-1"
                >
                  <span className="font-bold">Condition: </span> {card.condition}
                </motion.p>
                <motion.p
                  layoutId={`description-${card.location}-${card._id}`}
                  className="text-gray-600 flex dark:text-gray-400 mt-1"
                >
                  <FaLocationDot className="m-1"/>{card.location.toUpperCase()}
                </motion.p>

              </div>
  
              {/* Add to Cart Button */}
              <Link href="/view-book" target="_blank">
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition"
              >
                View Details
              </button>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-neutral-600 dark:text-neutral-400 col-span-full">
            No books found
          </div>
        )}
      </Link>
    </div>
  </div>
  
  );
}

// export const CloseIcon = () => {
//   return (
//     <motion.svg
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//         transition: {
//           duration: 0.05,
//         },
//       }}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-4 w-4 text-black"
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M18 6l-12 12" />
//       <path d="M6 6l12 12" />
//     </motion.svg>
//   );
// };
