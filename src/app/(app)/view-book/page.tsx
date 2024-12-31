

export default function viewBook(){
  
    return (
        <div className="bg-white text-gray-800">
        <div className="container mx-auto px-4 py-6">
       {/* <!-- Breadcrumb --> */}
       <nav className="text-sm text-gray-600 mb-4">
        <a className="hover:underline" href="#">
         Home
        </a>
        &gt;
        <a className="hover:underline" href="#">
         fiction
        </a>
        &gt;
        <a className="hover:underline" href="#">
         romance-books-fiction
        </a>
        &gt;
        <a className="hover:underline" href="#">
         contemporary-romance
        </a>
        &gt;
        <span>
         Too Good to Be True : A smart funny will-they-won’t-they romance
        </span>
       </nav>
       {/* <!-- Main Content --> */}
       <div className="flex flex-col lg:flex-row">
        {/* <!-- Left Column --> */}
        <div className="lg:w-2/3">
         <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
           <img alt="Book cover of 'Too Good to Be True' by Prajakta Koli" className="w-full mb-4 lg:mb-0" height="300" src="https://storage.googleapis.com/a1aa/image/Ij7ONNrijRLiBVcve2MtNwZRTVVX1AMY6BK3d5AM8Wc9zMAKA.jpg" width="200"/>
           <div className="flex space-x-2 mt-2">
            <img alt="Book cover thumbnail 1" className="w-12 h-16" height="70" src="https://storage.googleapis.com/a1aa/image/CDQv3BetVxwVdydvSRYNw1BYZSLWAwmG6NjyAegwXhs4nZAUA.jpg" width="50"/>
            <img alt="Book cover thumbnail 2" className="w-12 h-16" height="70" src="https://storage.googleapis.com/a1aa/image/4xmb7rnGJMKhB5bkd0Q4xkTCYDOATcsm82ugmTQuW2LfzMAKA.jpg" width="50"/>
            <img alt="Book cover thumbnail 3" className="w-12 h-16" height="70" src="https://storage.googleapis.com/a1aa/image/fAJcTOYXKOSqe0gmLJGAX05uNtQsrP079VcHecEBYvr7PzAoA.jpg" width="50"/>
           </div>
          </div>
          <div className="lg:w-2/3 lg:pl-6">
           <h1 className="text-2xl font-bold mb-2">
            Too Good to Be True : A smart funny will-they-won’t-they romance
           </h1>
           <p className="text-lg text-gray-700 mb-4">
            by
            <span className="text-blue-600">
             Prajakta Koli
            </span>
           </p>
           <p className="text-sm text-gray-500 mb-4">
            Categary
           </p>
           <div className="flex space-x-4 mb-4">
            <div className="flex items-center space-x-1">
             <i className="fas fa-shield-alt text-gray-500">
             </i>
             <span className="text-sm text-gray-500">
              codition
             </span>
            </div>
            <div className="flex items-center space-x-1">
             <i className="fas fa-check-circle text-gray-500">
             </i>
             <span className="text-sm text-gray-500">
              location
             </span>
            </div>
            <div className="flex items-center space-x-1">
             <i className="fas fa-truck text-gray-500">
             </i>
             <span className="text-sm text-gray-500">
             
             </span>
            </div>
            <div className="flex items-center space-x-1">
             <i className="fas fa-print text-gray-500">
             </i>
             <span className="text-sm text-gray-500">
              
             </span>
            </div>
           </div>
           <div className="flex items-center mb-4">
            <input className="border border-gray-300 p-2 rounded-l-md" placeholder="COUPON" type="text"/>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
             CHECK
            </button>
           </div>
           <p className="text-sm text-gray-500 mb-4">
            *YOU WILL BE CHARGED A FLATFORM FEES TO GET THE SELLER DEATAILS TO CONTACT WITH HIM.
           </p>
          </div>
         </div>
        </div>
        {/* <!-- Right Column --> */}
        <div className="lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
         <div className="border border-gray-300 p-4 rounded-md">
          <p className="text-lg font-bold text-gray-800 mb-2">
           Paperback
          </p>
          <p className="text-2xl font-bold text-red-600 mb-2">
           ₹289
           <span className="text-sm text-gray-500">
            27% OFF
           </span>
          </p>
          {/* <div className="flex items-center mb-4">
           <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md">
            -
           </button>
           <input className="border-t border-b border-gray-300 text-center w-12" type="text" value="1"/>
           <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md">
            +
           </button>
          </div> */}
          <button className="bg-yellow-500 text-white w-full py-2 rounded-md mb-4">
           GET DETAILS
          </button>
          {/* <a className="text-blue-600 text-sm" href="#">
           LOOKING TO PLACE A BULK ORDER? CLICK HERE
          </a> */}
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
         {/* <button className="text-gray-600 font-bold pb-2 ml-4">
          Author
         </button> */}
        </div>
        <p className="text-gray-700 mb-4">
         Dive into this contemporary fiction novel that explores love, authenticity, and the complexities of modern relationships. Written by popular content creator Prajakta Koli, this compelling narrative follows the journey of a protagonist navigating the blurred lines between reality and perception in today's digital age. Blending humour and heart, the book delves into the challenges of maintaining genuine connections in a world dominated by social media facades. Readers will be drawn into a story...
        </p>
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
           Coupon Code: FICTION5
          </p>
          <p className="text-gray-700 mb-2">
           Extra 5% off on Fiction Books
          </p>
          <p className="text-sm text-gray-500 mb-2">
           Valid till 31st December 2024
          </p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
           Please sign in to avail coupons
          </button>
         </div>
         <div className="border border-gray-300 p-4 rounded-md">
          <p className="text-lg font-bold text-gray-800 mb-2">
           Coupon Code: COMP30
          </p>
          <p className="text-gray-700 mb-2">
           Save ₹30
          </p>
          <p className="text-sm text-gray-500 mb-2">
           Valid till 30th March 2025
          </p>
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
           Publication Date:
          </span>
           {/* {edition} */}
         </p>
         <p className="text-gray-700">
          <span className="font-bold">
           Pages:
          </span>
          {/* {pages} */}
         </p>
         <p className="text-gray-700">
          <span className="font-bold">
           Publisher/Author:
          </span>
          {/* {publisher} */}
         </p>
         <p className="text-gray-700">
          <span className="font-bold">
           Condition
          </span>
           {/* {condition} */}
         </p>
        </div>
       </div>
      </div>
     </div>
    )
}