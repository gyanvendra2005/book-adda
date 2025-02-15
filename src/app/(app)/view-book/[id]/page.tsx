"use client";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Script from "next/script";
import { FaLocationDot } from "react-icons/fa6";
// import Link from "next/link";
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Declare Razorpay on the window object
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, callback: () => void) => void;
}
interface RazorpayOptions {
  key: string; // Your Razorpay key
  amount: number; // Amount in paise (1 INR = 100 paise)
  currency: string; // Currency like 'INR'
  name: string;
  description: string;
  image: string;
  handler: (response: { razorpay_payment_id: string; razorpay_signature: string; }) => void; // Callback function after payment
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  // notes: any; // Optional additional information
  theme: {
    color: string;
  };
}


export default function ViewBook() {
  const { toast } = useToast();
  const params = useParams();

  interface Product {
    bookName: string;
    author: string;
    category: string;
    condition: string;
    location: string;
    price: number;
    description: string;
    bookImages: string[];
    _id:string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store the selected image
  const coupons = ['FICTION-50', 'COMP-30'];
  const [activecoupon, setCoupon] = useState<string | undefined>();
  const [discount, setDiscount] = useState<number>();
  // const [amount, setAmount] = useState<number>(10);
  const router = useRouter()
  const amount = 1;
  console.log(discount);
  // const[category,setCategory] = useState();
  
  

  const details = params.id;
  const arr = typeof details === 'string' ? details.split("-") : [];
  console.log("Product ID from params:", details);
  console.log("Product ID from params:", arr);
  
    const id = arr[0];



  const category = arr[1]
  console.log("Product ID from params:", id);


  async function createPayment() {
    const response = await fetch('/api/createPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount:amount*100 }),
    });
  
    const data = await response.json();

    // if (window.Razorpay) {
    const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
            amount: data.amount,
            currency: data.currency,
            name: "Book Swap",
            description: "Payment for your order",
            image: "/logo.png",
            order_id: data.id,
            handler: async (response: { razorpay_payment_id: string; razorpay_signature: string; }) => {
              //verify payment
              const res = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: data.id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature,bookId:id }),
              });
              const result = await res.json();
              if (result.isOk) {
                // const response = await axios.post()
                toast({
                  title: "Payment Successful",
                  description: result.message,
                })}
                else {
                  toast({
                    title: "Payment Failed",
                    description:  result.message,
                    variant: "destructive",
                  });
              }
            },
            prefill: {
              name: 'Book Swap',
          email: 'gyanvendras2004@gmail.com',
          contact: '6396491411'
            },
            notes:{
              address:"Razorpay Corporate Office"
            },
            theme: {
              color: "#F37254", // Customize the theme color
            },
            method: {
              netbanking: true,
              // card: true,
              // wallet: true,
              upi: true, 
            },
    }
    const rzp1 = new (window as Window).Razorpay(paymentData);
    rzp1.open(); 
  }
  


  //check coupon
    async function checkCoupon() {
    setDiscount(undefined);
    if (activecoupon && coupons.includes(activecoupon)) {
      setDiscount(Number(activecoupon.split('-')[1]));
      console.log("Coupon Applied");

      toast({
        title: "Coupon Applied",
        description: "Coupon Applied Successfully!",
      });
      //  setAmount(10 - (10 * discount) / 100);
    } else {
      console.log("Coupon Not Applied");
      toast({
        title: "Coupon Not Applied",
        description: "Invalid Coupon Code!",
        variant: "destructive",
      });
    }
  }

  // Fetch book details from backend
  const bookDetails = async () => {
    try {
      const response = await axios.get(`/api/getbooks?_id=${id}`);
      // setCategory(response.data.books[0].category);
      const responses = await axios.get(`/api/getbooks?category=${category}`);
      console.log("Fetched books:", response.data.books);
      console.log("Fetched books:", response.data.books);
      setProduct(response.data.books[0]);
      setProducts(responses.data.books);      

      toast({
        title: "Success",
        description: "Book details fetched successfully!",
      });
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed to fetch book details",
        description: (error as Error).message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await bookDetails();
    };
    fetchData();
  },[]);

  // Function to handle opening the modal and setting the selected image
  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // discount amount
  

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
       <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
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
            {/* Book Image Section */}
            <div className="lg:w-1/3">
              <img
                alt={`Book cover of ${product.bookName}`}
                className="w-full mb-4 lg:mb-0 cursor-pointer"
                src={product.bookImages[0]}
                onClick={() => openModal(product.bookImages[0])}
              />
              <div className="flex space-x-2 mt-2">
                {product.bookImages.slice(1).map((image, index) => (
                  <img
                    key={index}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-12 h-16 cursor-pointer"
                    src={image}
                    onClick={() => openModal(image)}
                  />
                ))}
              </div>
            </div>
  
            {/* Book Details */}
            <div className="lg:w-2/3 lg:pl-6">
              <h1 className="text-2xl font-bold mb-2">{product.bookName}</h1>
              <p className="text-lg text-gray-700 mb-4">
                by <span className="text-blue-600">{product.author}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">{product.category}</p>
              <div className="flex space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <i className="fas fa-shield-alt text-gray-500"></i>
                  <span className="text-sm text-gray-500">{product.condition.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-map-marker-alt text-gray-500"></i>
                  <span className="text-sm text-gray-500">{product.location.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center mb-4">
        <input  onChange={(e)=>{setCoupon(e.target.value)}} className="border border-gray-300 p-2 rounded-l-md" placeholder="COUPON" type="text"/>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md" onClick={checkCoupon}>
         CHECK
        </button>
       </div>
       <p className="text-sm text-gray-500 mb-4">
        *You will be charged a flatform fees to get the user details.
       </p>
            </div>
          </div>
        </div>
  
        {/* Right Column */}
        <div className="lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
  <div className="border border-gray-300 p-4 rounded-md shadow-sm">
    <p className="text-lg font-bold text-gray-800 mb-2">Paperback</p>
    <p className="text-2xl font-bold text-red-600 mb-2">
      ₹{product.price}
    </p>
    <span>
    
    <p className={`text-sm  mb-2 flex flex-row `}>
          Platform FEE
               <span className={`ml-2 text-red-600 font-boldtext-sm  mb-2 ${discount?'line-through':null}`}>
               ₹10
               </span>
               {discount && (
                 <p className=" ml-2 text-sm text-gray-600 mb-2 flex flex-row">
                    {/* {10 - (10 * discount) / 100} */}
                    ₹{10 - (10 * discount) / 100}
                 </p>
    )}
    </p>
    </span>
  
    <p className="text-sm text-gray-500 mb-4">
      {discount ? `You saved ₹${((10 * discount) / 100).toFixed(2)}!` : null}
    </p>
    <button className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600" onClick={createPayment}>
      GET USER DETAILS
    </button>
  </div>
</div>
        </div>
  
      {/* About the Book */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">About The Book</h2>
        <div className="border-b border-gray-300 mb-4">
          <button className="text-blue-600 font-bold pb-2 border-b-2 border-blue-600">
            Description
          </button>
        </div>
        <p className="text-gray-700">{product.description}</p>
      </div>
  
     {/* <!-- Available Coupons --> */}
     <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">
       Available Coupons
      </h2>
      <p className="text-gray-700 mb-4">
       Coupons redeemable on this product:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="border border-gray-300 p-4 rounded-md">
        <p className="text-lg font-bold text-gray-800 mb-2">
         Coupon Code: FICTION-50
        </p>
        <p className="text-gray-700 mb-2">
         Extra 50% off on Fiction Books
        </p>
        <p className="text-sm text-gray-500 mb-2">
         Valid till 31st December 2024
        </p>
        {/* <button className="bg-gray-800 text-white px-4 py-2 rounded-md" onClick={checkCoupon}>
          Apply Coupon
        </button> */}
       </div>
       <div className="border border-gray-300 p-4 rounded-md">
        <p className="text-lg font-bold text-gray-800 mb-2">
         Coupon Code: COMP-30
        </p>
        <p className="text-gray-700 mb-2">
         Save 30%
        </p>
        <p className="text-sm text-gray-500 mb-2">
         Valid till 30th March 2025
        </p>
        {/* <button className="bg-gray-800 text-white px-4 py-2 rounded-md" onClick={checkCoupon}>
          Apply Coupon
        </button> */}
       </div>
      </div>
     </div>
  
    
  
      {/* Similar Books Carousel */}
      <div className="mt-8">
        <h2 className=" text:xl  font-bold mb-4">Similar Books</h2>
        <Carousel
          opts={{ align: "start", loop: false }}
          className="md:max-w-5xl md:mx-auto mx-10  "
        >
          <CarouselContent>
            {product?products.map((book, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/5">
                <div className="md:p-2 p-2">
                  <Card>
                    {/* <motion.div */}
                      {/* onClick={() =>
                        router.push(`/view-book/${book._id}-${book.category}`)
                      } */}
                      
                    {/* > */}
                   <button onClick={() =>
                        router.push(`/view-book/${book._id}-${book.category}`)
                      }>
                   <CardContent className="flex flex-col  p-4 md:p-4">
                      <img
                        src={book.bookImages[0]}
                        alt={`Cover of ${book.bookName}`}
                        className="md:w-32 md:h-40 w-26 h-32 object-cover mb-2 md:mb-2"
                      />
                      <p className="text-xs font-bold flex">{book.bookName}</p>
                      <p className="text-xs text-gray-600 flex">₹{book.price}</p>
                      <p className="text-xs text-gray-600 flex">
                         <FaLocationDot className="text-red-600 mt-1" />
                        {book.location}
                      </p>
                    </CardContent>
                   </button>
                    {/* </motion.div> */}
                  </Card>
                </div>
              </CarouselItem>
            )):"No Similar Books Found"}
          </CarouselContent>
          <CarouselPrevious className="text-gray-600 hover:text-gray-800" />
          <CarouselNext className="text-gray-600 hover:text-gray-800" />
        </Carousel>
      </div>
    </div>
  
    {/* Modal for Enlarged Image */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative">
          <img
            src={selectedImage || ''}
            alt="Enlarged view"
            className="max-w-full max-h-screen"
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-red-700 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      </div>
    )}
  </div>
  );
}
