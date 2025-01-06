'use client';
import React from 'react';
import banner from '@/../public/banner.jpeg';

export default function page() {
    console.log(banner);
    
  return (
    <>
 <div className="relative w-full">
  {/* Shared Header Section */}
  <div className="mt-10 text-center bg-yellow-400 w-full h-10 flex items-center justify-center">
    <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
      Are you a university or school student looking for books to buy?
    </span>
  </div>

  {/* Satisfaction Guarantee Section */}
  <div className="mt-10 px-4 sm:px-8 lg:px-16">
    <div className="flex flex-col-reverse md:flex-row items-center">
      <div className="text-center md:text-left">
        <p className="text-orange-500 font-semibold text-lg sm:text-xl">
          100% SATISFACTION GUARANTEE
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
          Find your next book with ease
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Explore a wide selection of books, from textbooks to novels, and enjoy the convenience of online shopping.
        </p>
      </div>
      <div className="mb-6 md:mb-0 md:ml-8">
        <img
          src="/_next/static/media/banner.32957c88.jpeg"
          alt="Book Store"
          className="w-full sm:w-72 md:w-96 h-48 sm:h-60 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>

 {/* Featured Books Section */}
<div className="mt-10 px-4 sm:px-8 lg:px-16">
  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800">
    Sponsored Books
  </p>
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 mt-6">
    {[1, 2, 3, 4].map((book) => (
      <div
        key={book}
        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <img
          src="https://via.placeholder.com/200"
          alt="Book Cover"
          className="w-full h-40 sm:h-48 lg:h-60 object-cover rounded-lg"
        />
        <div className="mt-4 text-center">
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            Book Title {book}
          </p>
          <p className="text-sm sm:text-base text-gray-500">Author Name</p>
          <p className="text-lg font-bold text-orange-500 mt-2">$19.99</p>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


  {/* Why We Are Better Section */}
  <div className="mt-10 bg-gray-100 py-8 sm:py-12 lg:py-16">
    <div className="container mx-auto px-4 sm:px-8 lg:px-16">
      <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-gray-800">
        Why We&apos;re Better
      </p>
      <div className="flex flex-col md:flex-row justify-between mt-8 sm:mt-12">
        {/* Filtering Options */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-8">
          <p className="text-lg sm:text-xl font-bold text-gray-800">
            Advanced Filtering Options
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            We offer comprehensive book filtering options to help you easily
            find what you&apos;re looking for:
          </p>
          <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
            <li>Filter by category (e.g., Textbooks, Novels, Fiction, etc.)</li>
            <li>Sort by price, condition (New/Used), or publication year</li>
            <li>Find books by language or author</li>
            <li>Advanced search for rare or specific books</li>
          </ul>
        </div>

        {/* Second-Hand Book Condition */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-8 mt-8 md:mt-0 md:pl-8">
          <p className="text-lg sm:text-xl font-bold text-gray-800">
            Second-Hand Book Condition
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            We provide detailed descriptions of the condition of second-hand
            books to ensure that you know exactly what you&apos;re purchasing:
          </p>
          <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
            <li>
              <strong>Like New:</strong> The book looks almost brand new with
              minimal signs of wear.
            </li>
            <li>
              <strong>Good:</strong> The book is in great condition, with some
              minor signs of use (e.g., creases, slight page yellowing).
            </li>
            <li>
              <strong>Acceptable:</strong> The book shows noticeable wear but
              is still in readable condition (e.g., dog-eared pages, some page
              discoloration).
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

    </> 
  );
}
