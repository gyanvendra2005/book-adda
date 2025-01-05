'use client';
import React from 'react';
import banner from '@/../public/banner.jpeg';

export default function page() {
    console.log(banner);
    
  return (
    <>
  {/* Shared Header Section */}
<div className="mt-10 text-center bg-yellow-400 w-full h-10 flex items-center justify-center">
  <span className="text-lg font-semibold text-gray-800">
    Are you a university or school student looking for books to buy?
  </span>
</div>

{/* Satisfaction Guarantee Section */}
<div className="mt-20 px-8 md:px-16">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-orange-500 font-semibold text-xl">
        100% SATISFACTION GUARANTEE
      </p>
      <p className="text-3xl font-bold text-gray-800 mt-4">
        Find your next book with ease
      </p>
      <p className="text-lg text-gray-600 mt-2">
        Explore a wide selection of books, from textbooks to novels, and enjoy the convenience of online shopping.
      </p>
    </div>
    <div className="hidden md:block">
      <img
        src="/_next/static/media/banner.32957c88.jpeg"
        alt="Book Store"
        className="w-96 h-96 object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>
</div>

{/* Featured Books Section */}
<div className="mt-20 px-8 md:px-16">
  <p className="text-2xl font-bold text-center text-gray-800">Sponsored Books</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
    {[1, 2, 3].map((book) => (
      <div key={book} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <img
          src="https://via.placeholder.com/200"
          alt="Book Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold text-gray-800">Book Title {book}</p>
          <p className="text-gray-500">Author Name</p>
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
<div className="mt-20 bg-gray-100 py-16">
  <div className="container mx-auto px-8">
    <p className="text-3xl font-bold text-center text-gray-800">Why We&apos;re Better</p>
    <div className="flex flex-col md:flex-row justify-between mt-12">
      {/* Filtering Options */}
      <div className="w-full md:w-1/2 space-y-8">
        <p className="text-xl font-bold text-gray-800">Advanced Filtering Options</p>
        <p className="text-gray-600">
          We offer comprehensive book filtering options to help you easily find what you&apos;re looking for:
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Filter by category (e.g., Textbooks, Novels, Fiction, Science, etc.)</li>
          <li>Sort by price, condition (New/Used), or publication year</li>
          <li>Find books by language or author</li>
          <li>Advanced search for rare or specific books</li>
        </ul>
      </div>

      {/* Second-Hand Book Condition */}
      <div className="w-full md:w-1/2 space-y-8">
        <p className="text-xl font-bold text-gray-800">Second-Hand Book Condition</p>
        <p className="text-gray-600">
          We provide detailed descriptions of the condition of second-hand books to ensure that you know exactly what you&apos;re purchasing:
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li><strong>Like New:</strong> The book looks almost brand new with minimal signs of wear.</li>
          <li><strong>Good:</strong> The book is in great condition, with some minor signs of use (e.g., creases, slight page yellowing).</li>
          <li><strong>Acceptable:</strong> The book shows noticeable wear but is still in readable condition (e.g., dog-eared pages, some page discoloration).</li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </> 
  );
}
