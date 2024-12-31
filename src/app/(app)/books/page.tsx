"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import  {FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
 

export default function ExpandableCardDemo() {
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
  const router = useRouter()

 

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/getbooks?category=${category}&location=${location.toLowerCase()}&condition=${condition}`);
      console.log(response.data.books);
      setProducts(response.data.books);

      toast({
        title: "Success",
        description: "Books fetched successfully!",
      });
    } catch (error:any) {
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

  const applyFilters = ()=>{
    fetchProducts()
  }
  

  return (
    <div>
    {/* Main Content */}
    <div className="flex mt-20">
      {/* Sidebar Section (Filter Section) */}
      <div className="hidden lg:block fixed lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow h-full left-0 top-20">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
  
        {/* Category Filter */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
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
            Price Range upto ({priceFilter.min || "0"})
          </label>
          <div className="flex space-x-2 items-center">
            <input
              type="range"
              id="priceRange"
              min="20"
              max="10000"
              step="10"
              value={priceFilter.min || 20}
              className="flex-grow"
              onChange={(e) =>
                setPriceFilter((prev) => ({ ...prev, min: parseInt(e.target.value, 10) }))
              }
            />
          </div>
        </div>
  
        {/* Location Filter */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
  
        {/* Condition Filter */}
        <div className="mb-4">
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
            Condition
          </label>
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
  
      {/* Main Content Section */}
      <div className="flex-1 ml-0 lg:ml-80 w-full">
        <div className="mb-6 p-4">
          <input
            type="search"
            placeholder="Search"
            className="w-1/3 px-4 py-2 rounded-lg border"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
              
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((card) => (
              <motion.div
                key={`card-${card.bookName || "unknown"}-${card._id || "unknown"}`}
                layoutId={`card-${card.bookName || "unknown"}-${card._id || "unknown"}`}
                onClick={() => setActive(card)}
                className="flex flex-col bg-white shadow-lg rounded-xl cursor-pointer p-4 transition-transform transform hover:shadow-gray-400 dark:bg-neutral-800"
                aria-label={`View details of ${card.bookName || "this book"}`}
              >
                {/* Book Image */}
                <motion.div
                  layoutId={`image-${card.bookName || "unknown"}-${card._id || "unknown"}`}
                  className="w-full h-48 rounded-md overflow-hidden bg-gray-200"
                >
                  {card.bookImages?.length > 0 ? (
                    <img
                      src={card.bookImages[0]}
                      alt={card.bookName || "Book cover"}
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
                    layoutId={`title-${card.bookName || "unknown"}-${card._id || "unknown"}`}
                    className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 truncate"
                  >
                    {card.bookName || "Unknown Book"}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.price || 0}-${card._id || "unknown"}`}
                    className="text-gray-600 dark:text-gray-400 mt-1"
                  >
                    {card.price && card.price > 0
                      ? `₹${Number(card.price).toLocaleString()}`
                      : "Price not available"}
                  </motion.p>
                  <motion.p
                    layoutId={`description-${card.condition || "unknown"}-${card._id || "unknown"}`}
                    className="text-gray-600 flex dark:text-gray-400 mt-1"
                  >
                    <span className="font-bold">Condition: </span> {card.condition || "Not specified"}
                  </motion.p>
                  <motion.p
                    layoutId={`description-${card.location || "unknown"}-${card._id || "unknown"}`}
                    className="text-gray-600 flex dark:text-gray-400 mt-1"
                  >
                    <FaLocationDot className="m-1 text-red-600" />
                    {card.location ? card.location.toUpperCase() : "Location not available"}
                  </motion.p>
                </div>
  
                {/* Add to Cart Button */}
                <button
                  onClick={() =>
                    card._id
                      ? router.replace(`/view-book/${card._id}-${card.category}`)
                      : console.error("Book ID is missing")
                  }
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-neutral-600 dark:text-neutral-400 col-span-full">
              No books found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>   
  );
}
