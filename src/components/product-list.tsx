"use client";

import React, { useEffect,  useState } from "react";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Link from "next/link";
import  {FaLocationDot } from "react-icons/fa6";
 

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Product | boolean | null>(
      null
    );
  console.log(active);
  
  // const ref = useRef<React.RefObject<null>>(null);
  // const id = useId();
  const [category,setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 20, max: 10000 });

  const[location,setLocationFilter]=useState('')
  const[condition,setConditionFilter]=useState('')
  // const [city, setCity] = useState("");
  // const [isCityFound, setCityFound] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [message, setMessage] = useState('');
  console.log(location,condition,category);
  
  
  interface Product {
    _id: string;
    bookName: string;
    bookImages: string[];
    price: number;
    condition: string;
    location: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
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
        description: (error instanceof Error ? error.message : "An error occurred."),
        variant: "destructive",
      });
    }
  };
   useEffect(() => {
       fetchProducts()
   }, [])

   // City search function
  // const citySearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   let cityFound = false;
  //   for (const City of cities.cities) {
  //     if (city.trim().toLowerCase() === City.City.toLowerCase()) {
  //       setCity(City.City);
  //       setMessage('City found');
  //       setCityFound(true);
  //       cityFound = true;
  //       break;
  //     }
  //   }

  //   if (!cityFound) {
  //     setMessage('City not found');
  //     setCityFound(false);
  //   }

  //   setIsSubmitting(false);
  // };

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
            onChange={(e) => setPriceFilter((prev) => ({ ...prev, min: Number(e.target.value) }))}
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
        {/* {message} */}
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

      <Link href="view-book" target="_blank" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((card) => (
            <div
              key={`card-${card.bookName}-${card._id}`}
              onClick={() => setActive(card)}
              className="flex flex-col bg-white shadow-lg rounded-xl cursor-pointer p-4 transition-transform transform hover:scale-105 hover:shadow-xl dark:bg-neutral-800"
              aria-label={`View details of ${card.bookName}`}
            >
              {/* Book Image */}
              <div
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
              </div>
  
              {/* Book Details */}
              <div className="mt-4">
                <h3
                  className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate"
                >
                  {card.bookName}
                </h3>
                <p
                  // layoutId={`description-${card.price}-${card._id}`}
                  className="text-gray-600 dark:text-gray-400 mt-1"
                >
                  {card.price && card.price > 0
                    ? `₹${Number(card.price).toLocaleString()}`
                    : "Price not available"}
                </p>
                <p
                  // layoutId={`description-${card.condition}-${card._id}`}
                  className="text-gray-600 flex dark:text-gray-400 mt-1"
                >
                  <span className="font-bold">Condition: </span> {card.condition}
                </p>
                <p
                  // layoutId={`description-${card.location}-${card._id}`}
                  className="text-gray-600 flex dark:text-gray-400 mt-1"
                >
                  <FaLocationDot className="m-1"/>{card.location.toUpperCase()}
                </p>

              </div>
  
              {/* Add to Cart Button */}
              <Link href="/view-book" target="_blank">
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition"
              >
                View Details
              </button>
              </Link>
            </div>
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
