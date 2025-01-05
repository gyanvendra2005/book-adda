"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import  {FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
 

export default function ExpandableCardDemo() {;
  const [category,setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 20, max: 10000 });

  const[location,setLocationFilter]=useState('')
  const[condition,setConditionFilter]=useState('')
  // const [message, setMessage] = useState('');
  // console.log(location,condition,category);
  
  
  interface Book {
    _id: string;
    bookName: string;
    price: number;
    condition: string;
    location: string;
    category: string;
    bookImages?: string[];
  }

  const [products, setProducts] = useState<Book[]>([]);
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
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed to fetch books",
        description:  "An error occurred.",
        variant: "destructive",
      });
    }
  };
   useEffect(() => {
       fetchProducts()
   },[])

  const applyFilters = ()=>{
    fetchProducts()
  }
  

  return (
    <div>
      {/* Main Content */}
      <div className="flex mt-20">
        {/* Sidebar Section */}
        <aside className="hidden lg:block fixed lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow h-full left-0 top-20">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
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
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700"
            >
              Price Range (₹{priceFilter.min})
            </label>
            <input
              type="range"
              id="priceRange"
              min="20"
              max="10000"
              step="10"
              value={priceFilter.min}
              className="w-full"
              onChange={(e) =>
                setPriceFilter((prev) => ({ ...prev, min: parseInt(e.target.value) }))
              }
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700"
            >
              Condition
            </label>
            <select
              id="condition"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setConditionFilter(e.target.value)}
            >
              <option value="">All Conditions</option>
              <option value="New">New</option>
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
        </aside>

        {/* Main Section */}
        <main className="flex-1 ml-0 lg:ml-80 w-full">
          <div className="mb-6 p-4">
            <input
              type="search"
              placeholder="Search"
              className="w-1/3 px-4 py-2 rounded-lg border"
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
              products.map((card) => (
                <motion.div
                  key={card._id}
                  className="flex flex-col bg-white shadow-lg rounded-xl cursor-pointer p-4 transition-transform transform hover:shadow-gray-400 dark:bg-neutral-800"
                  onClick={() => router.push(`/view-book/${card._id}-${card.category}`)}
                >
                  <div className="w-full h-48 rounded-md overflow-hidden bg-gray-200">
                    {card.bookImages?.[0] ? (
                      <img
                        src={card.bookImages[0]}
                        alt={`Cover of ${card.bookName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 text-neutral-800 dark:text-neutral-200">
                    {card.bookName}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    ₹{card.price?.toLocaleString() || "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-bold">Condition:</span>{" "}
                    {card.condition || "Not specified"}
                  </p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <FaLocationDot className="text-red-600 mr-2" />
                    {card.location?.toUpperCase() || "Location not available"}
                  </p>
                  <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 transition">
                    View Details
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full">
                No books found for the selected filters.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}