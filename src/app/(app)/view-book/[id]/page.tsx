"use client";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { log } from "console";

export default function ViewBook() {
  const { toast } = useToast();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

  const details = params.id;
  const arr = details.split("-");
    const id = arr[0];



  const category = arr[1]
  console.log("Product ID from params:", id);

  // Fetch book details from API
  const bookDetails = async () => {
    try {
      const response = await axios.get(`/api/getbooks?_id=${id}`);
      const responses = await axios.get(`/api/getbooks?category=${category}`);
      console.log("Fetched books:", response.data.books);
      console.log("Fetched books:", response.data.books);
      setProduct(response.data.books[0]); // Assuming books is an array and you're fetching one book

      toast({
        title: "Success",
        description: "Book details fetched successfully!",
      });
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed to fetch book details",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await bookDetails();
    };
    fetchData();
  }, [id]);

  // Function to handle opening the modal and setting the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <a className="hover:underline" href="#">
            Home
          </a>
          &gt;
          <a className="hover:underline" href="#">
            {product.category}
          </a>
          &gt;
          <span>{product.bookName}</span>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column */}
          <div className="lg:w-2/3">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <img
                  alt={`Book cover of ${product.bookName}`}
                  className="w-full mb-4 lg:mb-0 cursor-pointer"
                  height="300"
                  src={product.bookImages[0]} // Assuming first image as main cover
                  width="200"
                  onClick={() => openModal(product.bookImages[0])} // Open modal on click
                />
                <div className="flex space-x-2 mt-2">
                  {product.bookImages.slice(1).map((image, index) => (
                    <img
                      key={index}
                      alt={`Book cover thumbnail ${index + 1}`}
                      className="w-12 h-16 cursor-pointer"
                      height="70"
                      src={image}
                      width="50"
                      onClick={() => openModal(image)} // Open modal on click for thumbnails
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-2/3 lg:pl-6">
                <h1 className="text-2xl font-bold mb-2">{product.bookName}</h1>
                <p className="text-lg text-gray-700 mb-4">
                  by <span className="text-blue-600">{product.author}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <div className="flex space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-shield-alt text-gray-500"></i>
                    <span className="text-sm text-gray-500">
                      {product.condition.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-check-circle text-gray-500"></i>
                    <span className="text-sm text-gray-500">
                      {product.location.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
            <div className="border border-gray-300 p-4 rounded-md">
              <p className="text-lg font-bold text-gray-800 mb-2">Paperback</p>
              <p className="text-2xl font-bold text-red-600 mb-2">
                ₹{product.price}
                <span className="text-sm text-gray-500"> 27% OFF</span>
              </p>
              <button className="bg-yellow-500 text-white w-full py-2 rounded-md mb-4">
                GET DETAILS
              </button>
            </div>
          </div>
        </div>

 
   {/* <!-- About The Book --> */}
   <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">
     About The Book
    </h2>
    <div className="border-b border-gray-300 mb-4">
     <button className="text-blue-600 font-bold pb-2 border-b-2 border-blue-600">
      Description
     </button>
    </div>
    <p className="text-gray-700 mb-4">
    {product.description}
    </p>
   </div>

        {/* Available Coupons */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Available Coupons</h2>
          <p className="text-gray-700 mb-4">Coupons redeemable on this product:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-300 p-4 rounded-md">
              <p className="text-lg font-bold text-gray-800 mb-2">Coupon Code: FICTION5</p>
              <p className="text-gray-700 mb-2">Extra 5% off on Fiction Books</p>
              <p className="text-sm text-gray-500 mb-2">Valid till 31st December 2024</p>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Please sign in to avail coupons
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Details --> */}
   <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">
     Details
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     <p className="text-gray-700">
      <span className="font-bold">
       Categary: 
      </span>
      {product.category}
     </p>
     <p className="text-gray-700">
      <span className="font-bold">
      Edition: 
      </span>
      {product.edition}
     </p>
     <p className="text-gray-700">
      <span className="font-bold">
       Pages:
      </span>
      {product.pages}
     </p>

     <p className="text-gray-700">
      <span className="font-bold">
       Conditon: 
      </span>
      {product.condition}
     </p>
    </div>
   </div>
  </div>



      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-screen"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-700 text-3xl font-bold"
            >
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

